import { useMutation } from 'urql'

import { LIST_AVAILABLE_PARENTS } from 'graphql/queries/users'
import { ADD_PARENT, REMOVE_PARENT } from 'graphql/mutations/users'

import AvatarTrigger from 'components/_trigger/AvatarTrigger'

export default function Parents ({ user }) {
  const [addParentResult, addParent] = useMutation(ADD_PARENT)
  const [removeParentResult, removeParent] = useMutation(REMOVE_PARENT)

  const handleRemoveParent = (id) => {
    const variables = { userID: user.id, parentID: id }
    return removeParent(variables)
  }

  const handleAddParent = (id) => {
    const variables = { userID: user.id, parentID: id }
    return addParent(variables)
  }

  return (
    <AvatarTrigger
      title='Add Parent'
      user={user}
      limit={2}
      relations={user.parents}
      removeRelation={handleRemoveParent}
      removeRelationResult={removeParentResult}
      addRelation={handleAddParent}
      addRelationResult={addParentResult}
      LIST_AVAILABLE_RELATIONS={LIST_AVAILABLE_PARENTS}
    />
  )
}
