import { useMutation } from 'urql'
import { UPDATE_USER_DATE_OF_DEATH } from 'graphql/mutations/users'

import DateTimePickerTrigger from 'components/_input/DateTimePickerTrigger'

export default function EditUserDateOfDeath ({ user }) {
  const [editDateOfDeathResult, editDateOfDeath] = useMutation(UPDATE_USER_DATE_OF_DEATH)

  const handleEditDateOfDeath = dateOfDeath => {
    const variables = { userID: user.id, input: { dateOfDeath } }
    return editDateOfDeath(variables)
  }

  return (
    <DateTimePickerTrigger
      title='Edit Date of Death'
      value={user.dateOfDeath}
      editDate={handleEditDateOfDeath}
      editDateResult={editDateOfDeathResult}
    />
  )
}
