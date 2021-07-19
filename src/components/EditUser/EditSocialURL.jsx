import EditableIconTrigger from 'components/_input/EditableIconTrigger'

import { string } from 'yup'

import { useMutation } from 'urql'
import { UPDATE_SOCIAL_LINK_URL } from 'graphql/mutations/socialLinks'

export default function EditSocialLinkUrl ({ social, ...props }) {
  const [{ error, fetching }, updateSocialLinkUrl] = useMutation(UPDATE_SOCIAL_LINK_URL)

  const handleSubmit = url => {
    const variables = { socialLinkID: social.id, input: { url } }
    return updateSocialLinkUrl(variables)
  }

  return (
    <EditableIconTrigger
      fontSize='xs'
      title='Edit Url'
      name='url'
      value={social.url || ''}
      onSubmit={handleSubmit}
      validation={string().url().required()}
      loading={fetching}
      error={error}
      notification='Successfully updated the url'
      social={social}
      {...props}
    />
  )
}
