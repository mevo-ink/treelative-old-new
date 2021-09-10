import dbConnect from 'utils/mongodb'
import { projectUserProfile, projectUserAge } from 'utils/dbProjections'

export const getBirthdayData = async () => {
  const db = await dbConnect()

  const cacheKey = 'birthday-layout'
  const cache = await db.collection('cache').findOne({ name: cacheKey })
  if (cache && cache.generatedAt === new Date().getDay()) return cache.data

  const unknownCount = await db.collection('users').count({ dateOfBirth: { $exists: false } })

  // group users by the birthday from dateOfBirth and create an object with birthday as key and users as value
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
          birthday: {
            $substr: ['$dateOfBirth', 5, 5]
          },
          ...projectUserProfile,
          // calculate age in years rounded from dateOfBirth and dateOfDeath if exists
          age: projectUserAge
        }
      },
      // Grouping all users by birthday and pushing them into "users" array
      {
        $group: {
          _id: '$birthday',
          users: {
            $push: '$$ROOT'
          }
        }
      },
      // Sorting users by birthday
      {
        $sort: {
          _id: 1
        }
      },
      // Building a [ k: <birthday> v: <docs array of associated users>]
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

  const response = { birthdays: data, unknownCount, generatedAt: new Date().getDay() }

  await db.collection('cache').updateOne(
    { name: cacheKey },
    { $set: { data: response } },
    { upsert: true }
  )

  return response
}

export default async (parent, args, context, info) => {
  return getBirthdayData()
}
