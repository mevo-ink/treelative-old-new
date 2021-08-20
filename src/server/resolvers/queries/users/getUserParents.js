export default async (user, args, context, info) => {
  const userParentsRef = (await context.db.findOneById('users', user.id)).parents
  return Promise.all(userParentsRef.map(async parent => (await parent.get()).data()))
}
