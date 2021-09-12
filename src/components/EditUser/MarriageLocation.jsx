import { useMutation, useQueryClient } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import LocationTrigger from 'components/_trigger/LocationTrigger'

export default function MarriageLocation ({ user }) {
  const { mutateAsync, isLoading, error } = useMutation(updateUserGeneral)

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleEditMarriageLocation = marriageLocation => {
    return mutateAsync({ userID: user.id, input: { marriageLocation } }, { onSuccess })
  }

  return (
    <LocationTrigger
      title='Edit Marriage Location'
      value={user?.marriageLocation}
      onSubmit={handleEditMarriageLocation}
      isLoading={isLoading}
      error={error}
    />
  )
}
