export default async (parent, args, context, info) => {
  const users = parent.parents ? await context.db.findAll('users', { id: { in: parent.parents } }) : []

  return users
}
