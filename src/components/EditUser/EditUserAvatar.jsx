import { useState } from 'react'

import {
  Box,
  Image,
  FormLabel,
  keyframes,
  IconButton,
  createStandaloneToast
} from '@chakra-ui/react'
import { HiCamera } from 'react-icons/hi'

import { useRecoilValue } from 'recoil'
import { networkMethodsAtom, isEditModeAtom } from 'utils/atoms.js'

import { useMutation } from 'urql'
import { UPDATE_AVATAR } from 'graphql/mutations/users'

import crown from 'images/adminCrown.png'

const toast = createStandaloneToast()

export default function EditUserAvatar ({ user }) {
  const networkMethods = useRecoilValue(networkMethodsAtom)

  const invalidateImageCache = (imageURL) => {
    // invalidate cached image from browser
    const headers = new window.Headers()
    headers.append('pragma', 'no-cache')
    headers.append('cache-control', 'no-cache')

    const init = {
      method: 'GET',
      headers: headers,
      mode: 'no-cors',
      cache: 'no-cache'
    }

    window.fetch(new window.Request(user.avatar), init)
      .then(() => {
        // update network node with new image url
        networkMethods.updateNode(user.id, 'image', imageURL)
      })
  }

  const isEditMode = useRecoilValue(isEditModeAtom)

  const [avatarURL, setAvatarURL] = useState(user.avatar)

  const [, updateUserAvatar] = useMutation(UPDATE_AVATAR)

  const [isLoading, setIsLoading] = useState(false)

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-2deg); }
    100% { transform: rotate(2deg); }
  `

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
      title: 'Successfully Avatar Updated',
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
                invalidateImageCache(avatarURL + '?' + new Date().getTime())
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

  return (
    <Box
      w='30%'
      minH='auto'
      mt='-2.8rem'
      position='relative'
    >
      {user.role === 'ADMIN' && (
        <Image
          src={crown}
          alt='crown'
          w='100%'
          objectFit='contain'
          position='absolute'
          top='-2.5rem'
          zIndex='2'
        />
      )}
      {isEditMode && (
        <>
          <input
            type='file'
            id='avatar'
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            accept='image/png, image/jpeg, image/jpg, image/gif'
          />
          <FormLabel htmlFor='avatar'>
            <IconButton
              icon={<HiCamera size='40px' />}
              as='span'
              isLoading={isLoading}
              w='100%'
              h='100%'
              color='hsla(0, 0%, 100%, 1)'
              position='absolute'
              zIndex='1'
              bg='hsla(0, 0%, 0%, .8)'
              borderRadius='50%'
              boxShadow='0px 3px 5px hsla(0, 0%, 0%, .3)'
              border={user.role === 'ADMIN' ? '5px solid hsla(54, 100%, 51%, 1)' : '5px solid hsla(0, 0%, 100%, 1)'}
              animation={`${wiggle} infinite .15s linear`}
              accept='image/png, image/jpeg, image/jpg, image/gif'
            />
          </FormLabel>
        </>
      )}
      <Image
        src={avatarURL}
        fallbackSrc={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
        alt='avatar'
        objectFit='contain'
        w='100%'
        border={user.role === 'ADMIN' ? '5px solid hsla(54, 100%, 51%, 1)' : '5px solid hsla(0, 0%, 100%, 1)'}
        borderRadius='50%'
        boxShadow='0px 6px 8px hsla(0, 0%, 0%, .25)'
      />
    </Box>
  )
}
