import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

export const addUserParent = async (context, userID, parentID) => {
  const FieldValue = context.admin.firestore.FieldValue

  // add the parentID as a parent to this user
  const user = await context.db.findOneByIdAndUpdate('users', userID, { parents: FieldValue.arrayUnion(context.db.doc(`users/${parentID}`)) })

  // add this user as a child to the parentID
  const userParent = await context.db.findOneByIdAndUpdate('users', parentID, { children: FieldValue.arrayUnion(context.db.doc(`users/${userID}`)) })

  return { user, userParent }
}

export default async (parent, args, context, info) => {
  const { userID, parentID } = args

  if (!isOwner(context, userID) && !isOwner(context, parentID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { user, userParent } = await addUserParent(context, userID, parentID)

  // if the parent has a partner
  if (userParent.partner) {
    await addUserParent(context, userID, userParent.partner.id)
  }

  return user
}
