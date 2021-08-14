import { useMutation } from 'urql'

import { UPDATE_BIRTH_LOCATION } from 'graphql/mutations/users'

import LocationTrigger from 'components/_trigger/LocationTrigger'

export default function BirthLocation ({ user }) {
  const [editBirthLocationResult, editBirthLocation] = useMutation(UPDATE_BIRTH_LOCATION)

  const handleEditBirthLocation = birthLocation => {
    const variables = { userID: user.id, input: { birthLocation } }
    return editBirthLocation(variables)
  }

  return (
    <LocationTrigger
      title='Edit Birth Location'
      value={user?.birthLocation}
      onSubmit={handleEditBirthLocation}
      isLoading={editBirthLocationResult.fetching}
      error={editBirthLocationResult.error}
    />
  )
}
