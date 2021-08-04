import { useRef } from 'react'

import {
  Box,
  Stack,
  HStack,
  Drawer,
  IconButton,
  DrawerBody,
  useDisclosure,
  DrawerOverlay,
  DrawerContent
} from '@chakra-ui/react'
import { FaGripLines } from 'react-icons/fa'

import { useQuery } from 'urql'

import { WHO_AM_I } from 'graphql/queries/auth'

import Search from 'components/Menu/Search'
import FindMe from 'components/Menu/FindMe'
import Profile from 'components/Menu/Profile'
import Layouts from 'components/Menu/Layouts'
import Insights from 'components/Menu/Insights'
import Copyright from 'components/Menu/Copyright'
import CreateUser from 'components/Menu/CreateUser'

export default function Menu () {
  const [result] = useQuery({ query: WHO_AM_I })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Box>
      {!isOpen && (
        <IconButton
          ref={btnRef}
          icon={<FaGripLines color='white' />}
          w='100%'
          maxW='375px'
          position='absolute'
          left='50%'
          transform='translateX(-50%)'
          zIndex='2'
          bottom='0'
          bg='hsla(0, 0%, 100%, .2)'
          backdropFilter='blur(5px)'
          borderRadius='0'
          borderTopLeftRadius='20px'
          borderTopRightRadius='20px'
          onClick={onOpen}
        />
      )}
      <Drawer
        isOpen={isOpen}
        isCentered
        placement='bottom'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay zIndex='0' />
        <DrawerContent mx='auto' maxH='25.5rem'>
          <IconButton
            ref={btnRef}
            icon={<FaGripLines color='white' />}
            borderRadius='20px 20px 0 0'
            bg='hsla(0, 0%, 100%, .2)'
            onClick={onClose}
          />
          <DrawerBody sx={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
            <Stack p='1.5em .5em' spacing='2rem'>
              <HStack justifyContent='space-between' alignItems='end'>
                <Search onClose={onClose} />
                {result.data?.whoAmI.isAdmin && <CreateUser />}
                {result.data?.whoAmI && <Profile onClose={onClose} authUser={result.data?.whoAmI} />}
                {result.data?.whoAmI && <FindMe onClose={onClose} user={result.data?.whoAmI} size='sm' />}
              </HStack>
              <Layouts />
              <Insights />
            </Stack>
            <Copyright />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
