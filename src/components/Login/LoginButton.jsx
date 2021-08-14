import { useState } from 'react'

import { firebaseAuth } from 'utils/firebase'

import { Button } from '@chakra-ui/react'

import ErrorModal from 'components/_common/ErrorModal'

export default function LoginButton ({ label, icon: Icon, color, provider, onSuccess, setShowLoginWithUsername }) {
  const [error, setError] = useState()

  const onLogin = () => {
    if (!provider) return setShowLoginWithUsername(true)
    firebaseAuth.signInWithPopup(provider)
      .then(async (result) => {
        const token = await firebaseAuth.currentUser.getIdToken()
        onSuccess(token, result.additionalUserInfo.profile)
      })
      .catch(setError)
  }

  if (error) return <ErrorModal>{error.message}</ErrorModal>

  return (
    <Button
      leftIcon={<Icon />}
      aria-label={label}
      w='100%'
      fontSize='1rem'
      fontWeight='400'
      color='white'
      bg={color}
      _hover={{ bg: color }}
      onClick={onLogin}
    >
      {label}
    </Button>
  )
}
