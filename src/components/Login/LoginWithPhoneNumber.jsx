import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { parseCookies, destroyCookie } from 'nookies'

import { useMutation } from 'react-query'
import { loginWithPhoneNumber } from 'graphql/client/mutations/auth'

import {
  Text,
  Stack,
  Button,
  PinInput,
  FormLabel,
  FormControl,
  PinInputField
} from '@chakra-ui/react'

import { IoCaretBack } from 'react-icons/io5'

import { firebaseAuth, firebase } from 'utils/firebaseApp'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'
import ErrorModal from 'components/_common/ErrorModal'
import ConnectUserPhoneNumber from 'components/EditUser/ConnectUserPhoneNumber'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function LoginWithPhoneNumber ({ setShowLoginWithPhoneNumber }) {
  const router = useRouter()

  const [phoneNumber, setPhoneNumber] = useState(null)
  const [firebaseError, setFirebaseError] = useState(null)
  const [verificationMsg, setVerificationMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifyingPhoneNumber, setIsVerifyingPhoneNumber] = useState(false)

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: () => {
        onLoginWithPhoneNumber()
      }
    })
  }, [])

  const onLoginWithPhoneNumber = (e) => {
    e.preventDefault()
    const appVerifier = window.recaptchaVerifier
    setIsLoading(true)
    setFirebaseError(null)
    firebaseAuth.signInWithPhoneNumber('+' + phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.localStorage.setItem('phoneNumberForSignIn', '+' + phoneNumber)
        setVerificationMsg(true)
        setIsLoading(false)
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult
      })
      .catch(err => {
        setFirebaseError(err.message)
        setIsLoading(false)
        // reset the reCAPTCHA
        grecaptcha.reset(window.recaptchaWidgetId) // eslint-disable-line
      })
  }

  const { mutate, error } = useMutation(loginWithPhoneNumber)

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

  const onLoginWithProvider = (token) => {
    mutate({ phoneNumber, token }, { onSuccess: onLoginSuccess })
  }

  const onVerifyCode = (code) => {
    setIsVerifyingPhoneNumber(true)
    window.confirmationResult.confirm(code)
      .then(async () => {
        const token = await firebaseAuth.currentUser.getIdToken()
        onLoginWithProvider(token)
        window.localStorage.removeItem('phoneNumberForSignIn')
      })
      .catch(error => setFirebaseError(error.message))
      .finally(() => setIsVerifyingPhoneNumber(false))
  }

  const onClose = () => {
    setShowLoginWithPhoneNumber(false)
  }

  if (error?.message.includes('associated with the phone number')) {
    return <ConnectUserPhoneNumber phoneNumber={'+' + phoneNumber} message={error.message} onClose={onClose} />
  }

  if (error) return <ErrorModal onClose={onClose}> {error.message} </ErrorModal>

  return (
    <>
      <Stack
        mt='0'
        as='form'
        w='100%'
        spacing='2rem'
        onSubmit={onLoginWithPhoneNumber}
      >
        {isLoading && <Loading />}
        {phoneNumber && verificationMsg && (
          <Stack spacing='4'>
            <Text
              p='2'
              textAlign='center'
              borderRadius='10px'
              bg='hsla(150, 100%, 70%, .3)'
              mb='2'
            >
              We have sent you an SMS with a code to verify your phoneNumber. <br /><br />
              Please check your messages and enter the code below to finish the sign in process.
            </Text>
            <FormControl isRequired mt='2'>
              <FormLabel htmlFor='verificationCode'>Verification Code</FormLabel>
              <PinInput otp autoFocus type='number' size='lg' onComplete={onVerifyCode}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </FormControl>
          </Stack>
        )}
        {!verificationMsg && (
          <FormControl isRequired>
            <FormLabel>PhoneNumber</FormLabel>
            <PhoneInput
              onChange={setPhoneNumber}
              enableSearch
              inputProps={{
                name: 'phone',
                required: true,
                placeholder: 'Phone Number',
                autoComplete: 'off'
              }}
              containerStyle={{
                height: '2.5rem'
              }}
              buttonStyle={{
                background: 'inherit',
                borderColor: 'inherit',
                _focus: {
                  borderColor: 'inherit'
                }
              }}
              dropdownStyle={{
                color: '#000'
              }}
              inputStyle={{
                height: '100%',
                background: 'inherit',
                borderColor: 'inherit',
                fontSize: '1.1rem'
              }}
            />
          </FormControl>
        )}
        {isVerifyingPhoneNumber && <Text p='8'>Verifying code...</Text>}
        {firebaseError && <ErrorAlert>{firebaseError}</ErrorAlert>}
        {!verificationMsg && (
          <Button
            id='sign-in-button'
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
      </Stack>
      <Button
        leftIcon={<IoCaretBack />}
        h='auto'
        p='.5rem'
        ml='-.5rem'
        mt='1rem'
        fontSize='.8rem'
        fontWeight='400'
        bg='transparent'
        onClick={() => verificationMsg ? setVerificationMsg(false) : setShowLoginWithPhoneNumber(false)}
      >
        Back
      </Button>
    </>
  )
}
