import { ApolloError } from 'apollo-server-micro'

export default async (parent, args, context, info) => {
  // only authenticated users can list a user's available partners
  if (!context.user) {
    throw new ApolloError('You must be authenticated to perform this action', 'UNAUTHENTICATED')
  }

  // const usersNotChildrenOrPartnerWithCurrentUser = await context.db.findAll('users',
  //   {
  //     // $or: fuzzySearch(query),
  //     parents: { 'not-in': [[context.db.doc(`users/${userID}`)]] },
  //     // partner: { '!=': userID }
  //   },
  //   5
  // )
  const searchQueries = args.query.toLowerCase().split(' ')
  const results = []

  const snapshot = await context.db.collection('users').get()

  for (const searchQuery of searchQueries) {
    const partialResult = []
    for (const doc of snapshot.docs) {
      const snapshot = await doc.data()
      if (snapshot.id === context.user.id) continue
      if (snapshot.parents.map(parent => parent.id).includes(args.userID)) continue
      if (snapshot.partner?.id === args.userID) continue
      // if snapshot matches the search query; add to partialResult
      if (snapshot.shortName?.toLowerCase().includes(searchQuery)) {
        partialResult.push(snapshot)
      } else if (snapshot.fullName?.toLowerCase().includes(searchQuery)) {
        partialResult.push(snapshot)
      } else if (snapshot.email?.toLowerCase().includes(searchQuery)) {
        partialResult.push(snapshot)
      } else if (snapshot.phoneNumber?.toLowerCase().includes(searchQuery)) {
        partialResult.push(snapshot)
      } else if (snapshot.birthLocation?.description.toLowerCase().includes(searchQuery)) {
        partialResult.push(snapshot)
      } else if (snapshot.currentLocation?.description.toLowerCase().includes(searchQuery)) {
        partialResult.push(snapshot)
      }
      // limit partialResult to 5
      if (partialResult.length === 5) break
    }
    results.push(partialResult)
  }

  // get intersection of all partial results
  return results.reduce((a, b) => a.filter(c => b.find(({ id }) => id === c.id)))
}
