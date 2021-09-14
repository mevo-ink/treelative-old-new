import { admin } from 'utils/firebaseAdmin'

export default async (parent, args, context, info) => {
  const { title, description } = args

  const fcmTokens = (await context.db.collection('fcm')
    .find({}, { projection: { _id: 0, token: 1 } })
    .toArray())
    .map(({ token }) => token)

  const response = await admin.messaging().sendToDevice(fcmTokens, {
    data: {
      title,
      description
    }
  })

  return response
}
