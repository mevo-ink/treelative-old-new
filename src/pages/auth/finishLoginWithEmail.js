import { useRouter } from 'next/router'

import { parseCookies, destroyCookie } from 'nookies'

import { useEffect, useState } from 'react'

import { firebaseAuth } from 'utils/firebaseApp'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'
import ErrorModal from 'components/_common/ErrorModal'
import ConnectUserEmail from 'components/EditUser/ConnectUserEmail'

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
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)

  const [isValidUrl, setIsValidUrl] = useState(false)

  const [email, setEmail] = useState('')

  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false)
  const [firebaseLoginError, setFirebaseLoginError] = useState(null)

  const { mutate, error } = useMutation(loginWithProvider)

  const onLoginWithProvider = (token) => {
    mutate({ email, token }, { onSuccess: onLoginSuccess })
  }

  const onLoginSuccess = () => {
    // redirect back to the original page where login was initiated
    const { REDIRECT_REFERRER } = parseCookies()
    if (REDIRECT_REFERRER) {
      destroyCookie(null, 'REDIRECT_REFERRER', { path: '/' })
      router.push(REDIRECT_REFERRER)
    } else {
      if (router.query.userID) {
        router.push(`/users/${router.query.userID}`)
      } else {
        router.push('/layouts/graph')
      }
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
    router.push('/layouts/graph')
  }

  const isError = !isValidUrl || firebaseLoginError || error

  if (error?.message.includes('associated with the email')) {
    return <ConnectUserEmail email={email} message={error.message} onClose={goBackHome} />
  }

  if (error) return <ErrorModal onClose={goBackHome}> {error.message} </ErrorModal>

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
              <Button onClick={goBackHome}>Go Back Home</Button>
            </Stack>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}
