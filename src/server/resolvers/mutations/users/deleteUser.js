import { isAdmin } from 'server/utils/authorization'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const response = await context.models.User.deleteOne(
    { _id: args.userID }
  )
  console.log(response)

  // remove user from any parents or children list
  await context.models.User.updateMany(
    { },
    {
      $pull: { parents: args.userID, children: args.userID }
    }
  )

  await context.models.User.updateOne(
    { partner: args.userID },
    {
      $unset: { partner: '' }
    }
  )

  return true
}
