import EditableLocationDialog from 'components/_input/EditableLocationDialog'

import { useMutation } from 'urql'
import { UPDATE_USER_DEATH_LOCATION } from 'graphql/mutations/users'

export default function EditUserDeathLocation ({ user }) {
  const [{ error, fetching }, updateUserDeathLocation] = useMutation(UPDATE_USER_DEATH_LOCATION)

  const handleSubmit = deathLocation => {
    const variables = { userID: user.id, input: { deathLocation } }
    return updateUserDeathLocation(variables)
  }

  return (
    <EditableLocationDialog
      title='Edit Death Location'
      subTitle={user.fullName}
      name='deathLocation'
      value={user.deathLocation || ''}
      onSubmit={handleSubmit}
      loading={fetching}
      error={error}
    />
  )
}
