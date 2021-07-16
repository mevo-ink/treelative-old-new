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
import Search from 'components/Menu/Search'
import CreateUser from 'components/Menu/CreateUser'
import FindMe from 'components/Menu/FindMe'
import Layouts from 'components/Menu/Layouts'
import Insights from 'components/Menu/Insights'
import Copyright from 'components/Menu/Copyright'

export default function Menu () {
  const { role } = parseJwt(window.localStorage.getItem('AUTH_SESSION_ID'))

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
                <FindMe onClose={onClose} />
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
