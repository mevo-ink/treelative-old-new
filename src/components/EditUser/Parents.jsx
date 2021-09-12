import { useRouter } from 'next/router'

import { useMutation, useQueryClient } from 'react-query'

import { addUserParent, removeUserParent } from 'graphql/client/mutations/relations'
import { searchUserParents } from 'graphql/client/queries/search'

import { useRecoilValue } from 'recoil'
import { layoutMethodsAtom } from 'utils/atoms.js'

import AvatarTrigger from 'components/_trigger/AvatarTrigger'

export default function Parents ({ user }) {
  const { mutateAsync: addUserParentMutation, ...addUserParentResult } = useMutation(addUserParent)
  const { mutateAsync: removeUserParentMutation, ...removeUserParentResult } = useMutation(removeUserParent)

  const layoutMethods = useRecoilValue(layoutMethodsAtom)
  const router = useRouter()
  const layout = router.pathname.split('/')[2]

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    layout === 'graph' && layoutMethods.refetch()
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleRemoveParent = (id) => {
    return removeUserParentMutation({ userID: user.id, parentID: id }, { onSuccess })
  }

  const handleAddParent = (id) => {
    return addUserParentMutation({ userID: user.id, parentID: id }, { onSuccess })
  }

  return (
    <AvatarTrigger
      title='Add Parent'
      user={user}
      limit={2}
      relations={user.parents}
      removeRelation={handleRemoveParent}
      removeRelationResult={removeUserParentResult}
      addRelation={handleAddParent}
      addRelationResult={addUserParentResult}
      SUGGEST_RELATIONS={searchUserParents}
    />
  )
}
