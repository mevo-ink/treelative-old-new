import dbConnect from 'utils/mongodb'
import { projectUserProfile } from 'utils/dbProjections'

export default async (parent, args, context, info) => {
  const db = await dbConnect()

  // get all users with age between min and max using dateOfBirth field and sort by asc
  const users = await db
    .collection('users')
    .find({
      'currentLocation.country': { $eq: args.country }
    })
    .project(projectUserProfile)
    .sort({ dateOfBirth: -1 })
    .toArray()

  return users
}
