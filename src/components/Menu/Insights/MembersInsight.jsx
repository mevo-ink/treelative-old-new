import {
  Box,
  Text,
  Stack,
  Flex,
  Divider
} from '@chakra-ui/react'

import { useQuery } from 'urql'

import { COUNT_MEMBERS, COUNT_COUPLES } from 'graphql/client/queries/insights'

export default function MembersInsight () {
  const [resultGetMembers] = useQuery({ query: COUNT_MEMBERS })
  const [resultGetCouples] = useQuery({ query: COUNT_COUPLES })

  const data = [
    { title: 'Members', value: resultGetMembers.data?.countUsers || 0 },
    { title: 'Couples', value: resultGetCouples.data?.countCouples || 0 }
  ]
  // resultGetMembers.data?.countUsers
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
