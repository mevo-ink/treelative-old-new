import React from 'react'

import { useMutation } from 'urql'
import { UPDATE_COUPLE_DATE_OF_MARRIAGE } from 'graphql/mutations/couples'

import DateTimePickerTrigger from 'components/_input/DateTimePickerTrigger'

export default function EditCoupleDateOfMarriage ({ couple, inline = false }) {
  const [{ error, fetching }, updateCoupleDateOfMarriage] = useMutation(UPDATE_COUPLE_DATE_OF_MARRIAGE)

  const handleSubmit = dateOfMarriage => {
    const variables = { coupleID: couple.id, input: { dateOfMarriage } }
    return updateCoupleDateOfMarriage(variables)
  }

  return (
    <DateTimePickerTrigger
      fontSize='md'
      inline={inline}
      type='date'
      label='Edit Date of Marriage'
      value={couple.dateOfMarriage}
      onChange={handleSubmit}
      error={error}
      loading={fetching}
    />
  )
}
