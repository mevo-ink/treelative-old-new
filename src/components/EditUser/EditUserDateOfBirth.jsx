import { useMutation } from 'urql'
import { UPDATE_USER_DATE_OF_BIRTH } from 'graphql/mutations/users'

import DateTimePickerTrigger from 'components/_input/DateTimePickerTrigger'

export default function EditUserDateOfBirth ({ user, ...props }) {
  const [{ error, fetching }, updateUserDateOfBirth] = useMutation(UPDATE_USER_DATE_OF_BIRTH)

  const handleSubmit = dateOfBirth => {
    const variables = { userID: user.id, input: { dateOfBirth } }
    return updateUserDateOfBirth(variables)
  }

  return (
    <DateTimePickerTrigger
      type='date'
      label='Edit Date of Birth'
      name='dateOfBirth'
      subTitle={user.fullName}
      value={user.dateOfBirth}
      onChange={handleSubmit}
      error={error}
      loading={fetching}
      {...props}
    />
  )
}
