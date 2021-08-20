export default async (user, args, context, info) => {
  if (typeof user.partner === 'string') {
    return context.db.findOneById('users', user.partner.split('/').pop())
  } else {
    return user.partner ? (await user.partner.get()).data() : null
  }
}
