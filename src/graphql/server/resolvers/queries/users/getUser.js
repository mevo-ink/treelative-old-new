import { ApolloError } from 'apollo-server-micro'

import { authenticateToken } from 'utils/auth'
import dbConnect from 'utils/mongodb'
import { expandUserRelations } from 'utils/dbProjections'

export const getUserData = async (userID) => {
  try {
    const db = await dbConnect()

    const user = await db.collection('users').findOne({ _id: db.ObjectId(userID) })

    if (!user) return null

    user.avatar = `${process.env.STORAGE_ENDPOINT}/avatars/${user._id.toString()}.png`
    user.brokenImage = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`

    await expandUserRelations(user)

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
