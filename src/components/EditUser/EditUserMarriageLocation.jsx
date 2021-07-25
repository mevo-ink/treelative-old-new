import EditableLocationTrigger from 'components/_input/EditableLocationTrigger'

import { useMutation } from 'urql'
import { UPDATE_USER_MARRIAGE_LOCATION } from 'graphql/mutations/couples'

export default function EditUserMarriageLocation ({ user, ...props }) {
  const [{ error, fetching }, updateUserMarriageLocation] = useMutation(UPDATE_USER_MARRIAGE_LOCATION)

  const handleSubmit = marriageLocation => {
    const variables = { coupleID: user.couple.id, input: { marriageLocation } }
    return updateUserMarriageLocation(variables)
  }

  return (
    <EditableLocationTrigger
      title='Edit Marriage Location'
      subTitle={user.fullName}
      name='marriageLocation'
      value={user.couple?.marriageLocation || ''}
      onSubmit={handleSubmit}
      loading={fetching}
      error={error}
      {...props}
    />
  )
}
