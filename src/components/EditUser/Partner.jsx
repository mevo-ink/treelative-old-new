import { useMutation } from 'urql'

import { SUGGEST_PARTNERS } from 'graphql/client/queries/suggestList'
import { ADD_PARTNER, REMOVE_PARTNER } from 'graphql/client/mutations/partner'

import AvatarTrigger from 'components/_trigger/AvatarTrigger'

export default function Partner ({ user }) {
  const [addPartnerResult, addPartner] = useMutation(ADD_PARTNER)
  const [removePartnerResult, removePartner] = useMutation(REMOVE_PARTNER)

  const handleRemovePartner = (id) => {
    const variables = { userID: user.id, partnerID: id }
    return removePartner(variables)
  }

  const handleAddPartner = (id) => {
    const variables = { userID: user.id, partnerID: id }
    return addPartner(variables)
  }

  return (
    <AvatarTrigger
      title='Add Partner'
      user={user}
      limit={1}
      relations={user.partner ? [user.partner] : []}
      removeRelation={handleRemovePartner}
      removeRelationResult={removePartnerResult}
      addRelation={handleAddPartner}
      addRelationResult={addPartnerResult}
      SUGGEST_RELATIONS={SUGGEST_PARTNERS}
    />
  )
}
