import EditableInputTrigger from 'components/_input/EditableInputTrigger'

import { string } from 'yup'

import { useMutation } from 'urql'
import { UPDATE_USER_SHORT_NAME } from 'graphql/mutations/users'

export default function EditUserShortName ({ user }) {
  const [{ error, fetching }, updateUserShortName] = useMutation(UPDATE_USER_SHORT_NAME)

  const handleSubmit = shortName => {
    const variables = { userID: user.id, input: { shortName } }
    return updateUserShortName(variables)
  }

  return (
    <EditableInputTrigger
      type='text'
      title='Edit Short Name'
      subTitle={user.shortName}
      name='shortName'
      value={user.shortName || ''}
      onSubmit={handleSubmit}
      validation={string().required()}
      loading={fetching}
      error={error}
    />
  )
}
