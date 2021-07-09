import EditableLocationDialog from 'components/_input/EditableLocationDialog'

import { useMutation } from 'urql'
import { UPDATE_USER_BIRTH_LOCATION } from 'graphql/mutations/users'

export default function EditUserBirthLocation ({ user }) {
  const [{ error, fetching }, updateUserBirthLocation] = useMutation(UPDATE_USER_BIRTH_LOCATION)

  const handleSubmit = birthLocation => {
    const variables = { userID: user.id, input: { birthLocation } }
    return updateUserBirthLocation(variables)
  }

  return (
    <EditableLocationDialog
      title='Edit Birth Location'
      subTitle={user.fullName}
      value={user.birthLocation || ''}
      onSubmit={handleSubmit}
      loading={fetching}
      error={error}
      notification='Successfully updated the birth location'
    />
  )
}
