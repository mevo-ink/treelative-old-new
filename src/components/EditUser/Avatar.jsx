import { useState, useEffect } from 'react'

import {
  Box,
  FormLabel,
  keyframes,
  IconButton,
  createStandaloneToast
} from '@chakra-ui/react'
import { HiCamera } from 'react-icons/hi'

import { useMutation } from 'urql'
import { useRecoilValue } from 'recoil'

import { UPDATE_AVATAR } from 'graphql/mutations/users'
import { networkMethodsAtom, isEditModeAtom, layoutAtom } from 'utils/atoms.js'

import Crop from 'components/_common/Crop'

const toast = createStandaloneToast()

export default function Avatar ({ user }) {
  const layout = useRecoilValue(layoutAtom)
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

    if (layout !== 'network') return
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

  const [showCrop, setShowCrop] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const wiggle = keyframes`
    0% { transform: rotate(0deg) }
    50% { transform: rotate(-2deg) }
    100% { transform: rotate(2deg) }
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

  useEffect(() => {
    if (!croppedImage) return
    handleUpload(croppedImage)
  }, [croppedImage])

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0]
    if (!selectedFile) return

    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onload = (e) => {
      setSelectedFile(e.target.result)
      setShowCrop(true)
    }
  }

  return (
    <>
      {(showCrop && selectedFile) && (
        <Crop
          image={selectedFile}
          setCroppedImage={setCroppedImage}
          onClose={() => setShowCrop(false)}
        />
      )}
      <Box
        w='30%'
        h='30%'
        mt='-2.8rem'
        position='relative'
      >
        {isEditMode && (
          <>
            <input
              type='file'
              id='avatar'
              style={{ display: 'none' }}
              onChange={handleFileSelect}
              accept='image/png, image/jpeg, image/jpg'
            />
            <FormLabel htmlFor='avatar'>
              <IconButton
                icon={<HiCamera size='40px' />}
                as='span'
                isLoading={isLoading}
                w='6rem'
                h='6rem'
                mt='4px'
                color='hsla(0, 0%, 100%, 1)'
                position='absolute'
                zIndex='1'
                bg='hsla(0, 0%, 0%, .8)'
                borderRadius='50%'
                boxShadow='0px 3px 5px hsla(0, 0%, 0%, .3)'
                border={user.isAdmin ? '5px solid hsla(54, 100%, 51%, 1)' : '5px solid hsla(0, 0%, 100%, 1)'}
                animation={`${wiggle} infinite .15s linear`}
                accept='image/png, image/jpeg, image/jpg'
              />
            </FormLabel>
          </>
        )}
        <Box
          w='6rem'
          h='6rem'
          border={user.isAdmin ? '5px solid hsla(54, 100%, 51%, 1)' : '5px solid hsla(0, 0%, 100%, 1)'}
          borderRadius='50%'
          boxShadow='0px 6px 8px hsla(0, 0%, 0%, .25)'
          backgroundImage={avatarURL}
          backgroundSize='100% auto'
          backgroundPosition='center'
        />
      </Box>
    </>
  )
}
