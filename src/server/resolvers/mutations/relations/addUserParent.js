import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

export const addUserParent = async (models, userID, parentID) => {
  // add the parentID as a parent to this user
  const user = await models.User.findOneAndUpdate(
    { _id: userID },
    { $addToSet: { parents: { _id: parentID } } },
    { new: true }
  )

  // add this user as a child to the parentID
  const userParent = await models.User.findOneAndUpdate(
    { _id: parentID },
    { $addToSet: { children: { _id: userID } } },
    { new: true }
  )

  return { user, userParent }
}

export default async (parent, args, context, info) => {
  const { userID, parentID } = args

  if (!isOwner(context, userID) && !isOwner(context, parentID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { user, userParent } = await addUserParent(context.models, userID, parentID)

  // if the parent has a partner
  if (userParent.partner) {
    await addUserParent(context.models, userID, userParent.partner._id)
  }

  return user
}
