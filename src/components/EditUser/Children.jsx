import { useMutation } from 'urql'

import { ADD_CHILD, REMOVE_CHILD } from 'graphql/client/mutations/child'
import { SUGGEST_CHILDREN } from 'graphql/client/queries/suggestList'

import AvatarTrigger from 'components/_trigger/AvatarTrigger'

export default function Children ({ user }) {
  const [addChildResult, addChild] = useMutation(ADD_CHILD)
  const [removeChildResult, removeChild] = useMutation(REMOVE_CHILD)

  const handleRemoveChild = (id) => {
    const variables = { userID: user.id, childID: id }
    return removeChild(variables)
  }

  const handleAddChild = (id) => {
    const variables = { userID: user.id, childID: id }
    return addChild(variables)
  }

  return (
    <AvatarTrigger
      title='Add Child'
      user={user}
      relations={user.children}
      removeRelation={handleRemoveChild}
      removeRelationResult={removeChildResult}
      addRelation={handleAddChild}
      addRelationResult={addChildResult}
      SUGGEST_RELATIONS={SUGGEST_CHILDREN}
    />
  )
}
