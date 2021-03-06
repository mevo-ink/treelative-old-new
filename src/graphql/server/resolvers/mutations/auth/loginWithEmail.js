import { ApolloError } from 'apollo-server-micro'

import { auth } from 'utils/firebaseAdmin'
import { generateToken } from 'utils/auth'

import nookies from 'nookies'

export default async (parent, args, context, info) => {
  const { email, token } = args

  // verify firebase session id
  await auth().verifyIdToken(token)

  if (!email) {
    throw new ApolloError('User is not registered.', 'UNREGISTERED')
  }

  const user = await context.db.collection('users').findOne(
    { email },
    { projection: { _id: 0, id: { $toString: '$_id' }, email: 1, isVerified: 1, isAdmin: 1 } }
  )

  if (!user) {
    throw new ApolloError(`We could not find an account associated with the email ${email}`, 'UNREGISTERED')
  }

  if (!user.isVerified) {
    throw new ApolloError(`You account with email ${email} has not been activated yet.`, 'UNREGISTERED')
  }

  const authToken = generateToken(user)

  nookies.set(context, 'AUTH_SESSION_USER', user.id, { path: '/' })
  nookies.set(context, 'AUTH_SESSION_ID', authToken, { path: '/' })

  return authToken
}
