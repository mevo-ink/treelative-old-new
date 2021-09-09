import { string } from 'yup'

import { useMutation } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import InputTrigger from 'components/_trigger/InputTrigger'

export default function FullName ({ user }) {
  const { mutateAsync, isLoading, error } = useMutation(updateUserGeneral)

  const handleEditFullName = fullName => {
    return mutateAsync({ userID: user.id, input: { fullName } })
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
