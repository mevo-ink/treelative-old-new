import { useRouter } from 'next/router'

import LoginCard from 'components/Login'

import { getSession } from 'utils/auth'

export async function getServerSideProps (ctx) {
  const session = await getSession(ctx)
  if (session.user) {
    return {
      redirect: {
        permanent: false,
        destination: 'layouts/graph'
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
    router.push('/')
  }

  return (
    <LoginCard onClose={onLoginClose} />
  )
}
