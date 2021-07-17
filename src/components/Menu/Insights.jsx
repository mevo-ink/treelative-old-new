import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react'

import { useQuery } from 'urql'
import { GET_INSIGHTS } from 'graphql/queries/insights'

export default function Insights () {
  const [result] = useQuery({ query: GET_INSIGHTS })

  const data = [
    { title: 'Members', value: result.data?.getInsights.users || 0 },
    { title: 'Couples', value: result.data?.getInsights.couples || 0 }
  ]

  return (
    <Box>
      <Text mb='.5rem' opacity='.8'>
        Insights
      </Text>
      <Flex w='100%'>
        {data.map((insight, idx) => (
          <Box
            key={idx}
            bg='hsla(0, 0%, 100%, .3)'
            borderRadius='10px'
            p='.5em'
            mr='.5rem'
            w='4rem'
          >
            <Text fontSize='10px'>{insight.title}</Text>
            <Text fontSize='25px' fontWeight='600' textAlign='center'>{insight.value}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}
