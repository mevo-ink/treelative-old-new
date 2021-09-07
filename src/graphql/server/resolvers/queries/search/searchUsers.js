import fuzzySearch from 'utils/fuzzySearch'

export default async (parent, args, context, info) => {
  const { query = '' } = args

  // get users that match the search term and not a parent and partner of userID
  const users = await context.db.collection('users').find(
    {
      $and: [
        ...query.split(' ').map(fuzzySearch).map(q => ({ $or: q }))
      ]
    },
    {
      projection: {
        _id: 0,
        id: { $toString: '$_id' },
        fullName: 1
      }
    }
  ).limit(5).toArray()

  return users
}
