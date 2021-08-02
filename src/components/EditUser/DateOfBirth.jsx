import { useMutation } from 'urql'

import { UPDATE_DATE_OF_BIRTH } from 'graphql/mutations/users'

import DateTrigger from 'components/_trigger/DateTrigger'

export default function DateOfBirth ({ user }) {
  const [editDateOfBirthResult, editDateOfBirth] = useMutation(UPDATE_DATE_OF_BIRTH)

  const handleEditDateOfBirth = dateOfBirth => {
    const variables = { userID: user.id, input: { dateOfBirth } }
    return editDateOfBirth(variables)
  }

  return (
    <DateTrigger
      title='Edit Date of Birth'
      value={user.dateOfBirth}
      editDate={handleEditDateOfBirth}
      editDateResult={editDateOfBirthResult}
    />
  )
}
