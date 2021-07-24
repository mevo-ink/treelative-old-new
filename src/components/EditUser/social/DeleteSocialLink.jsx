import {
  IconButton,
  createStandaloneToast
} from '@chakra-ui/react'

import { BiTrash } from 'react-icons/bi'

import { useMutation } from 'urql'
import { DELETE_SOCIAL_LINK } from 'graphql/mutations/socialLinks'

const toast = createStandaloneToast()

export default function DeleteSocialLink ({ socialLink }) {
  const [{ fetching }, deleteSocialLink] = useMutation(DELETE_SOCIAL_LINK)

  const handleDelete = url => {
    const variables = { socialLinkID: socialLink.id }
    deleteSocialLink(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully Removed Social',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
        }
        if (result.error) {
          toast({
            title: result.error.message,
            status: 'error',
            position: 'top',
            duration: 6000,
            isClosable: true
          })
        }
      })
      .catch(error => {
        toast({
          title: error.message,
          status: 'error',
          position: 'top',
          duration: 6000,
          isClosable: true
        })
      })
  }

  return (
    <IconButton
      size='sm'
      colorScheme='red'
      variant='outline'
      aria-label='Remove social link'
      fontSize='20px'
      icon={<BiTrash />}
      onClick={handleDelete}
      isLoading={fetching}
    />
  )
}
