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

import Search from 'components/Menu/Search'
import Layouts from 'components/Menu/Layouts'
import Insights from 'components/Menu/Insights'

export default function Menu () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Box>
      <IconButton
        ref={btnRef}
        icon={<FaGripLines color='hsla(225, 36%, 4%, 1)' />}
        variant='drawer-btn'
        opacity='.5'
        borderRadius='20px 20px 0px 0px'
        bottom='0'
        top='unset'
        onClick={onOpen}
      />
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
            icon={<FaGripLines color='hsla(225, 36%, 4%, 1)' />}
            variant='drawer-btn'
            borderRadius='20px 20px 0px 0px'
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
                  icon={<IoPersonAddSharp />}
                  size='sm'
                  bg='hsla(220, 98%, 57%, 1)'
                  boxShadow='inset 0 0px 3px #000000'
                />
              </Flex>
              <Layouts />
              <Insights />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
