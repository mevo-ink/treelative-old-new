export default async (user, args, context, info) => {
  const userPartnerRef = (await context.db.findOneById('users', user.id)).partner
  return userPartnerRef ? (await userPartnerRef.get()).data() : null
}
