import { useMutation } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import LocationTrigger from 'components/_trigger/LocationTrigger'

export default function MarriageLocation ({ user }) {
  const { mutateAsync, isLoading, error } = useMutation(updateUserGeneral)

  const handleEditMarriageLocation = marriageLocation => {
    return mutateAsync({ userID: user.id, input: { marriageLocation } })
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
