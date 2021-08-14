export default async (parent, args, context, info) => {
  const user = await context.models.User.findOne({ _id: parent.partner }).lean()

  return user
}
