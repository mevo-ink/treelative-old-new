import { useEffect, useState } from 'react'

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

import { useMutation } from 'urql'

import { google, facebook } from 'utils/firebase'
import { LOGIN_WITH_PROVIDER } from 'graphql/mutations/auth'

import ErrorModal from 'components/_common/ErrorModal'
import LoginButton from 'components/Login/LoginButton'
import LoginWithEmail from 'components/Login/LoginWithEmail'

const loginProviders = [
  { label: 'Login with Facebook', icon: FaFacebook, color: 'linear-gradient(180deg, hsl(222, 47%, 43%), hsl(222, 47%, 33%))', provider: facebook },
  { label: 'Login with Google', icon: FaGoogle, color: 'linear-gradient(180deg, hsl(13, 73%, 49%), hsl(13, 73%, 39%))', provider: google }
]

export default function Login ({ onClose, isServer }) {
  const [showLoginWithEmail, setShowLoginWithEmail] = useState(false)

  const [loginWithProviderResult, loginWithProvider] = useMutation(LOGIN_WITH_PROVIDER)

  const [internalError, setInternalError] = useState()

  const onLoginSuccess = (result) => {
    // setInternalError({ message: 'OATHA' })
    result.data && window.localStorage.setItem('AUTH_SESSION_ID', result.data.login)
    isServer && onClose()
  }

  const onLoginWithProvider = (token, { email }) => {
    loginWithProvider({ email, token })
      .then(onLoginSuccess)
      .catch(setInternalError)
  }

  if (internalError?.message) return <ErrorModal icon title='Ops!' message={internalError.message} />

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
          {loginWithProviderResult.error && <ErrorModal> {loginWithProviderResult.error.message} </ErrorModal>}
          <Text
            mb='1rem'
            fontSize='1.8rem'
            fontWeight='600'
            color='unset'
          >
            Sign In
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
            <LoginWithEmail onLoginSuccess={onLoginSuccess} setInternalError={setInternalError} setShowLoginWithEmail={setShowLoginWithEmail} />
          )}
        </Box>
      </ModalContent>
    </Modal>
  )
}
