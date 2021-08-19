export default async (user, args, context, info) => {
  return Promise.all(user.children.map(async parent => (await parent.get()).data()))
}
