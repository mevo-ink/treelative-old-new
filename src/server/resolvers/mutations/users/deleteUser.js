import { isAdmin } from 'server/utils/authorization'

export default async (parent, args, context, info) => {
  isAdmin(context)

  await context.db.deleteOneById('users', args.userID)

  const FieldValue = context.admin.firestore.FieldValue

  // remove user from any parents or children list
  await context.db.findAndUpdate('users', {}, { parents: FieldValue.arrayRemove(args.userID), children: FieldValue.arrayRemove(args.userID) })

  // remove user from partner's partner field
  await context.db.findAndUpdate('users', { partner: { '==': args.userID } }, { partner: FieldValue.delete() })

  return true
}
