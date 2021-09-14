export default async (parent, args, context, info) => {
  return context.db.collection('fcm').insertOne(args)
}
