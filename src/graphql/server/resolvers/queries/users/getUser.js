import { ApolloError } from 'apollo-server-micro'

import { authenticateToken } from 'utils/auth'

import dbConnect from 'utils/mongodb'

export const getUserData = async (userID) => {
  const db = await dbConnect()

  return db.collection('users').findOne({ _id: db.ObjectId(userID) })
}

export default async (parent, args, context, info) => {
  const user = await getUserData(args.id)

  if (!user.isPublic) {
    const session = await authenticateToken(context.cookies.AUTH_SESSION_ID)
    if (session.error) {
      throw new ApolloError(session.error, 'UNAUTHORIZED')
    }
  }

  user.id = user._id
  delete user._id
  return user
}
