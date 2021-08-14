import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

import minioClient from 'server/utils/minioClient'

export default async (parent, args, context, info) => {
  if (!isOwner(context, args.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const user = await context.models.User.findOne({ _id: args.userID }, 'id').lean()

  if (!user) {
    throw new ApolloError('No such user exists', 'FORBIDDEN')
  }

  // expires in 60 secs
  const presignedUrl = minioClient.presignedPutObject('avatar', `${args.userID}.jpg`, 60)

  return presignedUrl
}
