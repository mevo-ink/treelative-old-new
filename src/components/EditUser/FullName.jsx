import React from 'react'

import { string } from 'yup'
import { useMutation } from 'urql'

import { UPDATE_FULL_NAME } from 'graphql/client/mutations/users'

import InputTrigger from 'components/_trigger/InputTrigger'

export default function FullName ({ user }) {
  const [editFullNameResult, editFullName] = useMutation(UPDATE_FULL_NAME)

  const handleEditFullName = fullName => {
    const variables = { userID: user.id, input: { fullName } }
    return editFullName(variables)
  }

  return (
    <InputTrigger
      title='Edit Full Name'
      name='fullName'
      value={user?.fullName}
      validation={string().required()}
      onSubmit={handleEditFullName}
      isLoading={editFullNameResult.fetching}
      error={editFullNameResult.error}
      notRemovable
    />
  )
}
