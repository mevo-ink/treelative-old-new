import { useEffect } from 'react'

import { messaging } from 'utils/firebaseApp'
import initFirebaseCloudMessaging from 'utils/webPush'

import { useRouter } from 'next/router'
import { parseCookies, destroyCookie } from 'nookies'

import { useQueryClient } from 'react-query'

import useServiceWorker from 'hooks/useServiceWorker'

import Menu from 'components/Menu'
import ProfileCard from 'components/ProfileCard'
import LoginCard from 'components/LoginCard'

import { createStandaloneToast } from '@chakra-ui/react'

const toast = createStandaloneToast()

export default function Wrapper ({ children }) {
  useServiceWorker()

  const setToken = async () => {
    await initFirebaseCloudMessaging()
    // listen to notifications from firebase on topic 'notifications'
    messaging.onMessage((message) => {
      console.log(message)
      const { data } = message
      toast({
        title: data.title,
        description: data.description,
        status: 'warning',
        position: 'top',
        duration: null,
        isClosable: true
      })
    })
  }

  useEffect(() => {
    // init firebase cloud messaging
    setToken()
  }, [])

  const queryClient = useQueryClient()

  const router = useRouter()

  const onProfileClose = () => {
    router.back()
  }

  const onLoginClose = () => {
    const { REDIRECT_REFERRER } = parseCookies()
    if (REDIRECT_REFERRER) {
      destroyCookie(null, 'REDIRECT_REFERRER', { path: '/' })
      router.push(REDIRECT_REFERRER)
    } else {
      router.push('/layouts/graph')
    }
  }

  const onLoginSuccess = async () => {
    if (router.query.login === 'auth') {
      await queryClient.resetQueries('whoAmI')
    } else {
      await queryClient.resetQueries(['getUser', { id: router.query.login }])
      destroyCookie(null, 'REDIRECT_REFERRER', { path: '/' })
    }
    router.back()
  }

  return (
    <>
      {router.query.userID && <ProfileCard userID={router.query.userID} onClose={onProfileClose} />}
      {router.query.login && <LoginCard onClose={onLoginClose} onSuccess={onLoginSuccess} />}
      <Menu />
      {children}
    </>
  )
}
