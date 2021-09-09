import { useMutation } from 'react-query'

import { addUserChild, removeUserChild } from 'graphql/client/mutations/relations'
import { searchUserChildren } from 'graphql/client/queries/search'

import AvatarTrigger from 'components/_trigger/AvatarTrigger'

export default function Children ({ user }) {
  const { mutateAsync: addUserChildMutation, ...addUserChildResult } = useMutation(addUserChild)
  const { mutateAsync: removeUserChildMutation, ...removeUserChildResult } = useMutation(removeUserChild)

  const handleRemoveChild = (id) => {
    return removeUserChildMutation({ userID: user.id, childID: id })
  }

  const handleAddChild = (id) => {
    return addUserChildMutation({ userID: user.id, childID: id })
  }

  return (
    <AvatarTrigger
      title='Add Child'
      user={user}
      relations={user.children}
      removeRelation={handleRemoveChild}
      removeRelationResult={removeUserChildResult}
      addRelation={handleAddChild}
      addRelationResult={addUserChildResult}
      SUGGEST_RELATIONS={searchUserChildren}
    />
  )
}
