import { useState } from 'react'

import { firebaseAuth } from 'utils/firebase'

import { IconButton } from '@chakra-ui/react'

import ErrorModal from 'components/_common/ErrorModal'

export default function LoginWithProvider ({ label, icon: Icon, provider, onSuccess, setIsLoading }) {
  const [error, setError] = useState()

  const onLogin = () => {
    setIsLoading(true)
    firebaseAuth.signInWithPopup(provider)
      .then(async (result) => {
        const token = await firebaseAuth.currentUser.getIdToken()
        onSuccess(token, result.additionalUserInfo.profile)
      })
      .catch(setError)
  }

  if (error) return <ErrorModal>{error.message}</ErrorModal>

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
