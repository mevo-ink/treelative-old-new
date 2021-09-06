import firebase from 'firebase/app'

import admin from 'firebase-admin'

import 'firebase/auth'
import 'firebase/database'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAYwyuzHLuCtdEWZs-g552auLodHI5g9sA',
  authDomain: 'treelative-007.firebaseapp.com',
  projectId: 'treelative-007',
  storageBucket: 'treelative-007.appspot.com',
  messagingSenderId: '485856278904',
  appId: '1:485856278904:web:b4a378b55fc3ccc1db708d',
  measurementId: 'G-9SNJVQ27BK'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  // Check that `window` is in scope for the analytics module!
  if (typeof window !== 'undefined') {
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    firebase.analytics()
  }
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  })
}

const firebaseAuth = firebase.auth()

// setup additional OAuth providers
const facebook = new firebase.auth.FacebookAuthProvider()
facebook.addScope('user_birthday')

const google = new firebase.auth.GoogleAuthProvider()
google.addScope('https://www.googleapis.com/auth/userinfo.email')

const storage = admin.storage().bucket('gs://treelative-007.appspot.com')

export {
  firebaseAuth,
  facebook,
  google,
  storage
}
