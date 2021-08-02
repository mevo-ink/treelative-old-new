import { useMutation } from 'urql'
import { LIST_AVAILABLE_CHILDREN } from 'graphql/queries/users'
import { ADD_CHILD, DELETE_USER_CHILD } from 'graphql/mutations/users'

import EditableAvatarTrigger from 'components/_input/EditableAvatarTrigger'

export default function EditUserChildren ({ user }) {
  const [addChildResult, addChild] = useMutation(ADD_CHILD)
  const [removeChildResult, removeChild] = useMutation(DELETE_USER_CHILD)

  const handleRemoveChild = (id) => {
    const variables = { userID: user.id, childID: id }
    return removeChild(variables)
  }

  const handleAddChild = (id) => {
    const variables = { userID: user.id, childID: id }
    return addChild(variables)
  }

  return (
    <EditableAvatarTrigger
      title='Add Child'
      user={user}
      relations={user.children}
      removeRelation={handleRemoveChild}
      removeRelationResult={removeChildResult}
      addRelation={handleAddChild}
      addRelationResult={addChildResult}
      LIST_AVAILABLE_RELATIONS={LIST_AVAILABLE_CHILDREN}
    />
  )
}
