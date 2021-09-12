import { useRouter } from 'next/router'

import { useMutation, useQueryClient } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import { useRecoilValue } from 'recoil'
import { layoutMethodsAtom } from 'utils/atoms.js'

import DateTrigger from 'components/_trigger/DateTrigger'

export default function DateOfBirth ({ user, ...props }) {
  const { mutateAsync, ...editDateOfBirthResult } = useMutation(updateUserGeneral)

  const layoutMethods = useRecoilValue(layoutMethodsAtom)
  const router = useRouter()
  const layout = router.pathname.split('/')[2]

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    ['age', 'birthday'].includes(layout) && layoutMethods.refetch()
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleEditDateOfBirth = dateOfBirth => {
    return mutateAsync({ userID: user.id, input: { dateOfBirth } }, { onSuccess })
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
