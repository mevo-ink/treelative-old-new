import dbConnect from 'utils/mongodb'

export default async (parent, args, context, info) => {
  const db = await dbConnect()

  let [min, max] = args.ages.split('-')
  if (args.ages === '80+') {
    min = 80
    max = Number.MAX_SAFE_INTEGER
  }

  // get all users with age between min and max using dateOfBirth field and sort by asc
  const users = await db
    .collection('users')
    .find({
      dateOfBirth: {
        $gte: new Date(new Date().setFullYear(new Date().getFullYear() - max)),
        $lte: new Date(new Date().setFullYear(new Date().getFullYear() - min))
      }
    })
    .project({
      _id: 0,
      id: { $toString: '$_id' },
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
                $lt: [{ $dayOfYear: new Date() }, { $dayOfYear: '$dateOfBirth' }]
              },
              then: {
                // subtract 1 from the age if current date is before the birthday
                $subtract: [{ $subtract: [{ $year: new Date() }, { $year: '$dateOfBirth' }] }, 1]
              },
              else: {
                $subtract: [{ $year: new Date() }, { $year: '$dateOfBirth' }]
              }
            }
          }
        }
      }
    })
    .sort({ dateOfBirth: -1 })
    .toArray()

  return users
}
