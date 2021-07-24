import React from 'react'

import { useMutation } from 'urql'
import { UPDATE_COUPLE_DATE_OF_MARRIAGE } from 'graphql/mutations/couples'

import DateTimePicker from 'components/_input/DateTimePicker'

import {
  FormLabel,
  FormControl
} from '@chakra-ui/form-control'

export default function EditCoupleDateOfMarriage ({ couple, inline = false }) {
  const [{ error, fetching }, updateCoupleDateOfMarriage] = useMutation(UPDATE_COUPLE_DATE_OF_MARRIAGE)

  const handleSubmit = dateOfMarriage => {
    const variables = { coupleID: couple.id, input: { dateOfMarriage } }
    return updateCoupleDateOfMarriage(variables)
  }

  return (
    <FormControl>
      <FormLabel>Date of Marriage</FormLabel>
      <DateTimePicker
        fontSize='md'
        inline={inline}
        type='date'
        label='Edit Date of Marriage'
        value={couple.dateOfMarriage}
        onChange={handleSubmit}
        error={error}
        loading={fetching}
      />
    </FormControl>
  )
}
