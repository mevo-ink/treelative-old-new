import { useMutation } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import DateTrigger from 'components/_trigger/DateTrigger'

export default function DateOfBirth ({ user, ...props }) {
  const { mutateAsync, ...editDateOfBirthResult } = useMutation(updateUserGeneral)

  const handleEditDateOfBirth = dateOfBirth => {
    return mutateAsync({ userID: user.id, input: { dateOfBirth } })
  }

  return (
    <DateTrigger
      title='Edit Date of Birth'
      value={user.dateOfBirth}
      editDate={handleEditDateOfBirth}
      editDateResult={editDateOfBirthResult}
      {...props}
    />
  )
}
