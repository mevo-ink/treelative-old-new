import { useRef } from 'react'

import useDevice from 'hooks/useDevice'

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

import Search from 'components/Menu/Search'
import Layouts from 'components/Menu/Layouts'
import Insights from 'components/Menu/Insights'
import Copyright from 'components/Menu/Copyright'
import UserOptions from 'components/Menu/UserOptions'

export default function Menu () {
  const { isDesktop } = useDevice()

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: isDesktop })
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
          right='0%'
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
        <DrawerContent maxH='26.5rem' left='unset !important'>
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
                <UserOptions onClose={onClose} />
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
