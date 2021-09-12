import { useMutation, useQueryClient } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import DateTrigger from 'components/_trigger/DateTrigger'

export default function DateOfMarriage ({ user }) {
  const { mutateAsync, ...editDateOfMarriageResult } = useMutation(updateUserGeneral)

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleEditDateOfMarriage = dateOfMarriage => {
    return mutateAsync({ userID: user.id, input: { dateOfMarriage } }, { onSuccess })
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
