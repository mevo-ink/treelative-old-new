import { string } from 'yup'

import { useMutation, useQueryClient } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import InputTrigger from 'components/_trigger/InputTrigger'

export default function FullName ({ user }) {
  const { mutateAsync, isLoading, error } = useMutation(updateUserGeneral)

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleEditFullName = fullName => {
    return mutateAsync({ userID: user.id, input: { fullName } }, { onSuccess })
  }

  return (
    <InputTrigger
      title='Edit Full Name'
      name='fullName'
      value={user?.fullName}
      validation={string().required()}
      onSubmit={handleEditFullName}
      isLoading={isLoading}
      error={error}
      notRemovable
    />
  )
}
