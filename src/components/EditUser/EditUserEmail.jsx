import EditableInputWithIconTrigger from 'components/_input/EditableInputWithIconTrigger'

import { string } from 'yup'

import { useMutation } from 'urql'
import { UPDATE_USER_EMAIL } from 'graphql/mutations/users'

export default function EditUserEmail ({ user, icon }) {
  const [editEmailResult, editEmail] = useMutation(UPDATE_USER_EMAIL)

  const handleEditEmail = email => {
    const variables = { userID: user.id, input: { email } }
    return editEmail(variables)
  }

  return (
    <EditableInputWithIconTrigger
      title='Edit Email'
      name='email'
      icon={icon}
      value={user?.email}
      validation={string().email().required()}
      onSubmit={handleEditEmail}
      isLoading={editEmailResult.fetching}
      error={editEmailResult.error}
    />
  )
}
