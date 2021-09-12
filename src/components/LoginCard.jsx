import { useState } from 'react'

import {
  Box,
  Flex,
  Text,
  Modal,
  Stack,
  Divider,
  IconButton,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'
import { FiLogIn } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { FaGoogle, FaFacebook } from 'react-icons/fa'

import { useMutation } from 'react-query'
import { loginWithProvider } from 'graphql/client/mutations/auth'
import { google, facebook } from 'utils/firebaseApp'

import ErrorModal from 'components/_common/ErrorModal'
import LoginButton from 'components/Login/LoginButton'
import LoginWithEmail from 'components/Login/LoginWithEmail'
import ConnectUserEmail from 'components/EditUser/ConnectUserEmail'

const loginProviders = [
  { label: 'Login with Facebook', icon: FaFacebook, color: 'linear-gradient(180deg, hsl(222, 47%, 43%), hsl(222, 47%, 33%))', provider: facebook },
  { label: 'Login with Google', icon: FaGoogle, color: 'linear-gradient(180deg, hsl(13, 73%, 49%), hsl(13, 73%, 39%))', provider: google }
]

export default function Login ({ onSuccess, onClose }) {
  const [showLoginWithEmail, setShowLoginWithEmail] = useState(false)

  const { mutate, error } = useMutation(loginWithProvider)

  const [email, setEmail] = useState('')

  const onLoginWithProvider = (token, { email }) => {
    setEmail(email)
    mutate({ email, token }, { onSuccess })
  }

  if (error?.message.includes('associated with the email')) {
    return <ConnectUserEmail email={email} message={error.message} onClose={onClose} />
  }

  return (
    <Modal isOpen onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
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
        <Box w='100%' p='2rem 2.5rem'>
          {error && <ErrorModal> {error.message} </ErrorModal>}
          <Text
            fontSize='1.8rem'
            fontWeight='600'
            color='unset'
          >
            Sign In
          </Text>
          <Text
            mb='1rem'
            fontSize='xs'
            color='unset'
          >
            You need to be signed in to view this user profile
          </Text>
          {!showLoginWithEmail && (
            <Stack
              width='100%'
              spacing='1rem'
              justifyContent='space-evenly'
            >
              {loginProviders.map(loginProvider => (
                <LoginButton
                  {...loginProvider}
                  key={loginProvider.label}
                  onSuccess={onLoginWithProvider}
                />
              ))}
              <Flex alignItems='center' borderColor='hsla(261, 64%, 18%, .5)'>
                <Divider borderColor='unset' />
                <Text mx='.8rem' fontSize='.8rem' color='unset'>OR</Text>
                <Divider borderColor='unset' />
              </Flex>
              <LoginButton
                label='Login with Email'
                icon={FiLogIn}
                color='linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))'
                setShowLoginWithEmail={setShowLoginWithEmail}
              />
            </Stack>
          )}
          {showLoginWithEmail && (
            <LoginWithEmail setShowLoginWithEmail={setShowLoginWithEmail} />
          )}
        </Box>
      </ModalContent>
    </Modal>
  )
}
