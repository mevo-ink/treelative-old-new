import { useMutation } from 'urql'

import { UPDATE_MARRIAGE_LOCATION } from 'graphql/mutations/partner'

import LocationTrigger from 'components/_trigger/LocationTrigger'

export default function MarriageLocation ({ user }) {
  const [editMarriageLocationResult, editMarriageLocation] = useMutation(UPDATE_MARRIAGE_LOCATION)

  const handleEditMarriageLocation = marriageLocation => {
    const variables = { userID: user.id, input: { marriageLocation } }
    return editMarriageLocation(variables)
  }

  return (
    <LocationTrigger
      title='Edit Marriage Location'
      value={user?.marriageLocation}
      onSubmit={handleEditMarriageLocation}
      isLoading={editMarriageLocationResult.fetching}
      error={editMarriageLocationResult.error}
    />
  )
}
