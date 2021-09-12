import { useRouter } from 'next/router'

import { useMutation, useQueryClient } from 'react-query'

import { addUserPartner, removeUserPartner } from 'graphql/client/mutations/relations'
import { searchUserPartners } from 'graphql/client/queries/search'

import { useRecoilValue } from 'recoil'
import { layoutMethodsAtom } from 'utils/atoms.js'

import AvatarTrigger from 'components/_trigger/AvatarTrigger'

export default function Partner ({ user }) {
  const { mutateAsync: addUserPartnerMutation, ...addUserPartnerResult } = useMutation(addUserPartner)
  const { mutateAsync: removeUserPartnerMutation, ...removeUserPartnerResult } = useMutation(removeUserPartner)

  const layoutMethods = useRecoilValue(layoutMethodsAtom)
  const router = useRouter()
  const layout = router.pathname.split('/')[2]

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    layout === 'graph' && layoutMethods.refetch()
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleRemovePartner = (id) => {
    return removeUserPartnerMutation({ userID: user.id, partnerID: id }, { onSuccess })
  }

  const handleAddPartner = (id) => {
    return addUserPartnerMutation({ userID: user.id, partnerID: id }, { onSuccess })
  }

  return (
    <AvatarTrigger
      title='Add Partner'
      user={user}
      limit={1}
      relations={user.partner ? [user.partner] : []}
      removeRelation={handleRemovePartner}
      removeRelationResult={removeUserPartnerResult}
      addRelation={handleAddPartner}
      addRelationResult={addUserPartnerResult}
      SUGGEST_RELATIONS={searchUserPartners}
    />
  )
}
