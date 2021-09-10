import dbConnect from 'utils/mongodb'
import { projectUserProfile } from 'utils/dbProjections'

export const getAgeData = async () => {
  const db = await dbConnect()

  const cacheKey = 'age-layout'
  const cache = await db.collection('cache').findOne({ name: cacheKey })
  if (cache) return cache.data

  const unknownCount = await db.collection('users').count({ dateOfBirth: { $exists: false } })

  // group users by the year from dateOfBirth and create an object with year as key and users as value
  const data = await db
    .collection('users')
    .aggregate([
      {
        $match: {
          dateOfBirth: { $exists: true }
        }
      },
      {
        $project: {
          year: { $year: '$dateOfBirth' },
          ...projectUserProfile
        }
      },
      // Grouping all users by year and pushing them into "users" array
      {
        $group: {
          _id: '$year',
          users: {
            $push: '$$ROOT'
          }
        }
      },
      // Building a [ k: <year> v: <docs array of associated users>]
      {
        $group: {
          _id: 'null',
          data: {
            $push: {
              k: { $toString: '$_id' },
              v: '$users'
            }
          }
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: { $arrayToObject: '$data' }
          }
        }
      }
    ]).next()

  const response = { birthYears: data, unknownCount }

  await db.collection('cache').updateOne(
    { name: cacheKey },
    { $set: { data: response } },
    { upsert: true }
  )

  return response
}

export default async (parent, args, context, info) => {
  return getAgeData()
}
