import { ObjectId } from 'mongodb'

import dbConnect from 'utils/mongodb'
import { auth } from 'utils/firebaseAdmin'
import { projectUserProfile } from 'utils/dbProjections'

export default async (parent, args, context, info) => {
  const { userID, phoneNumber, token } = args

  // verify firebase session id
  await auth().verifyIdToken(token)

  const db = await dbConnect()

  const { value: user } = await db.collection('users')
    .findOneAndUpdate(
      { _id: ObjectId(userID) },
      { $set: { phoneNumber } },
      {
        returnDocument: 'after',
        returnOriginal: false,
        projection: projectUserProfile
      }
    )

  return user
}
