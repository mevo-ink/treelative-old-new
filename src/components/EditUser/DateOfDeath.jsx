import { useMutation } from 'urql'

import { UPDATE_DATE_OF_DEATH } from 'graphql/mutations/users'

import DateTrigger from 'components/_trigger/DateTrigger'

export default function DateOfDeath ({ user }) {
  const [editDateOfDeathResult, editDateOfDeath] = useMutation(UPDATE_DATE_OF_DEATH)

  const handleEditDateOfDeath = dateOfDeath => {
    const variables = { userID: user.id, input: { dateOfDeath } }
    return editDateOfDeath(variables)
  }

  return (
    <DateTrigger
      title='Edit Date of Death'
      value={user.dateOfDeath}
      editDate={handleEditDateOfDeath}
      editDateResult={editDateOfDeathResult}
    />
  )
}
