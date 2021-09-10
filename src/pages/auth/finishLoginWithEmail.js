import { useEffect, useState } from 'react'

import { firebaseAuth } from 'utils/firebaseApp'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import { useMutation } from 'react-query'
import { loginWithProvider } from 'graphql/client/mutations/auth'

import {
  Text,
  Input,
  Modal,
  Stack,
  Button,
  FormLabel,
  FormControl,
  ModalFooter,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'

export default function finishLoginWithEmail () {
  const [isLoading, setIsLoading] = useState(true)

  const [isValidUrl, setIsValidUrl] = useState(false)

  const [email, setEmail] = useState('')

  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false)
  const [firebaseLoginError, setFirebaseLoginError] = useState(null)

  const [internalError, setInternalError] = useState()

  const { mutate, error } = useMutation(loginWithProvider)

  const onLoginWithProvider = (token) => {
    mutate({ email, token }, { onSuccess: onLoginSuccess, onError: setInternalError })
  }

  const onLoginSuccess = (result) => {
    // setInternalError({ message: 'OATHA' })
    if (result.data) {
      window.localStorage.setItem('AUTH_SESSION_ID', result.data.login)
      // redirect back to the original page where login was initiated
      const referrer = window.localStorage.getItem('REDIRECT_REFERRER')
      window.localStorage.removeItem('REDIRECT_REFERRER')
      referrer ? window.location.href = referrer : window.location.href = '/'
    }
  }

  useEffect(() => {
    // Confirm the link is a sign-in with email link.
    setIsValidUrl(firebaseAuth.isSignInWithEmailLink(window.location.href))
    setEmail(window.localStorage.getItem('emailForSignIn'))
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isValidUrl && email) {
      setIsVerifyingEmail(true)
      firebaseAuth.signInWithEmailLink(email, window.location.href)
        .then(async () => {
          const token = await firebaseAuth.currentUser.getIdToken()
          onLoginWithProvider(token)
          window.localStorage.removeItem('emailForSignIn')
        })
        .catch(setFirebaseLoginError)
        .finally(() => setIsVerifyingEmail(false))
    }
  }, [isValidUrl, email])

  const confirmEmail = (e) => {
    e.preventDefault()
    setEmail(e.target[0].value)
    setIsVerifyingEmail(true)
  }

  const goBackHome = () => {
    window.location.href = '/'
  }

  const isError = !isValidUrl || internalError || firebaseLoginError || error

  return (
    <Modal isOpen onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent>
        {isLoading && <Loading />}
        {!email && (
          <Stack
            p='8'
            as='form'
            w='100%'
            spacing='2rem'
            onSubmit={confirmEmail}
          >
            <FormControl isRequired>
              <FormLabel>Please provide your email for confirmation</FormLabel>
              <Input type='email' aria-label='Email Input' autoComplete='off' />
            </FormControl>
          </Stack>
        )}
        {isVerifyingEmail && <Text p='8'>Verifying email...</Text>}
        {isError && (
          <ModalFooter>
            <Stack spacing='4'>
              {!isValidUrl && <ErrorAlert>{isValidUrl}</ErrorAlert>}
              {firebaseLoginError && <ErrorAlert>{firebaseLoginError.message}</ErrorAlert>}
              {error && <ErrorAlert> {error.message} </ErrorAlert>}
              {internalError?.error && <ErrorAlert> {internalError.message} </ErrorAlert>}
              <Button onClick={goBackHome}>Go Home Nigga</Button>
            </Stack>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}
