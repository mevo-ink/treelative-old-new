import dbConnect from 'utils/mongodb'

export default async (parent, args, context, info) => {
  const db = await dbConnect()

  return await db.collection('users').countDocuments({})
}
