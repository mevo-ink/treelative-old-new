import { useState } from 'react'

import {
  Box,
  Icon,
  Grid,
  Flex,
  Text,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { BiWorld } from 'react-icons/bi'
import { SiApollographql } from 'react-icons/si'

import { useQuery } from 'react-query'
import { countUsers } from 'graphql/client/queries/insights'
import { whoAmI } from 'graphql/client/queries/auth'

import InsightModal from 'components/Menu/Insights/InsightModal'
import UnverifiedUsers from './Insights/UnverifiedUsers'

export default function Insights () {
  const { data: usersCount } = useQuery('countUsers', countUsers)

  const { data: authUser } = useQuery('whoAmI', whoAmI)

  const [openInsight, setOpenInsight] = useState(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const data = [
    { title: 'Members', description: 'Overview', value: usersCount || 0 },
    { title: 'Country', description: 'Country Distribution', value: <Icon as={BiWorld} h='30px' /> },
    { title: 'Age', description: 'Age Distribution', value: <Icon as={SiApollographql} h='30px' /> }
  ]

  const handleClick = (insight) => {
    setOpenInsight(insight)
    onOpen()
  }
  return (
    <>
      {isOpen && openInsight && <InsightModal onClose={onClose} insight={openInsight} />}
      <Box>
        <Text mb='.5rem' opacity='.8'>
          Insights
        </Text>
        <Flex w='100%'>
          {authUser?.isAdmin && <UnverifiedUsers />}
          {data.map((insight, idx) => (
            <Grid
              key={idx}
              as={Button}
              bg='hsla(0, 0%, 100%, .3)'
              borderRadius='10px'
              p='.5em'
              mr='.5rem'
              w='4rem'
              h='4rem'
              _hover={{ border: '1px solid white' }}
              onClick={() => handleClick(insight)}
            >
              <Text fontSize='10px'>{insight.title}</Text>
              <Text fontSize='25px' fontWeight='600'>{insight.value}</Text>
            </Grid>
          ))}
        </Flex>
      </Box>
    </>
  )
}
