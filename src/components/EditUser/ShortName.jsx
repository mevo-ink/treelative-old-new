import { string } from 'yup'

import { useMutation } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import InputTrigger from 'components/_trigger/InputTrigger'

export default function ShortName ({ user }) {
  const { mutateAsync, isLoading, error } = useMutation(updateUserGeneral)

  const handleEditShortName = shortName => {
    return mutateAsync({ userID: user.id, input: { shortName } })
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
