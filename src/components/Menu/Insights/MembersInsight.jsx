import {
  Box,
  Text,
  Stack,
  Flex,
  Divider
} from '@chakra-ui/react'

import { useCountUsers, useCountCouples } from 'graphql/client/queries/insights'

export default function MembersInsight () {
  const { data: usersCount } = useCountUsers()
  const { data: couplesCount } = useCountCouples()

  const data = [
    { title: 'Members', value: usersCount || 0 },
    { title: 'Couples', value: couplesCount || 0 }
  ]

  return (
    <Stack>
      <Divider />
      {data.map((insight, idx) => (
        <Box key={idx}>
          <Flex key={idx} w='100%' justifyContent='space-between'>
            <Text>{insight.title}</Text>
            <Text mb='.5rem'>{insight.value}</Text>
          </Flex>
          <Divider />
        </Box>
      ))}
    </Stack>
  )
}
