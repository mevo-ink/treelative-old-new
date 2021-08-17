import admin from '.'

const db = admin.firestore()

// firestore common methods
db.create = async (collection, input) => {
  const { id } = db.collection('users').doc()
  return db.findOneByIdAndUpdate(collection, id, { ...input, id })
}

db.findOneById = async (collection, id) => {
  return (await db.collection(collection).doc(id).get()).data()
}

db.findOne = async (collection, filters) => {
  let queryRef = db.collection(collection)
  for (const [key, filter] of Object.entries(filters)) {
    queryRef = queryRef.where(key, '==', filter)
  }
  const results = await queryRef.get()
  return results.empty ? null : results.docs[0].data()
}

db.findAll = async (collection, filters = {}) => {
  let queryRef = db.collection(collection)
  for (const [key, filter] of Object.entries(filters)) {
    const [operator, value] = Object.entries(filter)[0]
    queryRef = queryRef.where(key, operator, value)
  }
  const snapshot = await queryRef.get()
  return snapshot.docs.map(doc => doc.data())
}

db.findOneByIdAndUpdate = async (collection, id, input) => {
  const ref = db.collection(collection).doc(id)
  await ref.update(input)
  return (await ref.get()).data()
}

db.deleteOneById = async (collection, id) => {
  const ref = db.collection(collection).doc(id)
  await ref.delete()
}

export default db