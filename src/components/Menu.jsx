import { useRef } from 'react'

import { useRecoilState } from 'recoil'
import { isMenuOpenAtom } from 'utils/atoms.js'

import {
  Box,
  Flex,
  Stack,
  Drawer,
  keyframes,
  IconButton,
  DrawerBody,
  DrawerOverlay,
  DrawerContent
} from '@chakra-ui/react'
import { FaGripLines } from 'react-icons/fa'

import Search from 'components/Menu/Search'
import UserOptions from 'components/Menu/UserOptions'
import Layouts from 'components/Menu/Layouts'
import Insights from 'components/Menu/Insights'
import Copyright from 'components/Menu/Copyright'

const wiggle = keyframes`
  80% { transform: scaleY(1); }
  95% { transform: scaleY(1.3); }
  97% { transform: scaleY(1); }
  99% { transform: scaleY(1.2); }
  100% { transform: scaleY(1); }
`

export default function Menu () {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMenuOpenAtom)

  const onOpen = () => setIsMenuOpen(true)

  const onClose = () => setIsMenuOpen(false)

  const btnRef = useRef()

  return (
    <Box>
      {!isMenuOpen && (
        <IconButton
          ref={btnRef}
          icon={<FaGripLines color='white' />}
          aria-label='Menu Button'
          w='100%'
          h='3rem'
          maxW='420px'
          position='absolute'
          right='0'
          bottom='0'
          zIndex='6'
          bg='hsla(0, 0%, 100%, .4)'
          backdropFilter='blur(8px)'
          borderRadius='0'
          borderTopLeftRadius='20px'
          borderTopRightRadius='20px'
          transformOrigin='50% 100%'
          animation={`${wiggle} 3s ease-in`}
          onClick={onOpen}
        />
      )}
      <Drawer
        isOpen={isMenuOpen}
        isCentered
        placement='bottom'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent maxH='26.5rem' left='unset !important'>
          <IconButton
            ref={btnRef}
            icon={<FaGripLines color='white' />}
            aria-label='Menu Button'
            borderRadius='20px 20px 0 0'
            bg='hsla(0, 0%, 100%, .2)'
            onClick={onClose}
          />
          <DrawerBody sx={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
            <Stack p='1.5em .5em' spacing='2rem'>
              <Flex>
                <Search onClose={onClose} />
                <UserOptions onClose={onClose} />
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
