import { useMutation } from 'urql'
import { LIST_USER_AVAILABLE_CHILDREN } from 'graphql/queries/users'
import { ADD_USER_CHILD, DELETE_USER_CHILD } from 'graphql/mutations/users'

import EditableAvatarTrigger from 'components/_input/EditableAvatarTrigger'

export default function EditUserChildren ({ user }) {
  const [addChildResult, addChild] = useMutation(ADD_USER_CHILD)
  const [removeChildResult, removeChild] = useMutation(DELETE_USER_CHILD)

  return (
    <EditableAvatarTrigger
      title='Add Child'
      user={user}
      relations={user.children}
      removeRelation={removeChild}
      removeRelationResult={removeChildResult}
      addRelation={addChild}
      addRelationResult={addChildResult}
      LIST_USER_AVAILABLE_RELATIONS={LIST_USER_AVAILABLE_CHILDREN}
    />
  )
}
