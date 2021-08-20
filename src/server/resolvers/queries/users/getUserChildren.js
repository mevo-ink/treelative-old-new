export default async (user, args, context, info) => {
  return Promise.all(user.children.map(async child => {
    if (typeof child === 'string') {
      return context.db.findOneById('users', child.split('/').pop())
    } else {
      return (await child.get()).data()
    }
  }))
}
