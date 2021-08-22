import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

export const removeUserChild = async (context, userID, childID) => {
  const FieldValue = context.admin.firestore.FieldValue

  // remove the childID from this user
  const user = await context.db.findOneByIdAndUpdate('users', userID, { children: FieldValue.arrayRemove(context.db.doc(`users/${childID}`)) })

  // remove this user as a parent from childID
  await context.db.findOneByIdAndUpdate('users', childID, { parents: FieldValue.arrayRemove(context.db.doc(`users/${userID}`)) })

  return user
}

export default async (parent, args, context, info) => {
  const { userID, childID } = args

  if (!isOwner(context, userID) && !isOwner(context, childID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const user = await removeUserChild(context, userID, childID)

  // if the user has a partner
  if (user.partner) {
    await removeUserChild(context, user.partner.id, userID)
  }

  // clear cache
  context.db.deleteCache('network-layout')

  return user
}
