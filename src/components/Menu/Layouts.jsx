import { Text, Box, Button } from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil'
import { layoutAtom } from 'utils/atoms.js'

export default function Layouts ({ onClose }) {
  const setLayout = useSetRecoilState(layoutAtom)

  const handleLayoutChange = (layout) => {
    setLayout(layout)
    onClose()
  }

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
      >
        <Button colorScheme='red' onClick={() => handleLayoutChange('network')}>GRAPH</Button>
        <Button colorScheme='red' onClick={() => handleLayoutChange('map')}>MAP</Button>
        <Button colorScheme='red' onClick={() => handleLayoutChange('age')}>AGE</Button>
      </Box>
    </Box>
  )
}
