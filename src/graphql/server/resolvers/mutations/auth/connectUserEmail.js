import { ObjectId } from 'mongodb'

import dbConnect from 'utils/mongodb'
import { auth } from 'utils/firebaseAdmin'

export default async (parent, args, context, info) => {
  const { userID, email, token } = args

  // verify firebase session id
  await auth().verifyIdToken(token)

  const db = await dbConnect()

  await db.collection('users').findOneAndUpdate({ _id: ObjectId(userID) }, { email }, { projection: { _id: 1 } })

  return true
}
