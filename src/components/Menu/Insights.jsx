import {
  Box,
  Flex,
  Text,
  Divider
} from '@chakra-ui/react'

export default function Insights () {
  const data = [
    { title: 'Total Members', value: '93' },
    { title: 'Total Couples', value: '37' }
  ]
  return (
    <Box>
      <Text mb='.5rem' opacity='.8'>
        Insights
      </Text>
      <Box
        w='100%'
        p='1em 1.5em'
        bg='hsla(0, 0%, 100%, .3)'
        borderRadius='10px'
      >
        {data.map((insight, idx) => (
          <Box key={idx}>
            <Flex justifyContent='space-between' m='.2rem 0'>
              <Text>{insight.title}</Text>
              <Text>{insight.value}</Text>
            </Flex>
            <Divider w='100%' />
          </Box>
        ))}
        <Text color='hsla(0, 0%, 100%, 1)' textAlign='end' mt='.8rem'>More Coming Soon..</Text>
      </Box>
    </Box>
  )
}
