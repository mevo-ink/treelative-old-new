import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  })
}

export const db = admin.firestore()

// firestore common methods
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
  await db.collection(collection).doc(id).set(input, { merge: true })
  return (await db.collection(collection).doc(id).get()).data()
}

db.findOneAndUpdate = async (collection, filters, input) => {
  let queryRef = db.collection(collection)
  for (const [key, filter] of Object.entries(filters)) {
    queryRef = queryRef.where(key, '==', filter)
  }
  const results = await queryRef.get()
  const id = results.docs[0].data()
  return db.findOneByIdAndUpdate(collection, { id }, input)
}

export const storage = admin.storage().bucket('gs://treelative-007.appspot.com')

export default admin
