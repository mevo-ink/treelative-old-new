import { useMutation } from 'urql'

import { UPDATE_SOCIAL } from 'graphql/client/mutations/social'

import SocialTrigger from 'components/_trigger/SocialTrigger'

export default function Social ({ social, userID }) {
  const [editSocialResult, editSocial] = useMutation(UPDATE_SOCIAL)

  const handleEditSocial = url => {
    const variables = { userID: userID, input: { [social.name.toLowerCase()]: url } }
    return editSocial(variables)
  }

  return (
    <SocialTrigger
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
