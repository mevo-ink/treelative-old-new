import { useRouter } from 'next/router'
import { setCookie } from 'nookies'

import { useQuery } from 'react-query'
import { whoAmI } from 'graphql/client/queries/auth'

import FindMe from 'components/Menu/UserOptions/FindMe'
import Profile from 'components/Menu/UserOptions/Profile'
import CreateUser from 'components/Menu/UserOptions/CreateUser'

import { Flex, Button } from '@chakra-ui/react'

export default function UserOptions ({ onClose }) {
  const router = useRouter()

  const { data: authUser } = useQuery('whoAmI', whoAmI)

  const onLogin = () => {
    setCookie(null, 'REDIRECT_REFERRER', router.pathname, { path: '/' })
    router.push('?login=auth', '/auth/login', { shallow: true, scroll: false })
  }

  const onCreateUserSuccess = (userID) => {
    if (userID) {
      router.push(`?userID=${userID}`, `/users/${userID}`, { shallow: true, scroll: false })
    }
  }

  if (!authUser) {
    return (
      <Button size='sm' ml='4' onClick={onLogin}>Login</Button>
    )
  }

  return (
    <Flex ml='.5rem' justifyContent='space-between'>
      {authUser?.isAdmin && <CreateUser onClose={onCreateUserSuccess} />}
      <Profile onClose={onClose} authUser={authUser} />
      {authUser && <FindMe onClose={onClose} user={authUser} size='sm' />}
    </Flex>
  )
}
