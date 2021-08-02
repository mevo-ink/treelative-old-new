import { useMutation } from 'urql'
import { UPDATE_DATE_OF_MARRIAGE } from 'graphql/mutations/users'

import DateTimePickerTrigger from 'components/_input/DateTimePickerTrigger'

export default function EditUserDateOfMarriage ({ user }) {
  const [editDateOfMarriageResult, editDateOfMarriage] = useMutation(UPDATE_DATE_OF_MARRIAGE)

  const handleEditDateOfMarriage = dateOfMarriage => {
    const variables = { coupleID: user.couple.id, input: { dateOfMarriage } }
    return editDateOfMarriage(variables)
  }

  return (
    <DateTimePickerTrigger
      title='Edit Date of Marriage'
      value={user.dateOfMarriage}
      editDate={handleEditDateOfMarriage}
      editDateResult={editDateOfMarriageResult}
    />
  )
}
