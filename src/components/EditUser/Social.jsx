import { useMutation, useQueryClient } from 'react-query'
import { updateUseSocial } from 'graphql/client/mutations/users'

import SocialTrigger from 'components/_trigger/SocialTrigger'

export default function Social ({ social, userID }) {
  const { mutateAsync, isLoading, error } = useMutation(updateUseSocial)

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    const existingData = queryClient.getQueryData(['getUser', { id: userID }]) || {}
    queryClient.setQueryData(['getUser', { id: userID }], { ...existingData, ...updatedData })
  }

  const handleEditSocial = url => {
    return mutateAsync({ userID: userID, input: { [social.name.toLowerCase()]: url } }, { onSuccess })
  }

  return (
    <SocialTrigger
      title={`Edit ${social.name} Username`}
      name={social.name}
      icon={social.icon}
      value={social?.url && social.url.substring(social.url.lastIndexOf('/') + 1)}
      onSubmit={handleEditSocial}
      isLoading={isLoading}
      error={error}
      url={social.url}
      prefix={social.baseURL}
    />
  )
}
