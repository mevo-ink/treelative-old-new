import localforage from 'localforage'

import { messaging } from 'utils/firebaseApp'

import { sendFCMToken } from 'graphql/client/mutations/auth'

const tokenInlocalforage = async () => {
  return localforage.getItem('fcmToken')
}

// https://medium.com/@sarafathulla/how-to-add-firebase-push-notifications-in-next-js-react-8eecc56b5cab

export default async function initFCM () {
  const tokenInLocalForage = await tokenInlocalforage()

  // requesting notification permission from browser
  const status = await window.Notification.requestPermission()

  // if FCM token is already there just return the token
  if (tokenInLocalForage !== null) {
    // sending FCM token to the server
    sendFCMTokenToServer(tokenInLocalForage)
    return tokenInLocalForage
  }

  if (status && status === 'granted') {
    // getting token from FCM
    const fcmToken = await messaging.getToken()

    if (fcmToken) {
      // setting FCM token in indexed db using localforage
      localforage.setItem('fcmToken', fcmToken)
      console.log('FCM token is set in indexed db', fcmToken)

      // sending FCM token to the server
      sendFCMTokenToServer(fcmToken)

      // return the FCM token after saving it
      return fcmToken
    }
  }
}

// send FCM token to the server
const sendFCMTokenToServer = async (fcmToken) => {
  try {
    // sending FCM token to server
    const _navigator = {}
    for (const i in navigator) _navigator[i] = navigator[i]
    sendFCMToken({ token: fcmToken, navigator: _navigator })
  } catch (e) {
    console.log(e)
  }
}
