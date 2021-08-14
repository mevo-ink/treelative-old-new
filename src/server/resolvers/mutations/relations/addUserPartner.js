import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

import { addUserChild } from './addUserChild'

export default async (parent, args, context, info) => {
  const { userID, partnerID } = args

  if (!isOwner(context, userID) && !isOwner(context, partnerID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  // add the partnerID as a partner to userID
  const user = await context.models.User.findOneAndUpdate(
    { _id: userID },
    { partner: { _id: partnerID } },
    { new: true }
  )

  // add the userID as a partner to partnerID
  const partner = await context.models.User.findOneAndUpdate(
    { _id: partnerID },
    { partner: { _id: userID } },
    { new: true }
  )

  // if either couple has children - connect any missing ones
  const userChildIDs = user.children.map(({ _id }) => _id)
  const partnerChildIDs = partner.children.map(({ _id }) => _id)

  const userChildrenNotInPartner = []
  for (const userID of userChildIDs) {
    if (!partnerChildIDs.includes(userID)) {
      userChildrenNotInPartner.push(userID)
    }
  }

  const partnerChildrenNotInUser = []
  for (const userID of partnerChildIDs) {
    if (!userChildIDs.includes(userID)) {
      partnerChildrenNotInUser.push(userID)
    }
  }

  if (userChildrenNotInPartner.length > 0) {
    for (const id of userChildrenNotInPartner) {
      await addUserChild(context.models, partnerID, id)
    }
  }

  if (partnerChildrenNotInUser.length > 0) {
    for (const id of partnerChildrenNotInUser) {
      await addUserChild(context.models, userID, id)
    }
  }

  return user
}
