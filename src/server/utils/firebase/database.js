import admin from '.'

const db = admin.firestore()

// firestore common methods
db.create = async (collection, input) => {
  const newUserRef = db.collection('users').doc()
  await newUserRef.set({ ...input, id: newUserRef.id })
  return db.findOneById(collection, newUserRef.id)
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

db.findAll = async (collection, filters = {}, limit = 99999) => {
  let queryRef = db.collection(collection)
  for (const [key, filter] of Object.entries(filters)) {
    const [operator, value] = Object.entries(filter)[0]
    queryRef = queryRef.where(key, operator, value)
  }
  const snapshot = await queryRef.limit(limit).get()
  return snapshot.docs.map(doc => doc.data())
}

db.findOneByIdAndUpdate = async (collection, id, input) => {
  const ref = db.collection(collection).doc(id)
  await ref.update(input)
  return (await ref.get()).data()
}

db.findOneAndUpdate = async (collection, filters, input) => {
  let queryRef = db.collection(collection)
  for (const [key, filter] of Object.entries(filters)) {
    queryRef = queryRef.where(key, '==', filter)
  }
  const results = await queryRef.get()
  return results.empty ? null : db.findOneByIdAndUpdate(collection, results.docs[0].data().id, input)
}

db.deleteOneById = async (collection, id) => {
  const ref = db.collection(collection).doc(id)
  await ref.delete()
}

db.checkCache = async (id) => {
  const snapshot = await db.collection('cache').doc(id).get()
  return snapshot.exists
}

db.readCache = async (id) => {
  const snapshot = await db.collection('cache').doc(id).get()
  return snapshot.exists ? snapshot.data() : null
}

db.writeCache = async (id, data) => {
  db.collection('cache').doc(id).set(data)
}

db.deleteCache = async (id) => {
  db.collection('cache').doc(id).delete()
}

export default db
