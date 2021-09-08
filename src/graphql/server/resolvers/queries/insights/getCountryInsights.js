import dbConnect from 'utils/mongodb'

export default async (parent, args, context, info) => {
  const db = await dbConnect()

  const unknownCount = await db.collection('users').count({ currentLocation: { $exists: false } })

  // group by currentLocation.code: eg: { country: 'America', code: 'US', count: 1 }
  const data = await db.collection('users')
    .aggregate([
      {
        $match: {
          currentLocation: { $exists: true }
        }
      },
      {
        $group: {
          _id: '$currentLocation.code',
          country: { $first: '$currentLocation.country' },
          code: { $first: '$currentLocation.code' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          count: -1
        }
      },
      {
        $project: {
          _id: 0
        }
      }
    ])
    .toArray()

  return {
    countries: data,
    unknownCount
  }
}
