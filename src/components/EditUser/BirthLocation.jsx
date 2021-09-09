import { useMutation } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import LocationTrigger from 'components/_trigger/LocationTrigger'

export default function BirthLocation ({ user }) {
  const { mutateAsync, error, isLoading } = useMutation(updateUserGeneral)

  const handleEditBirthLocation = birthLocation => {
    return mutateAsync({ userID: user.id, input: { birthLocation } })
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
