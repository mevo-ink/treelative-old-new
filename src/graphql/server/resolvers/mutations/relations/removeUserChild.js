import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'utils/auth'

export const removeUserChild = async (context, userID, childID) => {
  // remove the childID from this user
  const { value: user } = await context.db.collection('users').findOneAndUpdate(
    { _id: context.db.ObjectId(userID) },
    { $pull: { children: context.db.ObjectId(childID) } },
    { returnDocument: 'after', returnOriginal: false, projection: { partner: 1 } }
  )

  // remove this user as a parent from childID
  await context.db.collection('users').updateOne(
    { _id: context.db.ObjectId(childID) },
    { $pull: { parents: context.db.ObjectId(userID) } }
  )

  return user
}

export default async (parent, args, context, info) => {
  const { userID, childID } = args

  const session = await isOwner(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const user = await removeUserChild(context, userID, childID)

  // if the user has a partner
  if (user.partner) {
    await removeUserChild(context, user.partner.toString(), userID)
  }

  // clear cache
  context.db.collection('cache').deleteOne({ name: 'graph-layout' })

  return user
}
