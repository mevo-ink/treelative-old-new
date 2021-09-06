export default async (parent, args, context, info) => {
  const users = await context.db.findAll('users', { currentLocation: { '!=': null } })

  const usersMatching = []

  for (const user of users) {
    if (args.country === user.currentLocation?.country) {
      usersMatching.push(user)
    }
  }

  return usersMatching
}
