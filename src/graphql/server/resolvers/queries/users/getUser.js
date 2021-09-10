import { ApolloError } from 'apollo-server-micro'

import { authenticateToken } from 'utils/auth'
import dbConnect from 'utils/mongodb'
import { projectUserProfile } from 'utils/dbProjections'

export const getUserData = async (userID) => {
  try {
    const db = await dbConnect()

    const user = await db.collection('users').findOne({ _id: db.ObjectId(userID) })

    if (!user) return null

    user.id = user._id
    delete user._id

    // get user documents from user.children, user.parents and user.partner refs
    if (user.children) user.children = await db.collection('users').find({ _id: { $in: user.children } }).project(projectUserProfile).toArray()
    if (user.parents) user.parents = await db.collection('users').find({ _id: { $in: user.parents } }).project(projectUserProfile).toArray()
    if (user.partner) user.partner = await db.collection('users').findOne({ _id: user.partner }).project(projectUserProfile)

    // serialize the user object to make it JSON-serializable
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    return { error: error.message }
  }
}

export default async (parent, args, context, info) => {
  const user = await getUserData(args.id)

  if (!user) return null

  if (user.error) throw new ApolloError(user.error)

  if (!user.isPublic) {
    const session = await authenticateToken(context.cookies.AUTH_SESSION_ID)
    if (session.error) {
      throw new ApolloError(session.error, 'UNAUTHORIZED')
    }
  }

  return user
}
