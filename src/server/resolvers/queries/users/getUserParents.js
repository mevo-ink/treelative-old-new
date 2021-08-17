export default async (user, args, context, info) => {
  const parents = user.parents && user.parents.length ? await context.db.findAll('users', { id: { in: user.parents } }) : []

  return parents
}
