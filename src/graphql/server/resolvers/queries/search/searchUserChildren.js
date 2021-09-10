import { ApolloError } from 'apollo-server-micro'

import { authenticateToken } from 'utils/auth'
import fuzzySearch from 'utils/fuzzySearch'

export default async (parent, args, context, info) => {
  const session = await authenticateToken(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError('You must be authenticated to perform this action', 'UNAUTHENTICATED')
  }

  const { userID, query = '' } = args

  // get users that match the search term and not a partner of the current user and does not have any parents
  const users = await context.db.collection('users').find(
    {
      $and: [
        ...query.split(' ').map(fuzzySearch).map(q => ({ $or: q }))
      ],
      parents: { $exists: false },
      partner: { $ne: context.db.ObjectId(userID) },
      _id: { $ne: context.db.ObjectId(userID) }
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