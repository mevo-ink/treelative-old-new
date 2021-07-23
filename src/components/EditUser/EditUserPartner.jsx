import { useMutation } from 'urql'
import { LIST_USER_AVAILABLE_PARTNERS } from 'graphql/queries/users'
import { ADD_USER_PARTNER, DELETE_USER_PARTNER } from 'graphql/mutations/couples'

import EditableAvatarTrigger from 'components/_input/EditableAvatarTrigger'

export default function EditUserPartner ({ user }) {
  const [addPartnerResult, addPartner] = useMutation(ADD_USER_PARTNER)
  const [removePartnerResult, removePartner] = useMutation(DELETE_USER_PARTNER)

  return (
    <EditableAvatarTrigger
      title='Add Partner'
      user={user}
      relations={[user.couple.partner]}
      removeRelation={removePartner}
      removeRelationResult={removePartnerResult}
      addRelation={addPartner}
      addRelationResult={addPartnerResult}
      LIST_USER_AVAILABLE_RELATIONS={LIST_USER_AVAILABLE_PARTNERS}
    />
  )
}
