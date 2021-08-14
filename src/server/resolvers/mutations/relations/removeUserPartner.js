import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

import { removeUserChild } from './removeUserChild'

export default async (parent, args, context, info) => {
  const { userID, partnerID } = args

  if (!isOwner(context, userID) && !isOwner(context, partnerID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  // remove the partnerID as a partner from userID
  const user = await context.models.User.findOneAndUpdate(
    { _id: userID },
    { $unset: { partner: '' } },
    { new: true }
  )

  // remove the userID as a partner from partnerID
  const partner = await context.models.User.findOneAndUpdate(
    { _id: partnerID },
    { $unset: { partner: '' } },
    { new: true }
  )

  // if either couple has children - remove them all
  const userChildIDs = user.children.map(({ _id }) => _id)
  const partnerChildIDs = partner.children.map(({ _id }) => _id)

  if (userChildIDs.length > 0) {
    for (const id of userChildIDs) {
      await removeUserChild(context.models, userID, id)
    }
  }

  if (partnerChildIDs.length > 0) {
    for (const id of partnerChildIDs) {
      await removeUserChild(context.models, partnerID, id)
    }
  }

  return user
}
