import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

export const removeUserParent = async (models, userID, parentID) => {
  // remove the parentID as a parent from this user
  const user = await models.User.findOneAndUpdate(
    { _id: userID },
    { $pull: { parents: parentID } },
    { new: true }
  )

  // remove this user as a child from the parentID
  const userParent = await models.User.findOneAndUpdate(
    { _id: parentID },
    { $pull: { children: userID } },
    { new: true }
  )

  return { user, userParent }
}

export default async (parent, args, context, info) => {
  const { userID, parentID } = args

  if (!isOwner(context, userID) && !isOwner(context, parentID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { user, userParent } = await removeUserParent(context.models, userID, parentID)

  // if the parent has a partner
  if (userParent.partner) {
    await removeUserParent(context.models, userID, userParent.partner._id)
  }

  return user
}
