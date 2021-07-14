import {
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'

export default function Search () {
  return (
    <InputGroup h='2rem' w='78%'>
      <InputRightElement
        h='100%'
        border='none'
        color='hsl(220, 26%, 14%)'
      >
        <BsSearch />
      </InputRightElement>
      <Input
        h='100%'
        pb='2px'
        color='hsl(220, 26%, 14%)'
        bg='hsla(0, 0%, 100%, .5)'
        border='none'
        borderRadius='999px'
        placeholder='Search'
        _placeholder={{ color: 'hsl(220, 26%, 14%)' }}
      />
    </InputGroup>
  )
}
