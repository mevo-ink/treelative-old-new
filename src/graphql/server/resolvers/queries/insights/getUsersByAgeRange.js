import dbConnect from 'utils/mongodb'
import { projectUserProfile, projectUserAge } from 'utils/dbProjections'

export default async (parent, args, context, info) => {
  const db = await dbConnect()

  // get min and max age from args.ageRange string and convert to int
  let [min, max] = args.ageRange.split('-')
  if (args.ageRange === '80+') {
    min = 80
    max = 999
  }
  min = parseInt(min)
  max = parseInt(max)

  const users = await db
    .collection('users')
    .aggregate([
      {
        $match: {
          dateOfBirth: { $exists: true }
        }
      },
      {
        $project: {
          ...projectUserProfile,
          dateOfBirth: 1,
          age: projectUserAge
        }
      },
      // get all users with age between min and max ages
      {
        $match: {
          age: {
            $gte: min,
            $lte: max
          }
        }
      },
      {
        $sort: {
          age: 1
        }
      }
    ])
    .toArray()

  return users
}
