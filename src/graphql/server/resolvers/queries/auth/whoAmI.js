import { ApolloError } from 'apollo-server-micro'

import { authenticateToken } from 'utils/auth'

export default async (parent, args, context, info) => {
  const session = await authenticateToken(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError(session.error, 'UNAUTHORIZED')
  }

  return session.user
}
