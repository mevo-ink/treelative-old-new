import { useRouter } from 'next/router'

import { useMutation, useQueryClient } from 'react-query'

import { addUserChild, removeUserChild } from 'graphql/client/mutations/relations'
import { searchUserChildren } from 'graphql/client/queries/search'

import { useRecoilValue } from 'recoil'
import { layoutMethodsAtom } from 'utils/atoms.js'

import AvatarTrigger from 'components/_trigger/AvatarTrigger'

export default function Children ({ user }) {
  const { mutateAsync: addUserChildMutation, ...addUserChildResult } = useMutation(addUserChild)
  const { mutateAsync: removeUserChildMutation, ...removeUserChildResult } = useMutation(removeUserChild)

  const layoutMethods = useRecoilValue(layoutMethodsAtom)
  const router = useRouter()
  const layout = router.pathname.split('/')[2]

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    layout === 'graph' && layoutMethods.refetch()
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleRemoveChild = (id) => {
    return removeUserChildMutation({ userID: user.id, childID: id }, { onSuccess })
  }

  const handleAddChild = (id) => {
    return addUserChildMutation({ userID: user.id, childID: id }, { onSuccess })
  }

  return (
    <AvatarTrigger
      title='Add Child'
      user={user}
      relations={user.children}
      removeRelation={handleRemoveChild}
      removeRelationResult={removeUserChildResult}
      addRelation={handleAddChild}
      addRelationResult={addUserChildResult}
      SUGGEST_RELATIONS={searchUserChildren}
    />
  )
}
