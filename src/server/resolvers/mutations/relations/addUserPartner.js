import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

import { addUserChild } from './addUserChild'

export default async (parent, args, context, info) => {
  const { userID, partnerID } = args

  if (!isOwner(context, userID) && !isOwner(context, partnerID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  // add the partnerID as a partner to userID
  const user = await context.db.findOneByIdAndUpdate('users', userID, { partner: partnerID })

  // add the userID as a partner to partnerID
  const partner = await context.db.findOneByIdAndUpdate('users', partnerID, { partner: userID })

  // if either couple has children - connect any missing ones
  const userChildIDs = user.children || []
  const partnerChildIDs = partner.children || []

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
      await addUserChild(context, partnerID, id)
    }
  }

  if (partnerChildrenNotInUser.length > 0) {
    for (const id of partnerChildrenNotInUser) {
      await addUserChild(context, userID, id)
    }
  }

  return user
}
