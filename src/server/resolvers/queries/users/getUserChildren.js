export default async (parent, args, context, info) => {
  const users = parent.children ? await context.db.findAll('users', { id: { in: parent.children } }) : []

  return users
}
