import { useMutation } from 'urql'
import { LIST_USER_AVAILABLE_PARENTS } from 'graphql/queries/users'
import { ADD_USER_PARENT, DELETE_USER_PARENT } from 'graphql/mutations/users'

import EditableAvatarTrigger from 'components/_input/EditableAvatarTrigger'

export default function EditUserParents ({ user }) {
  const [addParentResult, addParent] = useMutation(ADD_USER_PARENT)
  const [removeParentResult, removeParent] = useMutation(DELETE_USER_PARENT)

  return (
    <EditableAvatarTrigger
      title='Add Parent'
      user={user}
      relations={user.parents}
      removeRelation={removeParent}
      removeRelationResult={removeParentResult}
      addRelation={addParent}
      addRelationResult={addParentResult}
      LIST_USER_AVAILABLE_RELATIONS={LIST_USER_AVAILABLE_PARENTS}
    />
  )
}
