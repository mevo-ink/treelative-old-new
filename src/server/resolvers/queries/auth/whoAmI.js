import { ApolloError } from 'apollo-server-micro'

export default async (parent, args, context, info) => {
  if (!context.user) {
    throw new ApolloError('Session expired.', 'SESSION_EXPIRED')
  }

  const user = await context.models.User.findOne({ _id: context.user._id }).lean()

  return user
}
