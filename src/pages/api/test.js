import { db } from 'server/utils/firebase'

export default async function handler (req, res) {
  const docRef = db.collection('users').doc('alovelace')

  await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  })

  res.json({ hello: 'world' })
}
