export default async (parent, args, context, info) => {
  const searchResults = await context.algolia.search(args.query, {
    hitsPerPage: 5
  })

  return searchResults.hits
}
