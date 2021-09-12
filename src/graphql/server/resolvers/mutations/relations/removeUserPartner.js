import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'utils/auth'
import { expandUserRelations } from 'utils/dbProjections'

import { removeUserChild } from './removeUserChild'

export default async (parent, args, context, info) => {
  const { userID, partnerID } = args

  const session = await isOwner(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  // remove the partnerID as a partner from userID
  const { value: user } = await context.db.collection('users').findOneAndUpdate(
    { _id: context.db.ObjectId(userID) },
    { $unset: { partner: '' } },
    { returnDocument: 'after', returnOriginal: false, projection: { children: 1 } }
  )

  // remove the userID as a partner from partnerID
  const { value: partner } = await context.db.collection('users').findOneAndUpdate(
    { _id: context.db.ObjectId(partnerID) },
    { $unset: { partner: '' } },
    { returnDocument: 'after', returnOriginal: false, projection: { partner: 1, children: 1, _id: 0, id: { $toString: '$_id' } } }
  )

  // if either couple has children - remove them all
  const userChildIDs = user.children?.map(child => child.toString()) || []
  const partnerChildIDs = partner.children?.map(child => child.toString()) || []

  if (userChildIDs.length > 0) {
    for (const id of userChildIDs) {
      await removeUserChild(context, userID, id)
    }
  }

  if (partnerChildIDs.length > 0) {
    for (const id of partnerChildIDs) {
      await removeUserChild(context, partnerID, id)
    }
  }

  // clear cache
  context.db.collection('cache').deleteOne({ name: 'graph-layout' })

  await expandUserRelations(user)

  return user
}
