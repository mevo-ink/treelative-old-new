export default async (parent, args, context, info) => {
  const snapshot = await context.db.collection('users').get()

  const usersCount = snapshot.docs.length

  return usersCount
}
