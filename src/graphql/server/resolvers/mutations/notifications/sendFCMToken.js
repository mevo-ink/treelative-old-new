export default async (parent, args, context, info) => {
  return context.db.collection('fcm').update(
    {
      token: args.token, fingerprint: args.fingerprint
    },
    {
      $set: args
    },
    {
      upsert: true
    }
  )
}
