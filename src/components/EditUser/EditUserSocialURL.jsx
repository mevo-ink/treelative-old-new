import EditableIconTrigger from 'components/_input/EditableIconTrigger'

import { useMutation } from 'urql'
import { UPDATE_SOCIAL_LINK_URL } from 'graphql/mutations/socialLinks'

export default function EditUserSocialURL ({ social }) {
  const [editSocialURLResult, editSocialURL] = useMutation(UPDATE_SOCIAL_LINK_URL)

  const handleEditSocialURL = url => {
    // const url = data.filter(url => url.name === social.name)[0].baseURL + username
    const variables = { socialLinkID: social.id, input: { url } }
    return editSocialURL(variables)
  }

  return (
    <EditableIconTrigger
      title={`Edit ${social.name} Username`}
      name={social.name}
      icon={social.icon}
      value={social?.url && social.url.substring(social.url.lastIndexOf('/') + 1)}
      onSubmit={handleEditSocialURL}
      isLoading={editSocialURLResult.fetching}
      error={editSocialURLResult.error}
      url={social.url}
      prefix={social.baseURL}
    />
  )
}
