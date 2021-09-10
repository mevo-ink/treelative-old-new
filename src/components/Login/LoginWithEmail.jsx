import { useState } from 'react'

import {
  Text,
  Input,
  Stack,
  Button,
  FormLabel,
  FormControl
} from '@chakra-ui/react'
import { IoCaretBack } from 'react-icons/io5'

import { firebaseAuth } from 'utils/firebaseApp'

import ErrorAlert from 'components/_common/ErrorAlert'

export default function LoginWithEmail ({ onLoginSuccess, setInternalError, setShowLoginWithEmail }) {
  const [email, setEmail] = useState(null)
  const [error, setError] = useState(null)
  const [verificationMsg, setVerificationMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const actionCodeSettings = {
    url: `${window.location.origin}/auth/finishLoginWithEmail`,
    handleCodeInApp: true
  }

  const onLoginWithEmail = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setEmail(e.target[0].value)
    setError(null)
    firebaseAuth.sendSignInLinkToEmail(e.target[0].value, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', e.target[0].value)
        setVerificationMsg(true)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setIsLoading(false)
      })
  }

  // try {
  //   if (firebaseAuth.isSignInWithEmailLink(window.location.href)) {
  //     let email = window.localStorage.getItem('emailForSignIn')
  //     if (!email) {
  //       email = window.prompt('Please provide your email for confirmation')
  //     }
  //     firebaseAuth.signInWithEmailLink(email, window.location.href)
  //     window.localStorage.removeItem('emailForSignIn')
  //   }
  // } catch (err) { console.log(err) }

  return (
    <>
      <Stack
        as='form'
        w='100%'
        spacing='2rem'
        onSubmit={onLoginWithEmail}
      >
        {email && verificationMsg && (
          <Stack spacing='unset'>
            <Text
              _before={{
                content: '"Check Your Email"',
                display: 'block',
                marginBottom: '.5rem',
                textAlign: 'center',
                fontWeight: '600'
              }}
              textAlign='center'
            >
              We sent an email to you at {email}.
            </Text>
            <Text textAlign='center'>It has a magic link that'll sign you in.</Text>
          </Stack>
        )}
        {!verificationMsg && (
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type='email' aria-label='Email Input' autoComplete='off' defaultValue={email} />
          </FormControl>
        )}
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {!verificationMsg && (
          <Button
            type='submit'
            variant='submit'
            bg='linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))'
            _hover={{ bg: 'linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))' }}
            _active={{ bg: 'linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))' }}
            isLoading={isLoading}
          >
            Send Verification
          </Button>
        )}
        {/* {verificationMsg && (
          <Button
            variant='submit'
            bg='linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))'
            _hover={{ bg: 'linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))' }}
            _active={{ bg: 'linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))' }}
            onClick={() => (window.location.href = 'mailto:' + email)}
          >
            Open Mail App
          </Button>
        )} */}
      </Stack>
      <Button
        leftIcon={<IoCaretBack />}
        h='auto'
        p='.5rem'
        ml='-.5rem'
        mt='.5rem'
        fontSize='.8rem'
        fontWeight='400'
        bg='transparent'
        onClick={() => verificationMsg ? setVerificationMsg(false) : setShowLoginWithEmail(false)}
      >
        Back
      </Button>
    </>
  )
}
