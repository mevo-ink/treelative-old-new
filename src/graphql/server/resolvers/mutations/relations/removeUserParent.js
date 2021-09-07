import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'utils/auth'

export const removeUserParent = async (context, userID, parentID) => {
  // remove the parentID as a parent from this user
  const { value: user } = await context.db.collection('users').findOneAndUpdate(
    { _id: context.db.ObjectId(userID) },
    { $pull: { parents: context.db.ObjectId(parentID) } },
    { returnDocument: 'after', returnOriginal: false, projection: { _id: 1 } }
  )

  // remove this user as a child from the parentID
  const { value: userParent } = await context.db.collection('users').findOneAndUpdate(
    { _id: context.db.ObjectId(parentID) },
    { $pull: { children: context.db.ObjectId(userID) } },
    { returnDocument: 'after', returnOriginal: false, projection: { partner: 1 } }
  )

  return { user, userParent }
}

export default async (parent, args, context, info) => {
  const { userID, parentID } = args

  const session = await isOwner(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { user, userParent } = await removeUserParent(context, userID, parentID)

  // if the parent has a partner
  if (userParent.partner) {
    await removeUserParent(context, userID, userParent.partner.toString())
  }

  // clear cache
  context.db.collection('cache').deleteOne({ name: 'graph-layout' })

  return user
}
