import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

export const removeUserParent = async (context, userID, parentID) => {
  const FieldValue = context.admin.firestore.FieldValue

  // remove the parentID as a parent from this user
  const user = await context.db.findOneByIdAndUpdate('users', userID, { parents: FieldValue.arrayRemove(parentID) })

  // remove this user as a child from the parentID
  const userParent = await context.db.findOneByIdAndUpdate('users', parentID, { children: FieldValue.arrayRemove(userID) })

  return { user, userParent }
}

export default async (parent, args, context, info) => {
  const { userID, parentID } = args

  if (!isOwner(context, userID) && !isOwner(context, parentID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { user, userParent } = await removeUserParent(context, userID, parentID)

  // if the parent has a partner
  if (userParent.partner) {
    await removeUserParent(context, userID, userParent.partner)
  }

  return user
}
