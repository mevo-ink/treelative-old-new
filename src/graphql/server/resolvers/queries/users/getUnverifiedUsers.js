import { projectUserProfile } from 'utils/dbProjections'

export default async (parent, args, context, info) => {
  // get all users with email or phone number not approved
  return await context.db.collection('users')
    .find({ $or: [{ email: { $exists: true } }, { phoneNumber: { $exists: true } }], isVerified: false })
    .project({ ...projectUserProfile, email: 1, phoneNumber: 1 })
    .toArray()
}
