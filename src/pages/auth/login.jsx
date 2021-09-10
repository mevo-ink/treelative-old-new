import { useRouter } from 'next/router'

import LoginCard from 'components/LoginCard'

import { getSession } from 'utils/auth'

import { parseCookies, destroyCookie } from 'nookies'

export async function getServerSideProps (ctx) {
  const session = await getSession(ctx)
  if (session.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/layouts/graph'
      }
    }
  }

  return {
    props: { }
  }
}

export default function Login () {
  const router = useRouter()

  const onLoginClose = () => {
    router.push('/layouts/graph')
  }

  const onLoginSuccess = () => {
    const { REDIRECT_REFERRER } = parseCookies()
    if (REDIRECT_REFERRER) {
      destroyCookie(null, 'REDIRECT_REFERRER', { path: '/' })
      router.push(REDIRECT_REFERRER)
    } else {
      if (router.query.userID) {
        router.push(`/users/${router.query.userID}`)
      } else {
        router.push('/layouts/graph')
      }
    }
  }

  return (
    <LoginCard onSuccess={onLoginSuccess} onClose={onLoginClose} />
  )
}
