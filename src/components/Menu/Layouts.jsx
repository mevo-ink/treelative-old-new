import { Text, Box, Image, Button } from '@chakra-ui/react'

import { useRecoilState, useSetRecoilState } from 'recoil'

import { layoutAtom, activeNodePulseIDAtom } from 'utils/atoms.js'

export default function Layouts ({ onClose }) {
  const [layout, setLayout] = useRecoilState(layoutAtom)
  const setActiveNodeID = useSetRecoilState(activeNodePulseIDAtom)

  const iconsAndNames = [
    { icon: 'images/graphView.png', name: 'network' },
    { icon: 'images/mapView.png', name: 'map' },
    { icon: 'images/ageView.png', name: 'age' },
    { icon: 'images/birthdayView.png', name: 'birthday' }
  ]

  const handleLayoutChange = async (layout) => {
    onClose()
    setActiveNodeID(null)
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
            h='60px'
            p='0'
            mr='1rem'
            bg='hsla(0, 0%, 100%, .3)'
            borderRadius='10px'
            border={layout === iconAndName.name && '1px solid white'}
            onClick={() => handleLayoutChange(iconAndName.name)}
          >
            <Image
              src={iconAndName.icon}
              alt={iconAndName.name + '-icon'}
              w='100%'
              h='100%'
              p='.5em'
            />
          </Button>
        ))}
      </Box>
    </Box>
  )
}
