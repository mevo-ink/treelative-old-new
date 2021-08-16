export const updateAndReturn = async (context, args, parsedLocations) => {
  await context.db.collection('users').doc(args.userID).set({
    id: args.userID,
    ...args.input,
    ...parsedLocations
  }, { merge: true })

  const user = (await context.db.collection('users').doc(args.userID).get()).data()
  return user
}
