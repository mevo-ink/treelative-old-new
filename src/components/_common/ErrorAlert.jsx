import {
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react'

export default function ErrorAlert ({ children }) {
  return (
    <Alert status='error' borderRadius='lg'>
      <AlertIcon />
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  )
}
