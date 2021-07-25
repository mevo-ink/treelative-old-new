import EditableLocationTrigger from 'components/_input/EditableLocationTrigger'

import { useMutation } from 'urql'
import { UPDATE_COUPLE_MARRIAGE_LOCATION } from 'graphql/mutations/couples'

import {
  FormLabel,
  FormControl
} from '@chakra-ui/form-control'

export default function EditCoupleMarriageLocation ({ couple }) {
  const [{ error, fetching }, updateCoupleMarriageLocation] = useMutation(UPDATE_COUPLE_MARRIAGE_LOCATION)

  const handleSubmit = marriageLocation => {
    const variables = { coupleID: couple.id, input: { marriageLocation } }
    return updateCoupleMarriageLocation(variables)
  }

  return (
    <FormControl>
      <FormLabel>Marriage Location</FormLabel>
      <EditableLocationTrigger
        title='Edit Marriage Location'
        value={couple.marriageLocation || ''}
        onSubmit={handleSubmit}
        loading={fetching}
        error={error}
      />
    </FormControl>
  )
}
