import { useRef } from 'react'

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
import { IoPersonAddSharp } from 'react-icons/io5'
import { BiCurrentLocation } from 'react-icons/bi'

import Search from 'components/Menu/Search'
import Layouts from 'components/Menu/Layouts'
import Insights from 'components/Menu/Insights'
import Copyright from 'components/Menu/Copyright'

export default function Menu () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Box>
      {!isOpen && (
        <IconButton
          ref={btnRef}
          icon={<FaGripLines color='hsla(0, 0%, 100%, 1)' />}
          variant='drawer-btn'
          bottom='0'
          top='unset'
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
            onClick={onClose}
            icon={<FaGripLines color='hsla(0, 0%, 100%, 1)' />}
            variant='drawer-btn'
          />
          <DrawerBody>
            <Stack
              p='1.5em .5em'
              spacing='2rem'
            >
              <Flex justifyContent='space-between'>
                <Search />
                <IconButton
                  isRound
                  icon={<IoPersonAddSharp color='hsla(0, 0%, 100%, 1)' />}
                  size='sm'
                  bg='hsla(220, 98%, 57%, .8)'
                />
                <IconButton
                  isRound
                  icon={<BiCurrentLocation color='hsla(0, 0%, 100%, 1)' />}
                  size='sm'
                  bg='hsla(220, 98%, 57%, .8)'
                />
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
