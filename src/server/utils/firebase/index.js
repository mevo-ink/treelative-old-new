import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  })
}

export const storage = admin.storage().bucket('gs://treelative-007.appspot.com')

export default admin
