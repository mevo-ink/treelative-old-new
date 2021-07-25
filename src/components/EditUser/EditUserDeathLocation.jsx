import { useMutation } from 'urql'

import { UPDATE_USER_DEATH_LOCATION } from 'graphql/mutations/users'

import EditableLocationTrigger from 'components/_input/EditableLocationTrigger'

export default function EditUserDeathLocation ({ user }) {
  const [editDeathLocationResult, editDeathLocation] = useMutation(UPDATE_USER_DEATH_LOCATION)

  const handleEditDeathLocation = deathLocation => {
    const variables = { userID: user.id, input: { deathLocation } }
    return editDeathLocation(variables)
  }

  return (
    <EditableLocationTrigger
      title='Edit Death Location'
      value={user?.deathLocation}
      onSubmit={handleEditDeathLocation}
      isLoading={editDeathLocationResult.fetching}
      error={editDeathLocationResult.error}
    />
  )
}
