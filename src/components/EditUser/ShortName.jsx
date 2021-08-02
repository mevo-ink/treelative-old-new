import { string } from 'yup'
import { useMutation } from 'urql'

import { UPDATE_SHORT_NAME } from 'graphql/mutations/users'

import InputTrigger from 'components/_trigger/InputTrigger'

export default function ShortName ({ user }) {
  const [editShortNameResult, editShortName] = useMutation(UPDATE_SHORT_NAME)

  const handleEditShortName = shortName => {
    const variables = { userID: user.id, input: { shortName } }
    return editShortName(variables)
  }

  return (
    <InputTrigger
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
