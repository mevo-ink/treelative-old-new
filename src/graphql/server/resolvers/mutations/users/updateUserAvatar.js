import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'utils/auth'

export default async (parent, args, context, info) => {
  if (!isOwner(context, args.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const user = await context.db.findOneById('users', args.userID)

  if (!user) {
    throw new ApolloError('No such user exists', 'FORBIDDEN')
  }

  const file = context.storage.file(`avatars/${user.id}.png`)
  const presignedUrl = await file.getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000 // 15 minutes
  })

  return presignedUrl[0]
}
