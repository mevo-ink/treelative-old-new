import { useMutation } from 'urql'

import { UPDATE_CURRENT_LOCATION } from 'graphql/mutations/users'

import EditableLocationTrigger from 'components/_input/EditableLocationTrigger'

export default function EditUserCurrentLocation ({ user }) {
  const [editCurrentLocationResult, updateUserCurrentLocation] = useMutation(UPDATE_CURRENT_LOCATION)

  const handleEditCurrentLocation = currentLocation => {
    const variables = { userID: user.id, input: { currentLocation } }
    return updateUserCurrentLocation(variables)
  }

  return (
    <EditableLocationTrigger
      title='Edit Current Location'
      value={user?.currentLocation}
      onSubmit={handleEditCurrentLocation}
      isLoading={editCurrentLocationResult.fetching}
      error={editCurrentLocationResult.error}
    />
  )
}
