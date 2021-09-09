import { useMutation } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import DateTrigger from 'components/_trigger/DateTrigger'

export default function DateOfMarriage ({ user }) {
  const { mutateAsync, ...editDateOfMarriageResult } = useMutation(updateUserGeneral)

  const handleEditDateOfMarriage = dateOfMarriage => {
    return mutateAsync({ userID: user.id, input: { dateOfMarriage } })
  }

  return (
    <DateTrigger
      title='Edit Date of Marriage'
      value={user.dateOfMarriage}
      editDate={handleEditDateOfMarriage}
      editDateResult={editDateOfMarriageResult}
    />
  )
}
