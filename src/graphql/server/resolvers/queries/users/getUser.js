import { ApolloError } from 'apollo-server-micro'

import { authenticateToken } from 'utils/auth'

export default async (parent, args, context, info) => {
  const user = await context.db.collection('users').findOne({ _id: context.db.ObjectId(args.id) })

  if (!user.isPublic) {
    const session = await authenticateToken(context.cookies.AUTH_SESSION_ID)
    if (session.error) {
      throw new ApolloError(session.error, 'UNAUTHORIZED')
    }
  }

  return user
}
