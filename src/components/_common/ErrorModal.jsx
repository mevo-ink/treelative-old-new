import { useRouter } from 'next/router'

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
  ModalFooter,
  ModalOverlay,
  ModalContent,
  useDisclosure
} from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import { useQuery } from 'react-query'
import { getContactUsers } from 'graphql/client/queries/users'

export default function ErrorModal (props) {
  const {
    icon,
    title,
    children,
    btn,
    handleBtnClick
  } = props

  const router = useRouter()

  const { data } = useQuery('getContactUsers', getContactUsers)

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  const handleClose = () => {
    onClose()
    props.onClose && props.onClose()
  }

  const showBody = icon || title || children || btn

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
          onClick={handleClose}
        />
        {showBody && (
          <ModalBody as={Grid} placeItems='center' p='2em' mt='1rem'>
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
            {children && (
              <Text
                w='100%'
                p='1em'
                textAlign='center'
                borderRadius='10px'
                bg='hsla(0, 100%, 70%, .3)'
              >
                {children}
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
          </ModalBody>
        )}
        <ModalFooter d='flex' flexDir='column'>
          <Text textAlign='center' fontSize='.8rem' mb='4'>
            Please contact us for further assistance
          </Text>
          <Flex justifyContent='space-between' w='40%'>
            {data && data.map(user => (
              <Box key={user.id}>
                <Image
                  src={user.avatar}
                  w='3rem'
                  borderRadius='50%'
                  onClick={() => router.push(`?userID=${user.id}`, `/users/${user.id}`, { shallow: true, scroll: false })}
                />
                <Text fontSize='sm' mt='.5rem' textAlign='center'>{user.shortName}</Text>
              </Box>
            ))}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
