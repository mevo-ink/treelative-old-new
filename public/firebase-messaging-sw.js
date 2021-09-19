/* eslint-disable */

importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')

importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAYwyuzHLuCtdEWZs-g552auLodHI5g9sA',
    authDomain: 'treelative-007.firebaseapp.com',
    projectId: 'treelative-007',
    storageBucket: 'treelative-007.appspot.com',
    messagingSenderId: '485856278904',
    appId: '1:485856278904:web:b4a378b55fc3ccc1db708d',
    measurementId: 'G-9SNJVQ27BK'
  })

  firebase.messaging()

  // background notifications will be received here
  firebase.messaging().onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload)
    // Customize notification here
    const notificationTitle = payload.data.title
    const notificationOptions = {
      body: payload.data.description,
      icon: '/logo192.png'
    }
    self.registration.showNotification(notificationTitle, notificationOptions)
  })
}
