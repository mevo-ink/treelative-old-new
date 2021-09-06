import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'utils/auth'

import { hash } from 'bcryptjs'

export default async (parent, args, context, info) => {
  const { userID, password } = args

  if (!isOwner(context, userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const hashedPassword = await hash(password, 10)

  await context.db.findOneByIdAndUpdate('users', args.userID, { password: hashedPassword })

  return true
}
