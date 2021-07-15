import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react'

import { useQuery } from 'urql'
import { GET_NETWORK_DATA } from 'graphql/queries/networkData'

export default function Insights () {
  const [result] = useQuery({ query: GET_NETWORK_DATA })

  const data = [
    { title: 'Members', value: result.data.getNetworkData.nodes.filter(node => node.group !== 'couple').length },
    { title: 'Couples', value: result.data.getNetworkData.nodes.filter(node => node.group === 'couple').length }
  ]

  console.log(result.data.getNetworkData.nodes.filter(node => node.group !== 'couple'))
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
          >
            <Text fontSize='10px'>{insight.title}</Text>
            <Text fontSize='25px' fontWeight='600' textAlign='center'>{insight.value}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}
