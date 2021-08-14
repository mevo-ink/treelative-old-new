import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

import { hash } from 'bcryptjs'

export default async (parent, args, context, info) => {
  const { userID, password } = args

  if (!isOwner(context, userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const hashedPassword = await hash(password, 10)

  const response = await context.models.User.updateOne(
    { _id: userID },
    { password: hashedPassword }
  )

  return response.ok === 1
}
