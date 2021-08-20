import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

export const addUserChild = async (context, userID, childID) => {
  // add the childID to this user

  const FieldValue = context.admin.firestore.FieldValue

  const user = await context.db.findOneByIdAndUpdate('users', userID, { children: FieldValue.arrayUnion(context.db.doc(`users/${childID}`)) })

  // add this user as a parent for the childID
  await context.db.findOneByIdAndUpdate('users', childID, { parents: FieldValue.arrayUnion(context.db.doc(`users/${userID}`)) })

  return user
}

export default async (parent, args, context, info) => {
  const { userID, childID } = args

  if (!isOwner(context, userID) && !isOwner(context, childID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const user = await addUserChild(context, userID, childID)

  // if the user has a partner
  if (user.partner) {
    await addUserChild(context, user.partner.id, childID)
  }

  return user
}
