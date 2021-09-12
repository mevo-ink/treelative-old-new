import { string } from 'yup'

import { useMutation, useQueryClient } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import InputWithIconTrigger from 'components/_trigger/InputWithIconTrigger'

export default function Email ({ user, icon }) {
  const { mutateAsync, isLoading, error } = useMutation(updateUserGeneral)

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleEditEmail = email => {
    return mutateAsync({ userID: user.id, input: { email } }, { onSuccess })
  }

  return (
    <InputWithIconTrigger
      title='Edit Email'
      name='email'
      baseURL='https://mailto:'
      icon={icon}
      value={user?.email}
      validation={string().email().required()}
      onSubmit={handleEditEmail}
      isLoading={isLoading}
      error={error}
    />
  )
}
