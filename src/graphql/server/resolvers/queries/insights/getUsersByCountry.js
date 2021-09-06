import dbConnect from 'utils/mongodb'

export default async (parent, args, context, info) => {
  const db = await dbConnect()

  // get all users with age between min and max using dateOfBirth field and sort by asc
  const users = await db
    .collection('users')
    .find({
      'currentLocation.country': { $eq: args.country }
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
      }
    })
    .sort({ dateOfBirth: -1 })
    .toArray()

  return users
}
