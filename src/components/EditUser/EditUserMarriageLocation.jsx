import { useMutation } from 'urql'

import { UPDATE_USER_MARRIAGE_LOCATION } from 'graphql/mutations/couples'

import EditableLocationTrigger from 'components/_input/EditableLocationTrigger'

export default function EditUserMarriageLocation ({ user }) {
  const [editMarriageLocationResult, editMarriageLocation] = useMutation(UPDATE_USER_MARRIAGE_LOCATION)

  const handleEditMarriageLocation = marriageLocation => {
    const variables = { coupleID: user.couple.id, input: { marriageLocation } }
    return editMarriageLocation(variables)
  }

  return (
    <EditableLocationTrigger
      title='Edit Marriage Location'
      value={user?.couple.marriageLocation}
      onSubmit={handleEditMarriageLocation}
      isLoading={editMarriageLocationResult.fetching}
      error={editMarriageLocationResult.error}
    />
  )
}
