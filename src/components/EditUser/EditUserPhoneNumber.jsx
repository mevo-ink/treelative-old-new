import EditableInputWithIconTrigger from 'components/_input/EditableInputWithIconTrigger'

import { string } from 'yup'

import { useMutation } from 'urql'
import { UPDATE_PHONE_NUMBER } from 'graphql/mutations/users'

export default function EditUserPhoneNumber ({ user, icon }) {
  const [editPhoneNumberResult, editPhoneNumber] = useMutation(UPDATE_PHONE_NUMBER)

  const handleEditPhoneNumber = phoneNumber => {
    const variables = { userID: user.id, input: { phoneNumber } }
    return editPhoneNumber(variables)
  }

  return (
    <EditableInputWithIconTrigger
      title='Edit Phone Number'
      name='phoneNumber'
      icon={icon}
      value={user?.phoneNumber}
      validation={string().matches(/^\+?\d{10,14}$/, { message: 'Invalid Phone Number', excludeEmptyString: true })}
      onSubmit={handleEditPhoneNumber}
      isLoading={editPhoneNumberResult.fetching}
      error={editPhoneNumberResult.error}
    />
  )
}
