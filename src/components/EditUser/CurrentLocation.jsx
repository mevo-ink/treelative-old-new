import { useMutation } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import LocationTrigger from 'components/_trigger/LocationTrigger'

export default function CurrentLocation ({ user, ...props }) {
  const { mutateAsync, error, isLoading } = useMutation(updateUserGeneral)

  const handleEditCurrentLocation = currentLocation => {
    return mutateAsync({ userID: user.id, input: { currentLocation } })
  }

  return (
    <LocationTrigger
      title='Edit Current Location'
      value={user?.currentLocation}
      onSubmit={handleEditCurrentLocation}
      isLoading={isLoading}
      error={error}
      {...props}
    />
  )
}
