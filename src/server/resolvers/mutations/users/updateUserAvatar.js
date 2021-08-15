import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

export default async (parent, args, context, info) => {
  if (!isOwner(context, args.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const user = await context.models.User.findOne({ _id: args.userID }, 'id').lean()

  if (!user) {
    throw new ApolloError('No such user exists', 'FORBIDDEN')
  }

  const file = context.storage.file(`avatars/${user._id.toString()}.png`)
  const presignedUrl = await file.getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000 // 15 minutes
  })

  return presignedUrl[0]
}
