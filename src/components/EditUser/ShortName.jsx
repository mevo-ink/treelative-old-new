import { string } from 'yup'

import { useMutation, useQueryClient } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import InputTrigger from 'components/_trigger/InputTrigger'

export default function ShortName ({ user }) {
  const { mutateAsync, isLoading, error } = useMutation(updateUserGeneral)

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleEditShortName = shortName => {
    return mutateAsync({ userID: user.id, input: { shortName } }, { onSuccess })
  }

  return (
    <InputTrigger
      title='Edit Short Name'
      name='shortName'
      value={user?.shortName}
      validation={string().required()}
      onSubmit={handleEditShortName}
      isLoading={isLoading}
      error={error}
      notRemovable
    />
  )
}
