import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'utils/auth'

import { addUserChild } from './addUserChild'

export default async (parent, args, context, info) => {
  const { userID, partnerID } = args

  const session = await isOwner(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  // add the partnerID as a partner to userID
  const { value: user } = await context.db.collection('users').findOneAndUpdate(
    { _id: context.db.ObjectId(userID) },
    { $set: { partner: context.db.ObjectId(partnerID) } },
    { returnDocument: 'after', returnOriginal: false, projection: { children: 1 } }
  )

  // add the userID as a partner to partnerID
  const partner = await context.db.collection('users').findOneAndUpdate(
    { _id: context.db.ObjectId(partnerID) },
    { $set: { partner: context.db.ObjectId(userID) } },
    { returnDocument: 'after', returnOriginal: false, projection: { children: 1 } }
  )

  // if either couple has children - connect any missing ones
  const userChildIDs = user.children?.map(child => child.toString()) || []
  const partnerChildIDs = partner.children?.map(child => child.toString()) || []

  const userChildrenNotInPartner = []
  for (const userID of userChildIDs) {
    if (!partnerChildIDs.includes(userID)) {
      userChildrenNotInPartner.push(userID)
    }
  }

  const partnerChildrenNotInUser = []
  for (const userID of partnerChildIDs) {
    if (!userChildIDs.includes(userID)) {
      partnerChildrenNotInUser.push(userID)
    }
  }

  if (userChildrenNotInPartner.length > 0) {
    for (const id of userChildrenNotInPartner) {
      await addUserChild(context, partnerID, id)
    }
  }

  if (partnerChildrenNotInUser.length > 0) {
    for (const id of partnerChildrenNotInUser) {
      await addUserChild(context, userID, id)
    }
  }

  // clear cache
  context.db.collection('cache').deleteOne({ name: 'graph-layout' })

  return user
}
