import { ApolloError } from 'apollo-server-micro'

import { compare } from 'bcryptjs'

import { generateToken } from 'server/utils/authentication'

export default async (parent, args, context, info) => {
  const { username, password } = args.input

  // const usersRef = context.db.collection('users')
  // const userDoc = await usersRef.where('username', '==', username).get()
  // if (userDoc.empty) {
  //   throw new ApolloError('Incorrect email or password.', 'UNAUTHENTICATED')
  // }

  // const userSnapshot = userDoc.docs[0]
  // const user = userSnapshot.data()

  const user = await context.db.findOne('users', { username })

  if (!user) {
    throw new ApolloError('Incorrect email or password.', 'UNAUTHENTICATED')
  }

  if (!await compare(password, user.password)) {
    throw new ApolloError('Incorrect email or password.', 'UNAUTHENTICATED')
  }

  const { id, isAdmin } = user

  const token = generateToken({ id, isAdmin })

  return token
}
