export const updateAndReturn = async (context, userID, argsInput) => {
  await context.db.collection('users').doc(userID).set({ id: userID, ...argsInput }, { merge: true })
  return (await context.db.collection('users').doc(userID).get()).data()
}
