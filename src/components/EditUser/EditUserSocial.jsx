import EditableIconTrigger from 'components/_input/EditableIconTrigger'

import { useMutation } from 'urql'
import { UPDATE_SOCIAL_LINK_URL } from 'graphql/mutations/socialLinks'

export default function EditUserSocial ({ social }) {
  const [editSocialResult, editSocial] = useMutation(UPDATE_SOCIAL_LINK_URL)

  const handleEditSocial = url => {
    // const url = data.filter(url => url.name === social.name)[0].baseURL + username
    const variables = { socialLinkID: social.id, input: { url } }
    return editSocial(variables)
  }

  return (
    <EditableIconTrigger
      title={`Edit ${social.name} Username`}
      name={social.name}
      icon={social.icon}
      value={social?.username}
      onSubmit={handleEditSocial}
      isLoading={editSocialResult.fetching}
      error={editSocialResult.error}
      username={social.username}
      prefix={social.baseURL}
    />
  )
}
