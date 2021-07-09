import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyDNoslz_ADYpcRTUd-1jOn-QqRKjb3Ct5g',
  authDomain: 'j2a-org.firebaseapp.com',
  projectId: 'j2a-org',
  messagingSenderId: '873251493439',
  appId: '1:873251493439:web:9af14879c7e433c4db8a8a',
  measurementId: 'G-8XQXPL9XQV'
}

firebase.initializeApp(firebaseConfig)

firebase.analytics()

const database = firebase.database()

const firebaseAuth = firebase.auth()

// setup additional OAuth providers
const facebook = new firebase.auth.FacebookAuthProvider()
facebook.addScope('user_birthday')

const google = new firebase.auth.GoogleAuthProvider()
google.addScope('https://www.googleapis.com/auth/userinfo.email')

const twitter = new firebase.auth.TwitterAuthProvider()

export {
  firebaseAuth,
  facebook,
  google,
  twitter,
  database
}
