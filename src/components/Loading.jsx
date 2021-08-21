import { Box, Icon, keyframes } from '@chakra-ui/react'

const dotOne = keyframes`
  20% {transform: scale(1)}
  45% {transform: translate(16px, 12px) scale(.45)}
  60% {transform: translate(80px, 60px) scale(.45)}
  80% {transform: translate(80px, 60px) scale(.45)}
  100% {transform: translateY(0px) scale(1)}
`

const dotTwo = keyframes`
  20% {transform: scale(1)}
  45% {transform: translate(-16px, 12px) scale(.45)}
  60% {transform: translate(-80px, 60px) scale(.45)}
  80% {transform: translate(-80px, 60px) scale(.45)}
  100% {transform: translateY(0px) scale(1)}
`

const dotThree = keyframes`
  20% {transform: scale(1)}
  45% {transform: translateY(-18px) scale(.45)}
  60% {transform: translateY(-90px) scale(.45)}
  80% {transform: translateY(-90px) scale(.45)}
  100% {transform: translateY(0px) scale(1)}
`

const rotate = keyframes`
  55% {transform: translate(-50%, -50%) rotate(0deg)}
  80% {transform: translate(-50%, -50%) rotate(360deg)}
  100% {transform: translate(-50%, -50%) rotate(360deg)}
`

const dotStyle = {
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  backgroundColor: '#000',
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  margin: 'auto'
}

export default function Loading () {
  return (
    <Box
      w='100%'
      h='100%'
      position='absolute'
      bg='hsla(0, 0%, 0%, .5)'
      zIndex='1500'
    >
      <Box
        w='200px'
        h='200px'
        position='absolute'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        m='auto'
        filter="url('#goo')"
        animation={`${rotate} 2s ease-in-out infinite`}
      >
        <Box
          {...dotStyle}
          bg='white'
          animation={`${dotOne} 2s ease infinite, index 6s -2s ease infinite`}
        />
        <Box
          {...dotStyle}
          bg='white'
          animation={`${dotTwo} 2s ease infinite, index 6s -4s ease infinite`}
        />
        <Box
          {...dotStyle}
          bg='white'
          animation={`${dotThree} 2s ease infinite, index 6s ease infinite`}
        />
      </Box>
      <Icon xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <defs>
          <filter id='goo'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='10' result='blur' />
            <feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7' />
          </filter>
        </defs>
      </Icon>
    </Box>
  )
}
