import dbConnect from 'utils/mongodb'

export default async (parent, args, context, info) => {
  const db = await dbConnect()

  const couplesCount = await db.collection('users').countDocuments({ partner: { $exists: true } })

  return couplesCount > 1 ? couplesCount / 2 : couplesCount
}
