import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

export const removeUserChild = async (models, userID, childID) => {
  // remove the childID from this user
  const user = await models.User.findOneAndUpdate(
    { _id: userID },
    { $pull: { children: childID } },
    { new: true }
  )

  // remove this user as a parent from childID
  await models.User.updateOne(
    { _id: childID },
    { $pull: { parents: userID } }
  )

  return user
}

export default async (parent, args, context, info) => {
  const { userID, childID } = args

  if (!isOwner(context, userID) && !isOwner(context, childID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const user = await removeUserChild(context.models, userID, childID)

  // if the user has a partner
  if (user.partner) {
    await removeUserChild(context.models, user.partner._id, userID)
  }

  return user
}
