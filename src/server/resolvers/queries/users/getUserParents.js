export default async (user, args, context, info) => {
  return Promise.all(user.parents.map(async parent => (await parent.get()).data()))
}
