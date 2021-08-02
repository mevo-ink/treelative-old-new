import { useMutation } from 'urql'
import { UPDATE_DATE_OF_BIRTH } from 'graphql/mutations/users'

import DateTimePickerTrigger from 'components/_input/DateTimePickerTrigger'

export default function EditUserDateOfBirth ({ user }) {
  const [editDateOfBirthResult, editDateOfBirth] = useMutation(UPDATE_DATE_OF_BIRTH)

  const handleEditDateOfBirth = dateOfBirth => {
    const variables = { userID: user.id, input: { dateOfBirth } }
    return editDateOfBirth(variables)
  }

  return (
    <DateTimePickerTrigger
      title='Edit Date of Birth'
      value={user.dateOfBirth}
      editDate={handleEditDateOfBirth}
      editDateResult={editDateOfBirthResult}
    />
  )
}
