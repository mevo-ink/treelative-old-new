import EditableInputWithIconTrigger from 'components/_input/EditableInputWithIconTrigger'

import { string } from 'yup'

import { useMutation } from 'urql'
import { UPDATE_USER_PHONE_NUMBER } from 'graphql/mutations/users'

export default function EditUserPhoneNumber ({ user, ...props }) {
  const [{ error, fetching }, updateUserPhoneNumber] = useMutation(UPDATE_USER_PHONE_NUMBER)

  const handleSubmit = phoneNumber => {
    const variables = { userID: user.id, input: { phoneNumber } }
    return updateUserPhoneNumber(variables)
  }

  return (
    <EditableInputWithIconTrigger
      title='Edit Phone Number'
      subTitle={user.fullName}
      name='phoneNumber'
      type='tel'
      value={user.phoneNumber || ''}
      onSubmit={handleSubmit}
      validation={string().matches(/^\+?\d{10,14}$/, { message: 'Invalid Phone Number', excludeEmptyString: true })}
      loading={fetching}
      error={error}
      notification='Successfully updated the full name'
      {...props}
    />
  )
}
