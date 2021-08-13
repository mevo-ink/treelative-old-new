import { useState } from 'react'

import {
  Box,
  Flex,
  Text,
  Stack,
  Divider
} from '@chakra-ui/react'
import { FiLogIn } from 'react-icons/fi'
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa'

import { useMutation } from 'urql'

import { google, twitter, facebook } from 'utils/firebase'
import { LOGIN_WITH_PROVIDER } from 'graphql/mutations/auth'

import ErrorModal from 'components/_common/ErrorModal'
import LoginButton from 'components/Login/LoginButton'
import LoginWithUsername from 'components/Login/LoginWithUsername'

const loginProviders = [
  { label: 'Login with Facebook', icon: FaFacebook, color: 'linear-gradient(180deg, hsl(222, 47%, 43%), hsl(222, 47%, 33%))', provider: facebook },
  { label: 'Login with Google', icon: FaGoogle, color: 'linear-gradient(180deg, hsl(13, 73%, 49%), hsl(13, 73%, 39%))', provider: google },
  { label: 'Login with Twitter', icon: FaTwitter, color: 'linear-gradient(180deg, hsl(196, 100%, 48%), hsl(196, 100%, 38%))', provider: twitter }
]

export default function Login ({ onSuccess }) {
  const [showLoginWithUsername, setShowLoginWithUsername] = useState(false)

  const [loginWithProviderResult, loginWithProvider] = useMutation(LOGIN_WITH_PROVIDER)

  const [internalError, setInternalError] = useState()

  const onLoginSuccess = (result) => {
    setInternalError({ message: 'OATHA' })
    if (result.data) {
      window.localStorage.setItem('AUTH_SESSION_ID', result.data.login)
      onSuccess()
    }
  }

  const onLoginWithProvider = (token, { email }) => {
    loginWithProvider({ email, token })
      .then(onLoginSuccess)
      .catch(setInternalError)
  }

  if (internalError?.message) {
    return (
      <ErrorModal
        icon
        title='Ops!'
        message={internalError.message}
      />
    )
  }

  return (
    <Box w='100%' p='2rem 2.5rem' color='hsla(261, 64%, 18%, 1)'>
      {loginWithProviderResult.error && <ErrorModal> {loginWithProviderResult.error.message} </ErrorModal>}
      <Text
        mb='1rem'
        fontSize='1.8rem'
        fontWeight='600'
        color='unset'
      >
        Sign In
      </Text>
      {!showLoginWithUsername && (
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
            label='Login with Username'
            icon={FiLogIn}
            color='linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))'
            setShowLoginWithUsername={setShowLoginWithUsername}
          />
        </Stack>
      )}
      {showLoginWithUsername && (
        <LoginWithUsername onLoginSuccess={onLoginSuccess} setInternalError={setInternalError} setShowLoginWithUsername={setShowLoginWithUsername} />
      )}
    </Box>
  )
}
