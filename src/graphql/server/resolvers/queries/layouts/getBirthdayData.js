import dbConnect from 'utils/mongodb'

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
          _id: 0,
          id: { $toString: '$_id' },
          birthday: {
            $substr: ['$dateOfBirth', 5, 5]
          },
          shortName: 1,
          fullName: 1,
          avatar: {
            $concat: [`${process.env.STORAGE_ENDPOINT}/avatars/`, { $toString: '$_id' }, '.png']
          },
          brokenAvatar: {
            $concat: ['https://ui-avatars.com/api/?name=', '$fullName', '&background=random&rounded=true&font-size=0.5&bold=true']
          },
          // calculate age in years rounded from dateOfBirth and dateOfDeath if exists
          age: {
            $cond: {
              if: '$dateOfDeath',
              then: {
                $subtract: [{ $year: '$dateOfDeath' }, { $year: '$dateOfBirth' }]
              },
              else: {
                $cond: {
                  if: {
                    // check if current date is before the birthday
                    $lt: [{ $dayOfYear: '$$NOW' }, { $dayOfYear: '$dateOfBirth' }]
                  },
                  then: {
                    // subtract 1 from the age if current date is before the birthday
                    $subtract: [{ $subtract: [{ $year: '$$NOW' }, { $year: '$dateOfBirth' }] }, 1]
                  },
                  else: {
                    $subtract: [{ $year: '$$NOW' }, { $year: '$dateOfBirth' }]
                  }
                }
              }
            }
          }
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

  const response = { users: data, unknownCount, generatedAt: new Date().getDay() }

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
