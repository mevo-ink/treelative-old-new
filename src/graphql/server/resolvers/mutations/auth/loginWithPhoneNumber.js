import { ApolloError } from 'apollo-server-micro'

import { auth } from 'utils/firebaseAdmin'
import { generateToken } from 'utils/auth'

import nookies from 'nookies'

export default async (parent, args, context, info) => {
  const { phoneNumber, token } = args

  // verify firebase session id
  await auth().verifyIdToken(token)

  if (!phoneNumber) {
    throw new ApolloError('User is not registered.', 'UNREGISTERED')
  }

  const user = await context.db.collection('users').findOne(
    { phoneNumber },
    { projection: { _id: 0, id: { $toString: '$_id' }, phoneNumber: 1, isVerified: 1, isAdmin: 1 } }
  )

  if (!user) {
    throw new ApolloError(`We could not find an account associated with the phone number ${phoneNumber}`, 'UNREGISTERED')
  }

  if (!user.isVerified) {
    throw new ApolloError(`You account with phone number ${phoneNumber} has not been activated yet.`, 'UNREGISTERED')
  }

  const authToken = generateToken(user)

  nookies.set(context, 'AUTH_SESSION_USER', user.id, { path: '/' })
  nookies.set(context, 'AUTH_SESSION_ID', authToken, { path: '/' })

  return authToken
}
