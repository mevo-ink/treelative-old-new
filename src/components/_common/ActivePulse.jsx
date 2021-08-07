import { Box, keyframes } from '@chakra-ui/react'

export default function ActivePulse ({ mapView }) {
  const pulse = keyframes`
    0% { transform: scale(0.1, 0.1); opacity: 0; }
    50% { opacity: 1;)
    100% { transform: scale(1.5, 1.5); opacity: 0; }
  `
  return (
    <Box
      borderRadius='50%'
      position='absolute'
      left='50%'
      top='50%'
      zIndex='3'
      transform={!mapView && 'translate(-20px, -20px)'}
      _after={{
        content: '""',
        borderRadius: '50%',
        w: '40px',
        h: '40px',
        position: 'absolute',
        animation: `${pulse} 1.5s infinite ease-out`,
        opacity: '0',
        boxShadow: '0 0 1px 10px hsla(100, 98%, 57%, 1)'
      }}
    />
  )
}
