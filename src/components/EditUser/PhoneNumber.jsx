import { string } from 'yup'

import { useMutation, useQueryClient } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import InputWithIconTrigger from 'components/_trigger/InputWithIconTrigger'

export default function PhoneNumber ({ user, icon }) {
  const { mutateAsync, isLoading, error } = useMutation(updateUserGeneral)

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleEditPhoneNumber = phoneNumber => {
    return mutateAsync({ userID: user.id, input: { phoneNumber } }, { onSuccess })
  }

  return (
    <InputWithIconTrigger
      title='Edit Phone Number'
      name='phoneNumber'
      baseURL='https://wa.me/'
      icon={icon}
      value={user?.phoneNumber}
      validation={string().matches(/^\+?\d{10,14}$/, { message: 'Invalid Phone Number', excludeEmptyString: true })}
      onSubmit={handleEditPhoneNumber}
      isLoading={isLoading}
      error={error}
    />
  )
}
