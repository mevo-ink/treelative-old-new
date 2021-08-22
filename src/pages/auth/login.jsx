import { withUrqlClient } from 'next-urql'

import LoginServer from 'components/LoginServer'

import client from 'graphql/client'

const Login = () => <LoginServer />

export default withUrqlClient(client)(Login)
