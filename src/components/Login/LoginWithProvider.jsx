import { useState } from 'react'

import { firebaseAuth } from 'utils/firebase'

import { IconButton } from '@chakra-ui/react'

import ErrorDialog from 'components/_common/ErrorDialog'

export default function LoginWithProvider ({ label, icon: Icon, provider, onSuccess }) {
  const [error, setError] = useState()

  const onLogin = () => {
    firebaseAuth.signInWithPopup(provider)
      .then(async (result) => {
        const token = await firebaseAuth.currentUser.getIdToken()
        onSuccess(token, result.additionalUserInfo.profile)
      })
      .catch(setError)
  }

  if (error) return <ErrorDialog>{error.message}</ErrorDialog>

  return (
    <IconButton
      isRound
      aria-label={label}
      fontSize='2rem'
      bg='transparent'
      icon={<Icon />}
      _hover={{ bg: 'transparent' }}
      onClick={onLogin}
    />
  )
}
