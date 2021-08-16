import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

import { updateAndReturn } from 'server/utils/helperFunctions'

import getParsedLocations from 'server/utils/getParsedLocations'

export default async (parent, args, context, info) => {
  if (!isOwner(context, args.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  // parse location data
  const parsedLocations = await getParsedLocations(args.input)

  // const user = await context.models.User.findOneAndUpdate(
  //   { _id: args.userID },
  //   { ...args.input, ...parsedLocations },
  //   { new: true }
  // )

  return updateAndReturn(context, args, parsedLocations)
}
