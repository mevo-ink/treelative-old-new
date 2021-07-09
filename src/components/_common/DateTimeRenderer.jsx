import { Text } from '@chakra-ui/react'

import { format } from 'date-fns'

export default function DateTimeRenderer ({ value, type = 'time', ...props }) {
  const dt = new Date(value)
  const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)
  return (
    <Text {...props}>
      {value ? (type === 'time' ? format(dt, 'PPpp') : format(dtDateOnly, 'PP')) : 'N/A'}
    </Text>
  )
}
