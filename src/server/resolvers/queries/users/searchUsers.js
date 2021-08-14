import fuzzySearch from 'server/utils/fuzzySearch'

export default async (parent, args, context, info) => {
  const users = await context.models.User.find({
    $and: [
      ...args.query.split(' ').map(fuzzySearch).map(q => ({ $or: q }))
    ]
  }).limit(5).lean()

  return users
}
