export default async (user, args, context, info) => {
  return Promise.all(user.parents.map(async parent => {
    if (typeof parent === 'string') {
      return context.db.findOneById('users', parent.split('/').pop())
    } else {
      return (await parent.get()).data()
    }
  }))
}
