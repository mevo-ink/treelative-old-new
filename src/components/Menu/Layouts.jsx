import { Text, Box, Image, Button } from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil'
import { layoutAtom } from 'utils/atoms.js'

import age from 'images/ageView.png'
import map from 'images/mapView.png'
import network from 'images/graphView.png'

export default function Layouts ({ onClose }) {
  const setLayout = useSetRecoilState(layoutAtom)

  const iconsAndNames = [
    { icon: network, name: 'network' },
    { icon: map, name: 'map' },
    { icon: age, name: 'age' }
  ]

  const handleLayoutChange = async (layout) => {
    onClose()
    await new Promise(resolve => setTimeout(resolve, 110))
    setLayout(layout)
  }

  return (
    <Box>
      <Text mb='.5rem' color='hsla(0, 0%, 100%, .8)'>
        Layouts
      </Text>
      <Box w='100%'>
        {iconsAndNames.map((iconAndName, idx) => (
          <Button
            key={idx}
            w='60px'
            h='auto'
            p='0'
            mr='1rem'
            bg='hsla(0, 0%, 100%, .3)'
            borderRadius='10px'
            onClick={() => handleLayoutChange(iconAndName.name)}
          >
            <Image
              src={iconAndName.icon}
              h='100%'
              objectFit='contain'
              p='.5em'
            />
          </Button>
        ))}
      </Box>
    </Box>
  )
}
