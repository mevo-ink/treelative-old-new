import {
  Select,
  createStandaloneToast
} from '@chakra-ui/react'

import { useMutation } from 'urql'
import { UPDATE_SOCIAL_LINK_TYPE } from 'graphql/mutations/socialLinks'

const toast = createStandaloneToast()

export default function EditSocialLinkType ({ socialLink, ...props }) {
  const [, updateSocialLinkType] = useMutation(UPDATE_SOCIAL_LINK_TYPE)

  const handleSubmit = e => {
    const variables = { socialLinkID: socialLink.id, input: { type: e.target.value } }
    updateSocialLinkType(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully updated the type',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
        }
      })
      .catch(error => {
        toast({
          title: error.message,
          status: 'error',
          position: 'top',
          duration: 8000,
          isClosable: true
        })
      })
  }

  return (
    <Select value={socialLink.type} onChange={handleSubmit} maxW='130px' size='sm' {...props}>
      {['FACEBOOK', 'INSTAGRAM', 'TWITTER', 'LINKEDIN', 'WEBSITE'].map(type => (
        <option key={type} value={type}>{type}</option>
      ))}
    </Select>
  )
}
