import { string } from 'yup'
import { useMutation } from 'urql'

import { UPDATE_USER_SHORT_NAME } from 'graphql/mutations/users'

import EditableInputTrigger from 'components/_input/EditableInputTrigger'

export default function EditUserShortName ({ user }) {
  const [editShortNameResult, editShortName] = useMutation(UPDATE_USER_SHORT_NAME)

  const handleEditShortName = shortName => {
    const variables = { userID: user.id, input: { shortName } }
    return editShortName(variables)
  }

  return (
    <EditableInputTrigger
      title='Edit Short Name'
      name='shortName'
      value={user?.shortName}
      validation={string().required()}
      onSubmit={handleEditShortName}
      isLoading={editShortNameResult.fetching}
      error={editShortNameResult.error}
    />
  )
}
