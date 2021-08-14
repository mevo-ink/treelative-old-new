export default async (parent, args, context, info) => {
  return `https://${process.env.MINIO_ENDPOINT}/avatar/${parent._id}.jpg`
}
