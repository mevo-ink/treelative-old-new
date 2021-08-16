import admin from '.'

import { v4 as uuidv4 } from 'uuid'

const db = admin.firestore()

// firestore common methods
db.create = async (collection, input) => {
  const id = uuidv4()
  return db.findOneByIdAndUpdate(collection, id, { ...input, id })
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
  await ref.set(input, { merge: true })
  return (await ref.get()).data()
}

db.findOneAndUpdate = async (collection, filters, input) => {
  let queryRef = db.collection(collection)
  for (const [key, filter] of Object.entries(filters)) {
    console.log(key, '==', filter)
    queryRef = queryRef.where(key, '==', filter)
  }
  const results = await queryRef.get()
  const user = results.docs[0].data()
  return db.findOneByIdAndUpdate(collection, user.id, input)
}

db.deleteOne = async (collection, id) => {
  const user = (await db.collection(collection).doc(id).get()).data()
  user.parents.map(async parentID => await db.deleteChild(collection, id, parentID))
  // db.deleteChild(collection, id)
  // return db.collection(collection).doc(id).delete()
}

db.deleteChild = async (collection, childID, parentID) => {
  // remove child from parent
  const parent = (await db.collection(collection).doc(parentID).get()).data()
  parent.children = parent.children.filter(id => id !== childID)
  await db.collection(collection).doc(parentID).set({ children: parent.children }, { merge: true })
  // remove parent from child
  const child = (await db.collection(collection).doc(childID).get()).data()
  child.parents = await child.parents.filter(id => id !== parentID)
  console.log(child.parents)
  await db.collection(collection).doc(childID).set({ parents: child.parents }, { merge: true })
  return true
}

export default db
