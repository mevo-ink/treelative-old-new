export default async (parent, args, context, info) => {
  return await context.db.collection('users')
    .find({ isAdmin: true })
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
    .toArray()
}
