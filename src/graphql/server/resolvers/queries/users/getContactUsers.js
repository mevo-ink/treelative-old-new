import { projectUserProfile } from 'utils/dbProjections'

export default async (parent, args, context, info) => {
  return await context.db.collection('users')
    .find({ isAdmin: true })
    .project(projectUserProfile)
    .toArray()
}
