export default async (user, args, context, info) => {
  return user.partner ? (await user.partner.get()).data() : null
}
