import {
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react'

export default function ErrorAlert ({ children }) {
  if (!children) return null
  return (
    <Alert status='error' borderRadius='md' background='hsla(0, 100%, 50%, .3)'>
      <AlertIcon />
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  )
}
