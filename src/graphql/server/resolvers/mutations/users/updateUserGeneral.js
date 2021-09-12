import { ApolloError } from 'apollo-server-micro'

import { ObjectId } from 'mongodb'

import dbConnect from 'utils/mongodb'
import { isOwner } from 'utils/auth'

import getParsedLocations from 'utils/getParsedLocations'
import { projectUserProfile } from 'utils/dbProjections'

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
    {
      returnDocument: 'after',
      returnOriginal: false,
      projection: {
        ...projectUserProfile,
        ...Object.keys(userInput).reduce((acc, curr) => { acc[curr] = 1; return acc }, {})
      }
    }
  )

  if ((userInput.dateOfMarriage || userInput.marriageLocation) && user.partner) {
    // update the partner's marriage date and location
    await db.collection('users').findOneAndUpdate(
      { _id: user.partner },
      { $set: { dateOfMarriage: user.dateOfMarriage, marriageLocation: user.marriageLocation } }
    )
  }

  // clear cache
  if (Object.keys(userInput).find(field => field.includes('currentLocation'))) {
    db.collection('cache').deleteOne({ name: 'map-layout' })
  }
  if (Object.keys(userInput).find(field => field.includes('dateOfBirth'))) {
    db.collection('cache').deleteOne({ name: 'age-layout' })
    db.collection('cache').deleteOne({ name: 'birthday-layout' })
  }

  return user
}
