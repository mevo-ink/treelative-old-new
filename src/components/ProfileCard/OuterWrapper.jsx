import { Box } from '@chakra-ui/react'

const OuterWrapper = ({ children }) => {
  return (
    <Box
      background='url("/images/profileCardBg.jpg")'
      backgroundSize='cover'
      backgroundPosition='bottom center'
      borderRadius='20px'
      display='grid'
      placeItems='center'
      position='relative'
      overflow='hidden'
      minH='30rem'
    >
      {children}
    </Box>
  )
}

export default OuterWrapper
