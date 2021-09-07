import { ApolloError } from 'apollo-server-micro'

import { isOwner } from 'utils/auth'

import addUserPartner from './addUserPartner'

export const addUserParent = async (context, userID, parentID) => {
  // add the parentID as a parent to this user
  const { value: user } = await context.db.collection('users').findOneAndUpdate(
    { _id: context.db.ObjectId(userID) },
    { $addToSet: { parents: context.db.ObjectId(parentID) } },
    { returnDocument: 'after', returnOriginal: false, projection: { parents: 1, _id: 0, id: { $toString: '$_id' } } }
  )

  // add this user as a child to the parentID
  const { value: userParent } = await context.db.collection('users').findOneAndUpdate(
    { _id: context.db.ObjectId(parentID) },
    { $addToSet: { children: context.db.ObjectId(userID) } },
    { returnDocument: 'after', returnOriginal: false, projection: { partner: 1 } }
  )

  return { user, userParent }
}

export default async (parent, args, context, info) => {
  const { userID, parentID } = args

  const session = await isOwner(context.cookies.AUTH_SESSION_ID)
  if (session.error) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { user, userParent } = await addUserParent(context, userID, parentID)

  // if the parent has a partner
  if (userParent.partner) {
    await addUserParent(context, userID, userParent.partner.toString())
  } else {
    const [otherUserParentID] = user.parents.map(parent => parent.toString()).filter(userParentID => parentID !== userParentID)
    otherUserParentID && await addUserPartner(null, { userID: parentID, partnerID: otherUserParentID }, context)
  }

  // clear cache
  context.db.collection('cache').deleteOne({ name: 'graph-layout' })

  return user
}
