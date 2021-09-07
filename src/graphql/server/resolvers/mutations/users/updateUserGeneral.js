import { ApolloError } from 'apollo-server-micro'

import { ObjectId } from 'mongodb'

import dbConnect from 'utils/mongodb'
import { isOwner } from 'utils/auth'

import getParsedLocations from 'utils/getParsedLocations'

export default async (parent, args, context, info) => {
  const session = await isOwner(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  // parse location data
  const parsedLocations = await getParsedLocations(args.input)

  const db = await dbConnect()

  const userInput = { ...args.input, ...parsedLocations }
  await db.collection('users').updateOne(
    { _id: ObjectId(args.userID) },
    { $set: userInput }
  )

  // clear cache
  if (Object.keys(args.input).find(field => field.includes('location'))) {
    db.collection('cache').deleteOne({ name: 'map-layout' })
  }
  if (Object.keys(args.input).find(field => field.includes('dateOfBirth'))) {
    db.collection('cache').deleteOne({ name: 'age-layout' })
    db.collection('cache').deleteOne({ name: 'birthday-layout' })
  }

  return db.collection('users').findOne({ _id: ObjectId(args.userID) })
}
