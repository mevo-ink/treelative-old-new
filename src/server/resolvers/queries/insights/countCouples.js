export default async (parent, args, context, info) => {
  const snapshot = await context.db.collection('users').where('partner', '!=', null).get()

  const usersCount = snapshot.docs.length

  return usersCount > 1 ? usersCount / 2 : usersCount
}
