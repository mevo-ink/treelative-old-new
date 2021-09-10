import { ApolloError } from 'apollo-server-micro'

import { ObjectId } from 'mongodb'

import dbConnect from 'utils/mongodb'
import { isOwner } from 'utils/auth'
import { storage } from 'utils/firebaseAdmin'

export default async (parent, args, context, info) => {
  const session = await isOwner(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const db = await dbConnect()

  const user = await db.collection('users').findOne({ _id: ObjectId(args.userID) })

  if (!user) {
    throw new ApolloError('No such user exists', 'NOT_FOUND')
  }

  const file = storage.file(`avatars/${user.id}.png`)
  const presignedUrl = await file.getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000 // 15 minutes
  })

  return presignedUrl[0]
}
