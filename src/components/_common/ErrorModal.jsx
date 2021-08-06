import {
  Grid,
  Flex,
  Text,
  Modal,
  Image,
  Button,
  ModalBody,
  IconButton,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'
import { FaAtlassian } from 'react-icons/fa'
import { IoLogoJavascript } from 'react-icons/io'

import { useSetRecoilState } from 'recoil'

import { activeNodeIDAtom } from 'utils/atoms.js'

import ErrorPNG from 'images/error.png'

export default function ErrorModal ({ children }) {
  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)
  return (
    <Modal isOpen isCentered closeOnOverlayClick={false} scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent bg='transparent'>
        <ModalBody as={Grid} placeItems='center' p='2em'>
          <Image src={ErrorPNG} alt='Error' w='100px' mb='1rem' />
          <Text
            textAlign='center'
            fontSize='1.3rem'
            fontWeight='600'
            mb='2rem'
            _after={{
              content: "'Something Went Wrong.'",
              display: 'block'
            }}
          >
            Oops!
          </Text>
          <Text
            w='100%'
            py='1em'
            textAlign='center'
            borderRadius='10px'
            bg='hsla(0, 100%, 70%, .3)'
          >
            {children}
          </Text>
          <Button
            w='8em'
            h='2em'
            mt='2rem'
            fontSize='1.3rem'
            color='white'
            border='none'
            borderRadius='0.5em'
            bg='linear-gradient(hsl(337, 100%, 55%), hsl(16, 60%, 65%) 100%)'
            _hover={{
              bg: 'linear-gradient(hsla(337, 100%, 55%, .5), hsla(16, 60%, 65%, .5) 100%)'
            }}
            _active={{
              bg: 'linear-gradient(hsla(337, 100%, 55%, .5), hsla(16, 60%, 65%, .5) 100%)'
            }}
            onClick={() => { window.location.href = '/' }}
          >
            Refresh
          </Button>
          <Text
            textAlign='center'
            fontSize='.8rem'
            my='1.5rem'
          >
            If The Problem Persists, Contact Us:
          </Text>
          <Flex justifyContent='space-between' w='40%'>
            {[
              { id: '6109d9f6b69e44d70c30461c', Avatar: FaAtlassian },
              { id: '6109d9f9b69e44d70c30467a', Avatar: IoLogoJavascript }
            ].map((admin, idx) => (
              <IconButton
                key={idx}
                isRound
                icon={<admin.Avatar />}
                w='2rem'
                onClick={() => setActiveNodeID(admin.id)}
              />
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
