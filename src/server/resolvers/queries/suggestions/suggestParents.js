import { ApolloError } from 'apollo-server-micro'

import fuzzySearch from 'server/utils/fuzzySearch'

export default async (parent, args, context, info) => {
  // only authenticated users can list a user's available partners
  if (!context.user) {
    throw new ApolloError('You must be authenticated to perform this action', 'UNAUTHENTICATED')
  }

  const { userID, query } = args

  const usersNotChildrenOrPartnerWithCurrentUser = await context.db.findAll('users',
    {
      // $or: fuzzySearch(query),
      parents: { 'not-in': [[context.db.doc(`users/${userID}`)]] },
      // partner: { '!=': userID }
    },
    5
  )

  return usersNotChildrenOrPartnerWithCurrentUser.filter(id => id !== userID)
}
