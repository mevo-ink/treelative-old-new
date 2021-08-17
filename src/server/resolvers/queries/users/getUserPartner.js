export default async (user, args, context, info) => {
  const partner = user.partner ? await context.db.findOneById('users', user.partner) : null

  return partner
}
