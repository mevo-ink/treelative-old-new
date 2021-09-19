import { messaging } from 'utils/firebaseApp'

import { sendFCMToken } from 'graphql/client/mutations/auth'

import { parseCookies, setCookie } from 'nookies'

import FingerprintJS from '@fingerprintjs/fingerprintjs'

// https://medium.com/@sarafathulla/how-to-add-firebase-push-notifications-in-next-js-react-8eecc56b5cab

export default async function initFCM () {
  const { fcmToken } = parseCookies()

  // requesting notification permission from browser
  const status = await window.Notification.requestPermission()

  // if FCM token is already there just return the token
  if (fcmToken) {
    // sending FCM token to the server
    sendFCMTokenToServer(fcmToken)
    return fcmToken
  }

  if (status && status === 'granted') {
    // getting token from FCM
    const fcmToken = await messaging.getToken()

    if (fcmToken) {
      setCookie(null, 'fcmToken', fcmToken, { path: '/' })
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
    // Get the visitor identifier
    const fpPromise = FingerprintJS.load()
    const fp = await fpPromise
    const result = await fp.get()
    const fingerprint = result.visitorId
    // sending FCM token to server
    sendFCMToken({ token: fcmToken, fingerprint, browser: navigator.userAgent })
  } catch (e) {
    console.log(e)
  }
}
