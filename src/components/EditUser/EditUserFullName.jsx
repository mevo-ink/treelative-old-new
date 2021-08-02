import React from 'react'

import EditableInputTrigger from 'components/_input/EditableInputTrigger'

import { string } from 'yup'

import { useMutation } from 'urql'
import { UPDATE_FULL_NAME } from 'graphql/mutations/users'

export default function EditUserFullName ({ user }) {
  const [editFullNameResult, editFullName] = useMutation(UPDATE_FULL_NAME)

  const handleEditFullName = fullName => {
    const variables = { userID: user.id, input: { fullName } }
    return editFullName(variables)
  }

  return (
    <EditableInputTrigger
      title='Edit Full Name'
      name='fullName'
      value={user?.fullName}
      validation={string().required()}
      onSubmit={handleEditFullName}
      isLoading={editFullNameResult.fetching}
      error={editFullNameResult.error}
    />
  )
}
