import { string } from 'yup'

import { useMutation } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import InputWithIconTrigger from 'components/_trigger/InputWithIconTrigger'

export default function PhoneNumber ({ user, icon }) {
  const { mutateAsync, isLoading, error } = useMutation(updateUserGeneral)

  const handleEditPhoneNumber = phoneNumber => {
    return mutateAsync({ userID: user.id, input: { phoneNumber } })
  }

  return (
    <InputWithIconTrigger
      title='Edit Phone Number'
      name='phoneNumber'
      baseURL='https://wa.me/'
      icon={icon}
      value={user?.phoneNumber}
      validation={string().matches(/^\+?\d{10,14}$/, { message: 'Invalid Phone Number', excludeEmptyString: true })}
      onSubmit={handleEditPhoneNumber}
      isLoading={isLoading}
      error={error}
    />
  )
}
