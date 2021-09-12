import { useMutation, useQueryClient } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import LocationTrigger from 'components/_trigger/LocationTrigger'

export default function BirthLocation ({ user }) {
  const { mutateAsync, error, isLoading } = useMutation(updateUserGeneral)

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleEditBirthLocation = birthLocation => {
    return mutateAsync({ userID: user.id, input: { birthLocation } }, { onSuccess })
  }

  return (
    <LocationTrigger
      title='Edit Birth Location'
      value={user?.birthLocation}
      onSubmit={handleEditBirthLocation}
      isLoading={isLoading}
      error={error}
    />
  )
}
