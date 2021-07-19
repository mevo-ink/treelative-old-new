import { useRef } from 'react'

import parseJwt from 'utils/parseJWT'

import {
  Box,
  Flex,
  Stack,
  Drawer,
  IconButton,
  DrawerBody,
  useDisclosure,
  DrawerOverlay,
  DrawerContent
} from '@chakra-ui/react'
import { FaGripLines } from 'react-icons/fa'

import { useQuery } from 'urql'

import { GET_AUTH_USER } from 'graphql/queries/users'

import Search from 'components/Menu/Search'
import FindMe from 'components/Menu/FindMe'
import Profile from 'components/Menu/Profile'
import Layouts from 'components/Menu/Layouts'
import Insights from 'components/Menu/Insights'
import Copyright from 'components/Menu/Copyright'
import CreateUser from 'components/Menu/CreateUser'

export default function Menu () {
  const { id, role } = parseJwt(window.localStorage.getItem('AUTH_SESSION_ID'))

  const [result] = useQuery({ query: GET_AUTH_USER, variables: { filter: { id: id } } })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Box>
      {!isOpen && (
        <IconButton
          ref={btnRef}
          icon={<FaGripLines color='white' />}
          w='100%'
          h='30px'
          position='absolute'
          zIndex='1'
          bottom='0'
          bg='hsla(0, 0%, 100%, .2)'
          backdropFilter='blur(5px)'
          borderTopLeftRadius='20px'
          borderTopRightRadius='20px'
          onClick={onOpen}
        />
      )}
      <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay zIndex='0' />
        <DrawerContent>
          <IconButton
            ref={btnRef}
            icon={<FaGripLines color='white' />}
            borderRadius='20px 20px 0 0'
            bg='hsla(0, 0%, 100%, .2)'
            onClick={onClose}
          />
          <DrawerBody>
            <Stack
              p='1.5em .5em'
              spacing='2rem'
            >
              <Flex justifyContent='space-between'>
                <Search admin={role} />
                {role === 'ADMIN' && <CreateUser />}
                {role && <Profile onClose={onClose} authUser={result.data?.getUser} />}
                <FindMe onClose={onClose} authUser={result.data?.getUser} />
              </Flex>
              <Layouts onClose={onClose} />
              <Insights />
            </Stack>
            <Copyright />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
