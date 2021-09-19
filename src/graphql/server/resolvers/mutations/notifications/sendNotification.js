import { admin } from 'utils/firebaseAdmin'

export default async (parent, args, context, info) => {
  const { title, description } = args

  const fcmTokens = (await context.db.collection('fcm')
    .find({}, { projection: { _id: 0, token: 1 } })
    .toArray())
    .map(({ token }) => token)

  if (fcmTokens.length === 0) {
    return { message: 'No FCM tokens registered' }
  }

  const response = await admin.messaging().sendToDevice(fcmTokens, {
    data: {
      title,
      description
    }
  })

  return response
}
