import { Progress } from '@chakra-ui/react'

export default function Loading () {
  return (
    <Progress
      size='lg'
      isIndeterminate
      bgColor='transparent'
      width='100%'
      borderRadius='md'
    />
  )
}
