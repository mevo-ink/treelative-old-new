import { ApolloError } from 'apollo-server-micro'

import { ObjectId } from 'mongodb'

import dbConnect from 'utils/mongodb'
import { isAdmin } from 'utils/auth'

export default async (parent, args, context, info) => {
  const session = await isAdmin(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const db = await dbConnect()

  await db.collection('users').deleteOne({ _id: ObjectId(args.userID) })

  // remove user from any parents or children list
  await db.collection('users').updateMany(
    {
      $or: [
        { parents: args.userID },
        { children: args.userID }
      ]
    },
    {
      $pull: { parents: args.userID, children: args.userID }
    }
  )

  // remove user from partner's partner field
  await db.collection('users').updateOne(
    { partner: args.userID },
    {
      $unset: { partner: '' }
    }
  )

  // clear cache
  await db.collection('cache').deleteMany({})

  return true
}
