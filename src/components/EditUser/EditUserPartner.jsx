import { useMutation } from 'urql'
import { LIST_AVAILABLE_PARTNERS } from 'graphql/queries/users'
import { ADD_PARTNER } from 'graphql/mutations/users'
import { DELETE_USER_PARTNER } from 'graphql/mutations/couples'

import EditableAvatarTrigger from 'components/_input/EditableAvatarTrigger'

export default function EditUserPartner ({ user }) {
  const [addPartnerResult, addPartner] = useMutation(ADD_PARTNER)
  const [removePartnerResult, removePartner] = useMutation(DELETE_USER_PARTNER)

  const handleRemovePartner = () => {
    const variables = { coupleID: user.couple.id }
    return removePartner(variables)
  }

  const handleAddPartner = (id) => {
    const variables = { userID: user.id, partnerID: id }
    return addPartner(variables)
  }

  return (
    <EditableAvatarTrigger
      title='Add Partner'
      user={user}
      limit={1}
      relations={user.couple?.partner ? [user.couple?.partner] : []}
      removeRelation={handleRemovePartner}
      removeRelationResult={removePartnerResult}
      addRelation={handleAddPartner}
      addRelationResult={addPartnerResult}
      LIST_AVAILABLE_RELATIONS={LIST_AVAILABLE_PARTNERS}
    />
  )
}
