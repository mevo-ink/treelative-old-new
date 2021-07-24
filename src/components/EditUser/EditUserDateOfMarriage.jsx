import { useMutation } from 'urql'
import { UPDATE_USER_DATE_OF_MARRIAGE } from 'graphql/mutations/couples'

import DateTimePicker from 'components/_input/DateTimePicker'

export default function EditUserDateOfMarriage ({ user, ...props }) {
  const [{ error, fetching }, updateUserDateOfMarriage] = useMutation(UPDATE_USER_DATE_OF_MARRIAGE)

  const handleSubmit = dateOfMarriage => {
    const variables = { coupleID: user.couple.id, input: { dateOfMarriage } }
    return updateUserDateOfMarriage(variables)
  }

  return (
    <DateTimePicker
      type='date'
      label='Edit Date of Marriage'
      name='dateOfMarriage'
      subTitle={user.fullName}
      value={user.couple.dateOfMarriage}
      onChange={handleSubmit}
      error={error}
      loading={fetching}
      {...props}
    />
  )
}
