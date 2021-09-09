import { useMutation } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import DateTrigger from 'components/_trigger/DateTrigger'

export default function DateOfDeath ({ user }) {
  const { mutateAsync, ...editDateOfDeathResult } = useMutation(updateUserGeneral)

  const handleEditDateOfDeath = dateOfDeath => {
    return mutateAsync({ userID: user.id, input: { dateOfDeath } })
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
