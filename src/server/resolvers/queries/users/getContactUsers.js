export default async (parent, args, context, info) => {
  const adminUsers = await context.db.findAll('users', { isAdmin: { '==': true } })

  return adminUsers
}
