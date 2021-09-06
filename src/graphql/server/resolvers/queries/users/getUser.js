import { ApolloError } from 'apollo-server-micro'

import { isAuthenticated } from 'utils/auth'

export default async (parent, args, context, info) => {
  const user = await context.db.findOneById('users', args.id)

  if (!user.isPublic && !isAuthenticated(context)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  return user
}
