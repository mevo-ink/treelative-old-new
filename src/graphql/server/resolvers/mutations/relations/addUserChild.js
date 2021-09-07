import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'utils/auth'

export const addUserChild = async (context, userID, childID) => {
  // add the childID to this user
  const { value: user } = await context.db.collection('users').findOneAndUpdate(
    { _id: context.db.ObjectId(userID) },
    { $addToSet: { children: context.db.ObjectId(childID) } },
    { returnDocument: 'after', returnOriginal: false, projection: { partner: 1 } }
  )

  // add this user as a parent for the childID
  await context.db.collection('users').updateOne(
    { _id: context.db.ObjectId(childID) },
    { $addToSet: { parents: context.db.ObjectId(userID) } }
  )

  return user
}

export default async (parent, args, context, info) => {
  const { userID, childID } = args

  const session = await isOwner(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const user = await addUserChild(context, userID, childID)

  // if the user has a partner
  if (user.partner) {
    await addUserChild(context, user.partner.toString(), childID)
  }

  // clear cache
  context.db.collection('cache').deleteOne({ name: 'graph-layout' })

  return user
}
