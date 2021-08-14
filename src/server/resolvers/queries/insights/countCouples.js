export default async (parent, args, context, info) => {
  const usersCount = await context.models.User.countDocuments({ partner: { $ne: null } }) || 0

  return usersCount > 1 ? usersCount / 2 : usersCount
}
