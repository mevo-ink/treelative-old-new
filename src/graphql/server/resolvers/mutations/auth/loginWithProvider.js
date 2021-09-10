import { ApolloError } from 'apollo-server-micro'

import { auth } from 'utils/firebaseAdmin'
import { generateToken } from 'utils/auth'

export default async (parent, args, context, info) => {
  const { email, token } = args

  // verify firebase session id
  await auth().verifyIdToken(token)

  if (!email) {
    throw new ApolloError('User is not registered.', 'UNREGISTERED')
  }

  const user = await context.db.collection('users').findOne(
    { email },
    { projection: { _id: 0, id: { $toString: '$_id' }, email: 1, isEmailVerified: 1, isAdmin: 1 } }
  )

  if (!user) {
    throw new ApolloError(`We could not find an account associated with the email ${email}`, 'UNREGISTERED')
  }

  if (!user.isEmailVerified) {
    throw new ApolloError(`You account with email ${email} has not been activated yet.`, 'UNREGISTERED')
  }

  return generateToken(user)
}
