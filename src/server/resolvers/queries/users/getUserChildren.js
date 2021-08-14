export default async (parent, args, context, info) => {
  const users = await context.models.User.find({ _id: { $in: parent.children } }).lean()

  return users
}
