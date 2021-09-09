import { useMutation } from 'react-query'

import { addUserPartner, removeUserPartner } from 'graphql/client/mutations/relations'
import { searchUserPartners } from 'graphql/client/queries/search'

import AvatarTrigger from 'components/_trigger/AvatarTrigger'

export default function Partner ({ user }) {
  const { mutateAsync: addUserPartnerMutation, ...addUserPartnerResult } = useMutation(addUserPartner)
  const { mutateAsync: removeUserPartnerMutation, ...removeUserPartnerResult } = useMutation(removeUserPartner)

  const handleRemovePartner = (id) => {
    return removeUserPartnerMutation({ userID: user.id, partnerID: id })
  }

  const handleAddPartner = (id) => {
    return addUserPartnerMutation({ userID: user.id, partnerID: id })
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
