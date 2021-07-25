import { Text } from '@chakra-ui/react'

import { format } from 'date-fns'

export default function DateTimeRenderer ({ value }) {
  const dt = new Date(value)
  const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)
  return (
    <Text type='date' fontSize='.8rem' pb='.8rem' fontWeight='bold'>
      {value && format(dtDateOnly, 'PP')}
    </Text>
  )
}
