import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

export default async (parent, args, context, info) => {
  if (!isOwner(context, args.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const updateObject = {}
  for (const key in args.input) {
    updateObject[`social.${key}`] = args.input[key]
  }

  const user = await context.models.User.findOneAndUpdate(
    { _id: args.userID },
    { $set: updateObject },
    { new: true }
  )

  return user
}
