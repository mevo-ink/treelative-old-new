import { useMutation } from 'react-query'

import { addUserParent, removeUserParent } from 'graphql/client/mutations/relations'
import { searchUserParents } from 'graphql/client/queries/search'

import AvatarTrigger from 'components/_trigger/AvatarTrigger'

export default function Parents ({ user }) {
  const { mutateAsync: addUserParentMutation, ...addUserParentResult } = useMutation(addUserParent)
  const { mutateAsync: removeUserParentMutation, ...removeUserParentResult } = useMutation(removeUserParent)

  const handleRemoveParent = (id) => {
    return removeUserParentMutation({ userID: user.id, parentID: id })
  }

  const handleAddParent = (id) => {
    return addUserParentMutation({ userID: user.id, parentID: id })
  }

  return (
    <AvatarTrigger
      title='Add Parent'
      user={user}
      limit={2}
      relations={user.parents}
      removeRelation={handleRemoveParent}
      removeRelationResult={removeUserParentResult}
      addRelation={handleAddParent}
      addRelationResult={addUserParentResult}
      SUGGEST_RELATIONS={searchUserParents}
    />
  )
}
