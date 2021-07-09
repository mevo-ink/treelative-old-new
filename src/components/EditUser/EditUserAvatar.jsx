import { useState } from 'react'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import { useMutation } from 'urql'
import { UPDATE_USER_AVATAR } from 'graphql/mutations/users'

import {
  Box,
  Image,
  Stack,
  Button,
  FormLabel,
  FormControl,
  createStandaloneToast
} from '@chakra-ui/react'

const toast = createStandaloneToast()

export default function EditUserAvatar ({ user }) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const [avatarURL, setAvatarURL] = useState(user.avatar)

  const [, updateUserAvatar] = useMutation(UPDATE_USER_AVATAR)

  const [isLoading, setIsLoading] = useState(false)

  const handleError = (error) => {
    toast({
      title: 'Error',
      description: error.message,
      status: 'error',
      position: 'top',
      duration: 10000,
      isClosable: true
    })
  }

  const handleSuccess = () => {
    toast({
      title: 'Successfully updated the avatar',
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true
    })
  }

  const handleUpload = selectedFile => {
    setIsLoading(true)
    const variables = { userID: user.id }
    updateUserAvatar(variables)
      .then(result => {
        if (result.data) {
          const url = result.data.updateUserAvatar
          window.fetch(url, { method: 'PUT', body: selectedFile })
            .then((response) => {
              if (response.status === 200) {
                handleSuccess()
                setAvatarURL(avatarURL + '?' + new Date().getTime())
              } else {
                response.json()
                  .then(error => {
                    console.log({ message: error })
                  })
              }
            })
            .catch(handleError)
            .finally(() => setIsLoading(false))
        }
        if (result.error) {
          handleError(result.error)
        }
      })
      .catch(error => {
        setIsLoading(false)
        handleError(error)
      })
  }

  const handleFileSelect = (event) => {
    event.preventDefault()
    const selectedFile = event.target.files[0]
    if (!selectedFile) return
    if ((selectedFile.size / 1024 / 1024) > 10) {
      handleError({ message: 'File size exceeds 10 MB' })
    } else {
      handleUpload(selectedFile)
    }
  }

  const AvatarImage = (
    <Image
      src={avatarURL}
      fallbackSrc={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
      boxSize='150px'
      borderRadius='full'
      alt={user.fullName}
    />
  )

  if (!isEditMode) {
    return AvatarImage
  }

  return (
    <Stack spacing='2' as={FormControl} alignItems='center'>
      <input
        type='file'
        id='avatar'
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept='image/png, image/jpeg, image/jpg, image/gif'
      />
      <Box position='relative'>
        {AvatarImage}
        <FormLabel htmlFor='avatar' position='absolute' top='95px' left='25px'>
          <Button
            as='span'
            size='sm'
            cursor='pointer'
            isLoading={isLoading}
            minW='100px'
            bg='#00000045'
            _hover={{
              bg: '#00000085'
            }}
          >
            Replace
          </Button>
        </FormLabel>
      </Box>
    </Stack>
  )
}
