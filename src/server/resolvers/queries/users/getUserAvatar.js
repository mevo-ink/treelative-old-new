export default async (parent, args, context, info) => {
  return `${process.env.STORAGE_ENDPOINT}/avatars/${parent.id}.png`
}
