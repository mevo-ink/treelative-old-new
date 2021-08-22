import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'

import Login from 'components/Login'

import client from 'graphql/client'

const LoginServer = () => {
  const router = useRouter()
  return <Login onClose={() => router.push('/')} isServer />
}

export default withUrqlClient(client)(LoginServer)
