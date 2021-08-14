import admin from 'firebase-admin'

const serviceAccount = require('./firebaseAuth.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

export default admin
