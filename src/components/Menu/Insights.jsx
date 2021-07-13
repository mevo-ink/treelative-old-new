import { Text, Box } from '@chakra-ui/react'

export default function Insights () {
  return (
    <Box>
      <Text
        fontSize='1.3rem'
        mb='.5rem'
        color='hsla(0, 0%, 100%, .95)'
      >
        Insights
      </Text>
      <Box
        w='100%'
        h='150px'
        bg='hsla(0, 0%, 100%, .95)'
        borderRadius='10px'
      />
    </Box>
  )
}
