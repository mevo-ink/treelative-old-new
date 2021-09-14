import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  })
}

const auth = admin.auth

const storage = admin.storage().bucket('gs://treelative-007.appspot.com')

export {
  admin,
  auth,
  storage
}
