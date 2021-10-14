import { Flex, Text, Button } from '@chakra-ui/react'

import { parseCookies, destroyCookie } from 'nookies'

import Public from 'components/EditUser/Public'
import ShortName from 'components/EditUser/ShortName'

export default function MoreSettings ({ user }) {
  const { AUTH_SESSION_USER } = parseCookies()

  const logout = () => {
    destroyCookie(null, 'AUTH_SESSION_ID', { path: '/' })
    window.location.href = '/'
  }

  return (
    <Flex
      w='80%'
      h='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      background='hsla(0, 0%, 100%, .2)'
      boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
      borderRadius='20px'
      p='1.5rem 0'
    >
      <Text variant='info-title'> Short Name </Text>
      <ShortName user={user} />
      <Flex alignItems='center' justifyContent='space-between' w='45%' mt='1rem'>
        <Text variant='info-title' fontSize='1.2rem'> Public </Text>
        <Public user={user} />
      </Flex>
      {user.id === AUTH_SESSION_USER && (
        <Button
          w='70%'
          mt='2rem'
          background='hsla(0, 65%, 55%, 1)'
          _active={{ background: 'hsla(0, 65%, 40%, 1)' }}
          _hover={{ background: 'hsla(0, 65%, 40%, 1)' }}
          onClick={logout}
        >
          Logout
        </Button>
      )}
    </Flex>
  )
}
