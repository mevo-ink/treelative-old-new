import { useRouter } from 'next/router'

import { useMutation, useQueryClient } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import DateTrigger from 'components/_trigger/DateTrigger'

import { useRecoilValue } from 'recoil'
import { layoutMethodsAtom } from 'utils/atoms.js'

export default function DateOfDeath ({ user }) {
  const { mutateAsync, ...editDateOfDeathResult } = useMutation(updateUserGeneral)

  const layoutMethods = useRecoilValue(layoutMethodsAtom)
  const router = useRouter()
  const layout = router.pathname.split('/')[2]

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    ['age', 'birthday'].includes(layout) && layoutMethods.refetch()
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleEditDateOfDeath = dateOfDeath => {
    return mutateAsync({ userID: user.id, input: { dateOfDeath } }, { onSuccess })
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
