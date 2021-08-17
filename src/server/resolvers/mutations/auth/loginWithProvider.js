import { ApolloError } from 'apollo-server-micro'

import admin from 'server/utils/firebase'

import { generateToken } from 'server/utils/authentication'

export default async (parent, args, context, info) => {
  const { email, token } = args

  // verify firebase session id
  await admin.auth().verifyIdToken(token)

  if (!email) {
    throw new ApolloError('User is not registered.', 'UNREGISTERED')
  }

  const user = await context.db.findOne('users', { email })

  if (!user) {
    throw new ApolloError(`We could not find an account associated with the email ${email}`, 'UNREGISTERED')
  }

  return generateToken(user)
}
