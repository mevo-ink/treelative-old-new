import { Text, Box, Image, Button } from '@chakra-ui/react'

import { useRecoilState } from 'recoil'

import { layoutAtom } from 'utils/atoms.js'

import map from 'images/mapView.png'
import age from 'images/ageView.png'
import network from 'images/graphView.png'
import birthday from 'images/birthdayView.png'

export default function Layouts () {
  const [layout, setLayout] = useRecoilState(layoutAtom)

  const iconsAndNames = [
    { icon: network, name: 'network' },
    { icon: map, name: 'map' },
    { icon: age, name: 'age' },
    { icon: birthday, name: 'birthday' }
  ]

  const handleLayoutChange = async (layout) => {
    await new Promise(resolve => setTimeout(resolve, 110))
    setLayout(layout)
  }

  return (
    <Box>
      <Text mb='.5rem' opacity='.8'>
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
            border={layout === iconAndName.name && '1px solid white'}
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
