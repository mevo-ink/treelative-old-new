import dbConnect from 'utils/mongodb'

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
          _id: 0,
          id: { $toString: '$_id' },
          shortName: 1,
          fullName: 1,
          dateOfBirth: 1,
          dateOfDeath: 1,
          avatar: {
            $concat: [`${process.env.STORAGE_ENDPOINT}/avatars/`, { $toString: '$_id' }, '.png']
          },
          brokenAvatar: {
            $concat: ['https://ui-avatars.com/api/?name=', '$fullName', '&background=random&rounded=true&font-size=0.5&bold=true']
          },
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
