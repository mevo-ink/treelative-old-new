import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'utils/auth'

export default async (parent, args, context, info) => {
  if (!isOwner(context, args.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const updateObject = {}
  for (const key in args.input) {
    updateObject[`social.${key}`] = args.input[key]
  }

  const user = await context.db.findOneByIdAndUpdate('users', args.userID, updateObject)

  return user
}
