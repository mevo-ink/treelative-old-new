import EditableInputWithIconTrigger from 'components/_input/EditableInputWithIconTrigger'

import { string } from 'yup'

import { useMutation } from 'urql'
import { UPDATE_USER_EMAIL } from 'graphql/mutations/users'

export default function EditUserEmail ({ user, ...props }) {
  const [{ error, fetching }, updateUserEmail] = useMutation(UPDATE_USER_EMAIL)

  const handleSubmit = email => {
    const variables = { userID: user.id, input: { email } }
    return updateUserEmail(variables)
  }

  return (
    <EditableInputWithIconTrigger
      type='text'
      title='Edit Email'
      subTitle={user.fullName}
      name='email'
      value={user.email || ''}
      onSubmit={handleSubmit}
      validation={string().email().required()}
      loading={fetching}
      error={error}
      {...props}
    />
  )
}
