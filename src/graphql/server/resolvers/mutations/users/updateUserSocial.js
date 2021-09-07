import { ApolloError } from 'apollo-server-micro'

import { ObjectId } from 'mongodb'

import dbConnect from 'utils/mongodb'
import { isOwner } from 'utils/auth'

export default async (parent, args, context, info) => {
  const session = await isOwner(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const updateObject = {}
  for (const key in args.input) {
    updateObject[`social.${key}`] = args.input[key]
  }

  const db = await dbConnect()

  const { value: user } = await db.collection('users').findOneAndUpdate(
    { _id: ObjectId(args.userID) },
    { $set: updateObject },
    { returnDocument: 'after', returnOriginal: false, projection: { social: 1, _id: 0, id: { $toString: '$_id' } } }
  )

  return user
}
