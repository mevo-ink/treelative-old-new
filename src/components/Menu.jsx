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
import { motion } from 'framer-motion'

import Search from 'components/Menu/Search'
import Layouts from 'components/Menu/Layouts'
import Insights from 'components/Menu/Insights'
import Copyright from 'components/Menu/Copyright'
import UserOptions from 'components/Menu/UserOptions'

const MotionBox = motion(Box)

export default function Menu () {
  const { isDesktop } = useDevice()

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: isDesktop })
  const btnRef = useRef()

  return (
    <Box>
      <MotionBox
        w='100%'
        maxW='375px'
        position='absolute'
        right='0%'
        zIndex='2'
        bottom='-2rem'
        animate={{ y: [0, -20, 0, -15, 0, -5, 0], transition: { delay: 10, duration: 0.8 } }}
      >
        {!isOpen && (
          <IconButton
            ref={btnRef}
            icon={<FaGripLines color='white' />}
            w='100%'
            pt='1rem'
            pb='3rem'
            bg='hsla(0, 0%, 100%, .2)'
            backdropFilter='blur(5px)'
            borderRadius='0'
            borderTopLeftRadius='20px'
            borderTopRightRadius='20px'
            onClick={onOpen}
          />
        )}
      </MotionBox>
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
