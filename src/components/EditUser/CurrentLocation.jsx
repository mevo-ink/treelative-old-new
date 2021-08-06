import { useMutation } from 'urql'

import { UPDATE_CURRENT_LOCATION } from 'graphql/mutations/users'

import LocationTrigger from 'components/_trigger/LocationTrigger'

export default function CurrentLocation ({ user, ...props }) {
  const [editCurrentLocationResult, updateUserCurrentLocation] = useMutation(UPDATE_CURRENT_LOCATION)

  const handleEditCurrentLocation = currentLocation => {
    const variables = { userID: user.id, input: { currentLocation } }
    return updateUserCurrentLocation(variables)
  }

  return (
    <LocationTrigger
      title='Edit Current Location'
      value={user?.currentLocation}
      onSubmit={handleEditCurrentLocation}
      isLoading={editCurrentLocationResult.fetching}
      error={editCurrentLocationResult.error}
      {...props}
    />
  )
}
