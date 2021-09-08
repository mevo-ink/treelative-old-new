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
  const { value: user } = await db.collection('users').findOneAndUpdate(
    { _id: ObjectId(args.userID) },
    { $set: userInput },
    { returnDocument: 'after', returnOriginal: false }
  )

  if ((args.input.dateOfMarriage || args.input.marriageLocation) && user.partner) {
    // update the partner's marriage date and location
    await db.collection('users').findOneAndUpdate(
      { _id: user.partner },
      { $set: { dateOfMarriage: user.dateOfMarriage, marriageLocation: user.marriageLocation } }
    )
  }

  // clear cache
  if (Object.keys(args.input).find(field => field.includes('location'))) {
    db.collection('cache').deleteOne({ name: 'map-layout' })
  }
  if (Object.keys(args.input).find(field => field.includes('dateOfBirth'))) {
    db.collection('cache').deleteOne({ name: 'age-layout' })
    db.collection('cache').deleteOne({ name: 'birthday-layout' })
  }

  return user
}
