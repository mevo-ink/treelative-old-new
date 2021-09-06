import { string } from 'yup'
import { useMutation } from 'urql'

import { UPDATE_EMAIL } from 'graphql/client/mutations/phoneAndEmail'

import InputWithIconTrigger from 'components/_trigger/InputWithIconTrigger'

export default function Email ({ user, icon }) {
  const [editEmailResult, editEmail] = useMutation(UPDATE_EMAIL)

  const handleEditEmail = email => {
    const variables = { userID: user.id, input: { email } }
    return editEmail(variables)
  }

  return (
    <InputWithIconTrigger
      title='Edit Email'
      name='email'
      baseURL='https://mailto:'
      icon={icon}
      value={user?.email}
      validation={string().email().required()}
      onSubmit={handleEditEmail}
      isLoading={editEmailResult.fetching}
      error={editEmailResult.error}
    />
  )
}
