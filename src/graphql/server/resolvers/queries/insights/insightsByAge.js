import dbConnect from 'utils/mongodb'

export default async (parent, args, context, info) => {
  const db = await dbConnect()

  const unknownCount = await db.collection('users').count({ dateOfBirth: { $exists: false } })

  // get ranges of ages with 10 year increments
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
      {
        $facet: {
          ageRanges: [
            {
              $bucket: {
                groupBy: '$age',
                boundaries: [0, 10, 20, 30, 40, 50, 60, 70, 80],
                default: '80',
                output: {
                  count: { $sum: 1 }
                }
              }
            }
          ]
        }
      },
      {
        // rename count of each age range with eg. { ages: '0-10', count: 1 }
        $project: {
          ages: {
            $map: {
              input: '$ageRanges',
              as: 'ageRange',
              in: {
                ages: {
                  $concat: [
                    { $toString: '$$ageRange._id' },
                    {
                      $cond: {
                      // if the range is 80, set it to 80+
                        if: { $eq: ['$$ageRange._id', '80'] },
                        then: '+',
                        else: { $concat: ['-', { $toString: { $add: [{ $toInt: { $toString: '$$ageRange._id' } }, 10] } }] }
                      }
                    }
                  ]
                },
                count: '$$ageRange.count'
              }
            }
          }
        }
      }
    ])
    .next()

  return {
    data,
    unknownCount
  }
}
