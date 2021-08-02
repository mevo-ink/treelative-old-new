import { useMutation } from 'urql'

import { UPDATE_SOCIAL } from 'graphql/mutations/social'

import EditableIconTrigger from 'components/_input/EditableIconTrigger'

export default function EditUserSocial ({ social, userID }) {
  const [editSocialResult, editSocial] = useMutation(UPDATE_SOCIAL)

  const handleEditSocial = url => {
    const variables = { userID: userID, input: { [social.name.toLowerCase()]: url } }
    return editSocial(variables)
  }

  return (
    <EditableIconTrigger
      title={`Edit ${social.name} Username`}
      name={social.name}
      icon={social.icon}
      value={social?.url && social.url.substring(social.url.lastIndexOf('/') + 1)}
      onSubmit={handleEditSocial}
      isLoading={editSocialResult.fetching}
      error={editSocialResult.error}
      url={social.url}
      prefix={social.baseURL}
    />
  )
}
