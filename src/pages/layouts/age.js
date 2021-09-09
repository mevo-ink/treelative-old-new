import { useRouter } from 'next/router'

import {
  Box,
  Flex,
  Icon,
  Text,
  Divider
} from '@chakra-ui/react'
import { FaSkullCrossbones } from 'react-icons/fa'

import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { getAgeData } from 'graphql/server/resolvers/queries/layouts/getAgeData'
import { getAgeData as getAgeDataQueryFn } from 'graphql/client/queries/layouts'

import { useRecoilValue } from 'recoil'
import { activeNodePulseIDAtom } from 'utils/atoms.js'

import Wrapper from 'components/Wrapper'
import ErrorModal from 'components/_common/ErrorModal'
import ActivePulse from 'components/_common/ActivePulse'

export async function getServerSideProps () {
  // pre-fetch the layout data
  const queryClient = new QueryClient()
  const ageData = await getAgeData()
  queryClient.setQueryData('getAgeData', ageData)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default function Age () {
  const router = useRouter()

  const { data, error } = useQuery('getAgeData', getAgeDataQueryFn)

  const activeNodePulseID = useRecoilValue(activeNodePulseIDAtom)

  if (error) return <ErrorModal icon title='Oops!' message={error.message} />

  return (
    <Wrapper>
      <Flex
        h='calc(100 * var(--vh))'
        pb='2.5rem'
        flexDirection='column'
        overflowY='scroll'
        overflowX='hidden'
        bg='hsla(0, 0%, 0%, .75)'
        sx={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
      >
        {Object.entries(data.users).map(([year, users]) =>
          <Flex
            key={year}
            id={year}
            alignItems='center'
            position='relative'
          >
            <Box
              w='11px'
              h='11px'
              position='absolute'
              left='4rem'
              bg='hsla(0, 0%, 100%, .7)'
              borderRadius='50%'
            />
            <Text
              px='.5em'
              color='hsla(0, 0%, 100%, .9)'
              bg='hsla(343, 100%, 40%, 1)'
              fontWeight='600'
              borderRadius='0 5px 5px 0'
              boxShadow='1px 3px 5px hsla(0, 0%, 0%, .5)'
            >
              {year}
            </Text>
            <Divider orientation='vertical' mx='1rem' my='40px' />
            <Flex
              overflowX='scroll'
              sx={{
                '::-webkit-scrollbar': { height: '2px' },
                '::-webkit-scrollbar-thumb': { background: 'hsla(343, 100%, 40%, 1)' }
              }}
            >
              {users.map(user => (
                <Flex key={user.id} position='relative'>
                  <Box
                    w='40px'
                    h='40px'
                    mx='.5rem'
                    my='3'
                    objectFit='contain'
                    borderRadius='50%'
                    zIndex='4'
                    backgroundImage={user.avatar}
                    backgroundSize='100% auto'
                    backgroundPosition='center'
                    onClick={() => router.push(`?userID=${user.id}`, `/users/${user.id}`, { shallow: true, scroll: false })}
                  />
                  {user.id === activeNodePulseID && <ActivePulse />}
                  {user.dateOfDeath && (
                    <Icon
                      as={FaSkullCrossbones}
                      w='20px'
                      h='20px'
                      p='2px'
                      position='absolute'
                      top='5px'
                      right='5px'
                      zIndex='5'
                      color='hsla(0, 0%, 0%, 1)'
                      bg='hsla(0, 0%, 100%, 1)'
                      borderRadius='50%'
                      boxShadow='0px 3px 5px hsla(0, 0%, 0%, .8)'
                    />
                  )}
                </Flex>
              ))}
            </Flex>
          </Flex>
        )}
        <Text
          py='1em'
          textAlign='center'
          opacity='.5'
        >
          Users without data: {data.unknownCount}
        </Text>
      </Flex>
    </Wrapper>
  )
}
