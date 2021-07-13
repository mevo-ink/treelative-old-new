import { useState, useEffect } from 'react'

import {
  Flex,
  Input,
  Stack,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa'

import { useForm } from 'react-hook-form'

import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { google, twitter, facebook } from 'utils/firebase'

import { useMutation } from 'urql'

import { LOGIN, LOGIN_WITH_PROVIDER } from 'graphql/mutations/auth'

import ErrorAlert from 'components/_common/ErrorAlert'
import ErrorDialog from 'components/_common/ErrorDialog'
import PasswordInput from 'components/_input/PasswordInput'
import ForgotPassword from 'components/Login/ForgotPassword'
import LoginWithProvider from 'components/Login/LoginWithProvider'
import UnregisteredDialog from 'components/Login/UnregisteredDialog'

import useDevice from 'hooks/useDevice'

const loginProviders = [
  { label: 'Login with Google', icon: FaGoogle, provider: google },
  { label: 'Login with Facebook', icon: FaFacebook, provider: facebook },
  { label: 'Login with Twitter', icon: FaTwitter, provider: twitter }
]

const schemaValidation = object().shape({
  username: string().required(),
  password: string().required().min(3)
})

export default function Login ({ onSuccess }) {
  const { isDesktop } = useDevice()

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)

  const [loginResult, login] = useMutation(LOGIN)
  const [loginWithProviderResult, loginWithProvider] = useMutation(LOGIN_WITH_PROVIDER)

  const [internalError, setInternalError] = useState()

  const { register, handleSubmit, formState: { errors }, setFocus } = useForm({
    resolver: yupResolver(schemaValidation)
  })

  // eslint-disable-next-line
  useEffect(() => { isDesktop && setTimeout(() => setFocus('username')) }, [])

  const onLoginSuccess = (result) => {
    if (result.data) {
      window.localStorage.setItem('AUTH_SESSION_ID', result.data.login)
      onSuccess()
    }
  }

  const onLoginWithPassword = (input) => {
    login({ input })
      .then(onLoginSuccess)
      .catch(setInternalError)
  }

  const onLoginWithProvider = (token, { email }) => {
    loginWithProvider({ email, token })
      .then(onLoginSuccess)
      .catch(setInternalError)
  }

  if (internalError) return <ErrorDialog>{internalError.message}</ErrorDialog>

  if (loginWithProviderResult?.error?.graphQLErrors[0]?.extensions.code === 'UNREGISTERED') {
    // show unregistered user dialog
    return <UnregisteredDialog error={loginWithProviderResult?.error} />
  }

  return (
    <>
      {isForgotPasswordOpen && <ForgotPassword onClose={() => setIsForgotPasswordOpen(false)} />}
      <Stack
        as='form'
        w='100%'
        p='3em 2em'
        spacing='2rem'
        color='hsla(261, 64%, 18%, 1)'
        onSubmit={handleSubmit(onLoginWithPassword)}
      >
        <FormControl id='username' isRequired isInvalid={errors?.username}>
          <FormLabel>Username</FormLabel>
          <Input
            {...register('username')}
            type='username'
            autoComplete='username'
          />
          <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='password' isRequired isInvalid={errors?.password}>
          <Flex justify='space-between'>
            <FormLabel>Password</FormLabel>
            <Button
              variant='link'
              color='hsla(359, 88%, 55%, 1)'
              fontSize='.8rem'
              onClick={() => setIsForgotPasswordOpen(true)}
              tabIndex='-1'
            >
              Forgot Password?
            </Button>
          </Flex>
          <PasswordInput {...register('password')} />
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
        {loginResult.error && <ErrorAlert>{loginResult.error.message}</ErrorAlert>}
        <Button type='submit' variant='submit' isLoading={loginResult.fetching}>
          Sign in
        </Button>
        <Stack direction='row' width='100%' justifyContent='space-evenly'>
          {loginProviders.map(loginProvider => (
            <LoginWithProvider
              {...loginProvider}
              key={loginProvider.label}
              onSuccess={onLoginWithProvider}
            />
          ))}
        </Stack>
      </Stack>
    </>
  )
}
