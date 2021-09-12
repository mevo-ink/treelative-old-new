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

export default function LoginWithEmail ({ setShowLoginWithEmail }) {
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

  return (
    <>
      <Stack
        as='form'
        w='100%'
        spacing='2rem'
        onSubmit={onLoginWithEmail}
      >
        {email && verificationMsg && (
          <Stack>
            <Text
              p='2'
              textAlign='center'
              borderRadius='10px'
              bg='hsla(150, 100%, 70%, .3)'
            >
              We have sent you an email with a link to verify your email address. <br /><br />
              Please check your email and click the link to complete the sign in process.
            </Text>
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
