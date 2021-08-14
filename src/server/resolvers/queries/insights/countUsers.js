export default async (parent, args, context, info) => {
  const usersCount = await context.models.User.countDocuments()

  return usersCount
}
