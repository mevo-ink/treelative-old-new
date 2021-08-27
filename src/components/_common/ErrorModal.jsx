import {
  Box,
  Grid,
  Flex,
  Text,
  Modal,
  Image,
  Button,
  ModalBody,
  IconButton,
  ModalOverlay,
  ModalContent,
  useDisclosure
} from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import { useQuery } from 'urql'
import { useSetRecoilState } from 'recoil'

import { activeNodeIDAtom } from 'utils/atoms.js'
import { GET_CONTACT_USERS } from 'graphql/queries/users'

export default function ErrorModal (props) {
  const {
    icon,
    title,
    message,
    btn,
    handleBtnClick
  } = props

  const [result] = useQuery({ query: GET_CONTACT_USERS })

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  return (
    <Modal isOpen={isOpen} isCentered scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent bg='transparent'>
        <IconButton
          size='2rem'
          icon={<MdClose size='1.5rem' />}
          position='absolute'
          zIndex='1'
          right='1rem'
          top='1rem'
          borderRadius='5px'
          bg='transparent'
          onClick={onClose}
        />
        <ModalBody as={Grid} placeItems='center' p='2em'>
          {icon && <Image src='/images/error.png' alt='Error' w='100px' mb='1rem' />}
          {title && (
            <Text
              textAlign='center'
              fontSize='1.3rem'
              fontWeight='600'
              mb='2rem'
            >
              {title}
            </Text>
          )}
          {message && (
            <Text
              w='100%'
              py='1em'
              textAlign='center'
              borderRadius='10px'
              bg='hsla(0, 100%, 70%, .3)'
            >
              {message}
            </Text>
          )}
          {btn && (
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
              onClick={handleBtnClick}
            >
              Refresh
            </Button>
          )}
          <Text
            textAlign='center'
            fontSize='.8rem'
            my='1.5rem'
          >
            Please, Contact Us:
          </Text>
          <Flex justifyContent='space-between' w='40%'>
            {result.data.getContactUsers.map(user => (
              <Box key={user.id}>
                <Image
                  src={user.avatar}
                  w='3rem'
                  borderRadius='50%'
                  onClick={() => setActiveNodeID(user.id)}
                />
                <Text fontSize='.5rem' mt='.5rem' textAlign='center'>{user.shortName}</Text>
              </Box>
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
