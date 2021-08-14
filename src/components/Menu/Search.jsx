import { useState } from 'react'

import {
  Box,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'

import { useQuery } from 'urql'
import { SEARCH_USERS } from 'graphql/queries/users'

import SearchResult from 'components/Menu/SearchResult'

export default function Search ({ onClose }) {
  const [searchInput, setSearchInput] = useState('')

  const [result] = useQuery({ query: SEARCH_USERS, variables: { query: searchInput }, pause: !searchInput })

  return (
    <Box w='100%'>
      <InputGroup w='100%' h='2rem'>
        <InputRightElement
          h='100%'
          border='none'
          color='hsla(0, 0%, 100%, 1)'
        >
          {!searchInput ? <BsSearch /> : <IoMdClose onClick={() => setSearchInput('')} />}
        </InputRightElement>
        <Input
          h='100%'
          pb='2px'
          color='hsla(0, 0%, 100%, 1)'
          bg='hsla(0, 0%, 100%, .3)'
          border='none'
          borderRadius='999px'
          placeholder='Search'
          value={searchInput}
          _placeholder={{ color: 'hsla(0, 0%, 100%, 1)' }}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </InputGroup>
      {result.data && searchInput && <SearchResult users={result.data?.users} onClose={onClose} isFetching={result.fetching} />}
    </Box>
  )
}
