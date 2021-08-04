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

import { useQuery } from 'urql'

import { COUNT_MEMBERS, COUNT_COUPLES } from 'graphql/queries/insights'

import InsightModal from 'components/InsightModal'

export default function Insights () {
  const [resultGetMembers] = useQuery({ query: COUNT_MEMBERS })
  const [resultGetCouples] = useQuery({ query: COUNT_COUPLES })

  const [openInsight, setOpenInsight] = useState(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const data = [
    { title: 'Members', value: resultGetMembers.data?.countUsers || 0 },
    { title: 'Couples', value: resultGetCouples.data?.countCouples || 0 },
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
