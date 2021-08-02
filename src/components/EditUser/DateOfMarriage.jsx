import { useMutation } from 'urql'

import { UPDATE_DATE_OF_MARRIAGE } from 'graphql/mutations/users'

import DateTrigger from 'components/_trigger/DateTrigger'

export default function DateOfMarriage ({ user }) {
  const [editDateOfMarriageResult, editDateOfMarriage] = useMutation(UPDATE_DATE_OF_MARRIAGE)

  const handleEditDateOfMarriage = dateOfMarriage => {
    const variables = { userID: user.id, input: { dateOfMarriage } }
    return editDateOfMarriage(variables)
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
