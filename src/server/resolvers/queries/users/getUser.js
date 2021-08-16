import { ApolloError } from 'apollo-server-micro'

import { isAuthenticated } from 'server/utils/authorization'

export default async (parent, args, context, info) => {
  // const user = await context.models.User.findOne({ _id: args.id }).lean()

  const user = (await context.db.collection('users').doc(args.id).get()).data()

  if (!user.isPublic && !isAuthenticated(context)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  return user
}
