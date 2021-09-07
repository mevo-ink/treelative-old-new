import { ApolloError } from 'apollo-server-micro'

import dbConnect from 'utils/mongodb'
import admin from 'utils/firebase'
import { generateToken } from 'utils/auth'

export default async (parent, args, context, info) => {
  const { email, token } = args

  // verify firebase session id
  await admin.auth().verifyIdToken(token)

  if (!email) {
    throw new ApolloError('User is not registered.', 'UNREGISTERED')
  }

  const db = await dbConnect()

  const user = await db.collection('users').findOne({ email }, { projection: { _id: 1, email: 1, isEmailVerified: 1, isAdmin: 1 } })

  if (!user) {
    throw new ApolloError(`We could not find an account associated with the email ${email}`, 'UNREGISTERED')
  }

  if (!user.isEmailVerified) {
    throw new ApolloError(`You account with email ${email} has not been activated yet.`, 'UNREGISTERED')
  }

  const { id, isAdmin } = user

  return generateToken({ id, isAdmin })
}
