import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'server/utils/authorization'

export const addUserChild = async (models, userID, childID) => {
  // add the childID to this user
  const user = await models.User.findOneAndUpdate(
    { _id: userID },
    { $addToSet: { children: childID } },
    { new: true }
  )

  // add this user as a parent for the childID
  await models.User.updateOne(
    { _id: childID },
    { $addToSet: { parents: userID } }
  )

  return user
}

export default async (parent, args, context, info) => {
  const { userID, childID } = args

  if (!isOwner(context, userID) && !isOwner(context, childID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const user = await addUserChild(context.models, userID, childID)

  // if the user has a partner
  if (user.partner) {
    await addUserChild(context.models, user.partner._id, childID)
  }

  return user
}
