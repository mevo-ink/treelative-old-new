import { ObjectId } from 'mongodb'

import dbConnect from 'utils/mongodb'
import { projectUserProfile } from 'utils/dbProjections'

export default async (parent, args, context, info) => {
  const { userID, isVerified } = args

  const db = await dbConnect()

  let userUpdateInput = { $set: { isVerified } }
  if (!isVerified) {
    userUpdateInput = {
      $unset: {
        email: 1,
        phoneNumber: 1
      }
    }
  }

  const { value: user } = await db.collection('users')
    .findOneAndUpdate(
      { _id: ObjectId(userID) },
      userUpdateInput,
      {
        returnDocument: 'after',
        returnOriginal: false,
        projection: { ...projectUserProfile, email: 1, phoneNumber: 1 }
      }
    )

  return user
}
