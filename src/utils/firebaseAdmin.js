import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID
    })
  })
}

const auth = admin.auth

const storage = admin.storage().bucket('gs://treelative-007.appspot.com')

export {
  admin,
  auth,
  storage
}
