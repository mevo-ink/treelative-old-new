import localforage from 'localforage'

import { messaging } from 'utils/firebaseApp'

const tokenInlocalforage = async () => {
  return localforage.getItem('fcmToken')
}

// https://medium.com/@sarafathulla/how-to-add-firebase-push-notifications-in-next-js-react-8eecc56b5cab

export default async function initFCM () {
  const tokenInLocalForage = await tokenInlocalforage()

  // if FCM token is already there just return the token
  if (tokenInLocalForage !== null) {
    return tokenInLocalForage
  }

  // requesting notification permission from browser
  const status = await window.Notification.requestPermission()

  if (status && status === 'granted') {
    // getting token from FCM
    const fcmToken = await messaging.getToken()

    if (fcmToken) {
      // setting FCM token in indexed db using localforage
      localforage.setItem('fcmToken', fcmToken)
      console.log('FCM token is set in indexed db', fcmToken)

      // return the FCM token after saving it
      return fcmToken
    }
  }
}
