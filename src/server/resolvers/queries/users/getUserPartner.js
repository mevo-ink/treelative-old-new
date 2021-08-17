export default async (parent, args, context, info) => {
  const user = parent.partner ? await context.db.findOneById('users', parent.partner) : null

  return user
}
