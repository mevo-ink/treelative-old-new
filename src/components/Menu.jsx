import { useState } from 'react'

import {
  Box,
  Flex,
  IconButton
} from '@chakra-ui/react'

import { FaGripLines } from 'react-icons/fa'

import Search from 'components/Menu/Search'
import Layouts from 'components/Menu/Layouts'
import Insights from 'components/Menu/Insights'

export default function Menu () {
  const [showMenu, setShowMenu] = useState(true)
  return (
    <Flex
      w='100vw'
      h='100vh'
      justifyContent='center'
      position='absolute'
      top='0'
      zIndex='1'
      pointerEvents={!showMenu && 'none'}
    >
      <Box
        w='100%'
        h='100%'
        bg={showMenu && 'hsla(0, 0%, 0%, .5)'}
        onClick={() => setShowMenu(!showMenu)}
      />
      <Box
        w='100%'
        maxW='500px'
        position='absolute'
        zIndex='2'
        bottom='0'
        borderRadius='20px'
        border='hsla(0, 0%, 100%, 1) solid 2px'
        color='white'
        background='hsla(225, 36%, 4%, 1)'
        overflow='hidden'
        transform={!showMenu && 'translateY(calc(100% - 30px))'}
      >
        <IconButton
          icon={<FaGripLines />}
          w='100%'
          h='30px'
          bg='transparent'
          borderRadius='20px 20px 0 0'
          pointerEvents='all'
          onClick={() => setShowMenu(!showMenu)}
        >
          =
        </IconButton>
        <Box p='1em 1.5em'>
          <Search />
          <Layouts />
          <Insights />
        </Box>
      </Box>
    </Flex>
  )
}
