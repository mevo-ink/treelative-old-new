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

  await db.collection('users').updateOne(
    { _id: ObjectId(args.userID) },
    { $set: updateObject }
  )

  return db.collection('users').findOne({ _id: ObjectId(args.userID) }, { projection: { social: 1 } })
}
