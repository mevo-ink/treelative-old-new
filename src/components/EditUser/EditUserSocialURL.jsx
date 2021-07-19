import EditableIconTrigger from 'components/_input/EditableIconTrigger'

import { useMutation } from 'urql'
import { UPDATE_SOCIAL_LINK_URL } from 'graphql/mutations/socialLinks'

export default function EditUserSocialURL ({ social, ...props }) {
  const [{ error, fetching }, updateSocialLinkUrl] = useMutation(UPDATE_SOCIAL_LINK_URL)

  const data = [
    { name: 'Instagram', baseURL: 'https://instagram.com/' },
    { name: 'Facebook', baseURL: 'https://www.facebook.com/' },
    { name: 'LinkedIn', baseURL: 'https://www.linkedin.com/in/' },
    { name: 'Twitter', baseURL: 'https://twitter.com/' }
  ]

  const handleSubmit = username => {
    const url = data.filter(url => url.name === social.name)[0].baseURL + username
    const variables = { socialLinkID: social.id, input: { url } }
    return updateSocialLinkUrl(variables)
  }

  return (
    <EditableIconTrigger
      fontSize='xs'
      title={`Edit ${social.name} Username`}
      name='url'
      value={social.url ? social.url.substring(social.url.lastIndexOf('/') + 1) : ''}
      onSubmit={handleSubmit}
      loading={fetching}
      error={error}
      notification='Successfully updated the url'
      social={social}
      {...props}
    />
  )
}
