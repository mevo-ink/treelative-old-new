import { ApolloError } from 'apollo-server-micro'

import fuzzySearch from 'server/utils/fuzzySearch'

export default async (parent, args, context, info) => {
  // only authenticated users can list a user's available partners
  if (!context.user) {
    throw new ApolloError('You must be authenticated to perform this action', 'UNAUTHENTICATED')
  }

  const { userID, query } = args

  const usersNotChildrenOrPartnerWithCurrentUser = await context.models.User.find(
    {
      $or: fuzzySearch(query),
      parents: { $nin: [userID] },
      partner: { $ne: userID }
    }
  ).limit(5).lean()

  return usersNotChildrenOrPartnerWithCurrentUser.filter(({ _id }) => _id.toString() !== userID)
}