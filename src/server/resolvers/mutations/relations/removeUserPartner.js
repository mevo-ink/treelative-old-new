import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

import { removeUserChild } from './removeUserChild'

export default async (parent, args, context, info) => {
  const { userID, partnerID } = args

  if (!isOwner(context, userID) && !isOwner(context, partnerID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  // remove the partnerID as a partner from userID
  const user = await context.db.findOneByIdAndUpdate('users', userID, { partner: null })

  // remove the userID as a partner from partnerID
  const partner = await context.db.findOneByIdAndUpdate('users', partnerID, { partner: null })

  // if either couple has children - remove them all
  const userChildIDs = user.children.map(child => child.id) || []
  const partnerChildIDs = partner.children.map(child => child.id) || []

  if (userChildIDs.length > 0) {
    for (const id of userChildIDs) {
      await removeUserChild(context, userID, id)
    }
  }

  if (partnerChildIDs.length > 0) {
    for (const id of partnerChildIDs) {
      await removeUserChild(context, partnerID, id)
    }
  }

  return user
}
