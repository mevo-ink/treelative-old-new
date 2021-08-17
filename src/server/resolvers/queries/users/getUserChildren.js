export default async (user, args, context, info) => {
  const children = user.children && user.children.length > 0 ? await context.db.findAll('users', { id: { in: user.children } }) : []

  return children
}
