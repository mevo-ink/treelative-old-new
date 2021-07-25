import { Box, keyframes } from '@chakra-ui/react'

export default function ActivePulse () {
  const pulse = keyframes`
    0% { transform: scale(0.1, 0.1); opacity: 1; }
    50% { opacity: 1;)
    100% { transform: scale(1.5, 1.5); opacity: 1; }
  `
  return (
    <Box
      borderRadius='50%'
      position='absolute'
      left='50%'
      top='50%'
      zIndex='0'
      transform='translate(-20px, -20px)'
      _after={{
        content: '""',
        borderRadius: '50%',
        w: '40px',
        h: '40px',
        position: 'absolute',
        animation: `${pulse} 1.5s infinite ease-out`,
        opacity: '0',
        boxShadow: '0 0 1px 8px hsla(100, 98%, 57%, 1)'
      }}
    />
  )
}
