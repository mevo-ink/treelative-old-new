import { useRouter } from 'next/router'
import { parseCookies, destroyCookie } from 'nookies'

import { useQueryClient } from 'react-query'

import useServiceWorker from 'hooks/useServiceWorker'

import Menu from 'components/Menu'
import ProfileCard from 'components/ProfileCard'
import LoginCard from 'components/LoginCard'

export default function Wrapper ({ children }) {
  useServiceWorker()

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
    await queryClient.resetQueries(['getUser', { id: router.query.login }])
    destroyCookie(null, 'REDIRECT_REFERRER', { path: '/' })
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
