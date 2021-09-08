import { useRouter } from 'next/router'

import { Text, Box, Image, Button } from '@chakra-ui/react'

export default function Layouts ({ onClose }) {
  const router = useRouter()

  const iconsAndNames = [
    { icon: '/images/graphView.png', name: 'graph' },
    { icon: '/images/mapView.png', name: 'map' },
    { icon: '/images/ageView.png', name: 'age' },
    { icon: '/images/birthdayView.png', name: 'birthday' }
  ]

  const handleLayoutChange = (layout) => {
    router.push(`/layouts/${layout}`)
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
            border={router.pathname.endsWith(iconAndName.name) ? '1px solid white' : ''}
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
