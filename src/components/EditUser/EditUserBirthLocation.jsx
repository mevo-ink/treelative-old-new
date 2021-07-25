import { useMutation } from 'urql'

import { UPDATE_USER_BIRTH_LOCATION } from 'graphql/mutations/users'

import EditableLocationTrigger from 'components/_input/EditableLocationTrigger'

export default function EditUserBirthLocation ({ user }) {
  const [editBirthLocationResult, editBirthLocation] = useMutation(UPDATE_USER_BIRTH_LOCATION)

  const handleSubmit = birthLocation => {
    const variables = { userID: user.id, input: { birthLocation } }
    return editBirthLocation(variables)
  }

  return (
    <EditableLocationTrigger
      title='Edit Birth Location'
      value={user?.birthLocation}
      onSubmit={handleSubmit}
      isLoading={editBirthLocationResult.fetching}
      error={editBirthLocationResult.error}
    />
  )
}
