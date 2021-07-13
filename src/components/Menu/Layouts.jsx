import { Text, Box } from '@chakra-ui/react'

export default function Layouts () {
  return (
    <Box>
      <Text
        fontSize='1.3rem'
        mb='.5rem'
        color='hsla(0, 0%, 100%, .95)'
      >
        Layouts
      </Text>
      <Box
        w='100%'
        h='75px'
        bg='hsla(0, 0%, 100%, .95)'
        borderRadius='10px'
        boxShadow='inset 0 0px 5px #000000'
      />
    </Box>
  )
}
