import { useMutation } from 'urql'

import { LIST_AVAILABLE_PARTNERS } from 'graphql/queries/users'
import { ADD_PARTNER, REMOVE_PARTNER } from 'graphql/mutations/users'

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
      limit={2}
      relations={[user.partner]}
      removeRelation={handleRemovePartner}
      removeRelationResult={removePartnerResult}
      addRelation={handleAddPartner}
      addRelationResult={addPartnerResult}
      LIST_AVAILABLE_RELATIONS={LIST_AVAILABLE_PARTNERS}
    />
  )
}
