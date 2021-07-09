import { useMutation } from 'urql'
import { UPDATE_USER_DATE_OF_DEATH } from 'graphql/mutations/users'

import DateTimePicker from 'components/_input/DateTimePicker'

export default function EditUserDateOfDeath ({ user }) {
  const [{ error, fetching }, updateUserDateOfDeath] = useMutation(UPDATE_USER_DATE_OF_DEATH)

  const handleSubmit = dateOfDeath => {
    const variables = { userID: user.id, input: { dateOfDeath } }
    return updateUserDateOfDeath(variables)
  }

  return (
    <DateTimePicker
      isClearable
      type='date'
      label='Edit Date of Death'
      subTitle={user.fullName}
      value={user.dateOfDeath}
      onChange={handleSubmit}
      error={error}
      loading={fetching}
      notification='Successfully updated the date of death'
    />
  )
}
