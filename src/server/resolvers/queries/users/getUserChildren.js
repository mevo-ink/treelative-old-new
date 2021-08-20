export default async (user, args, context, info) => {
  const userChildrenRef = (await context.db.findOneById('users', user.id)).children
  return Promise.all(userChildrenRef.map(async child => (await child.get()).data()))
}
