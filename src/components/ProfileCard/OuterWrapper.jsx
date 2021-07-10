import { Box } from '@chakra-ui/react'

import bg from 'images/profileCardBg.jpg'

const OuterWrapper = ({ children }) => (
  <Box
    w='100vw'
    minH='600px'
    background={`url(${bg})`}
    backgroundSize='cover'
    backgroundPosition='bottom center'
    borderRadius='20px'
    display='grid'
    placeItems='center'
    overflow='hidden'
    position='relative'
  >
    {children}
  </Box>
)

export default OuterWrapper
