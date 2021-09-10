import fuzzySearch from 'utils/fuzzySearch'

import { projectUserProfile } from 'utils/dbProjections'

export default async (parent, args, context, info) => {
  const { query = '' } = args

  // get users that match the search term and not a parent and partner of userID
  const users = await context.db.collection('users').find(
    {
      $and: [
        ...query.split(' ').map(fuzzySearch).map(q => ({ $or: q }))
      ]
    },
    {
      projection: projectUserProfile
    }
  ).limit(5).toArray()

  return users
}
