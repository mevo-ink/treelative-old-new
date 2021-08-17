import { useState } from 'react'

import {
  Input,
  Stack,
  Button,
  FormLabel,
  FormControl
} from '@chakra-ui/react'
import { IoCaretBack } from 'react-icons/io5'

import { firebaseAuth } from 'utils/firebase'

import ErrorAlert from 'components/_common/ErrorAlert'

export default function LoginWithEmail ({ onLoginSuccess, setInternalError, setShowLoginWithEmail }) {
  const [error, setError] = useState(null)
  const actionCodeSettings = {
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  }

  const onLoginWithEmail = (e) => {
    e.preventDefault()
    setError(null)
    firebaseAuth.sendSignInLinkToEmail(e.target[0].value, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', e.target[0].value)
        onLoginSuccess()
      })
      .catch(err => setError(err.message))
  }
  return (
    <>
      <Stack
        as='form'
        w='100%'
        spacing='2rem'
        onSubmit={(e) => onLoginWithEmail(e)}
      >
        <FormControl id='username' isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type='email'
            autoComplete='off'
          />
        </FormControl>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        <Button
          type='submit'
          variant='submit'
          bg='linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))'
          _hover={{ bg: 'linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))' }}
          _active={{ bg: 'linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))' }}
          // isLoading={loginResult.fetching}
        >
          Send Verification
        </Button>
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
        onClick={() => setShowLoginWithEmail(false)}
      >
        Back
      </Button>
    </>
  )
}
