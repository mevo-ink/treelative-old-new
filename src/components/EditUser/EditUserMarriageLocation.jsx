import { useMutation } from 'urql'

import { UPDATE_MARRIAGE_LOCATION } from 'graphql/mutations/users'

import EditableLocationTrigger from 'components/_input/EditableLocationTrigger'

export default function EditUserMarriageLocation ({ user }) {
  const [editMarriageLocationResult, editMarriageLocation] = useMutation(UPDATE_MARRIAGE_LOCATION)

  console.log(editMarriageLocationResult)

  const handleEditMarriageLocation = marriageLocation => {
    const variables = { userID: user.id, input: { marriageLocation } }
    return editMarriageLocation(variables)
  }

  return (
    <EditableLocationTrigger
      title='Edit Marriage Location'
      value={user?.marriageLocation}
      onSubmit={handleEditMarriageLocation}
      isLoading={editMarriageLocationResult.fetching}
      error={editMarriageLocationResult.error}
    />
  )
}
