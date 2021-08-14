export default async (parent, args, context, info) => {
  const users = await context.models.User.find({ _id: { $in: parent.parents } }).lean()

  return users
}
