import { useMutation } from 'urql'
import { UPDATE_USER_DATE_OF_BIRTH } from 'graphql/mutations/users'

import DateTimePicker from 'components/_input/DateTimePicker'

export default function EditUserDateOfBirth ({ user, ...props }) {
  const [{ error, fetching }, updateUserDateOfBirth] = useMutation(UPDATE_USER_DATE_OF_BIRTH)

  const handleSubmit = dateOfBirth => {
    const variables = { userID: user.id, input: { dateOfBirth } }
    return updateUserDateOfBirth(variables)
  }

  return (
    <DateTimePicker
      type='date'
      label='Edit Date of Birth'
      name='dateOfBirth'
      subTitle={user.fullName}
      value={user.dateOfBirth}
      onChange={handleSubmit}
      error={error}
      loading={fetching}
      notification='Successfully updated the date of birth'
      {...props}
    />
  )
}
