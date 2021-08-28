import { useEffect } from 'react'

import {
  Box,
  Flex,
  Text,
  Divider
} from '@chakra-ui/react'

import Image from 'next/image'

import { useQuery } from 'urql'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { GET_BIRTHDAY_DATA } from 'graphql/queries/layouts'
import { activeNodeIDAtom, layoutMethodsAtom, activeNodePulseIDAtom } from 'utils/atoms.js'

import Loading from 'components/Loading'
import ErrorModal from 'components/_common/ErrorModal'
import ActivePulse from 'components/_common/ActivePulse'

export default function Birthday () {
  const setLayoutMethods = useSetRecoilState(layoutMethodsAtom)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result, refetch] = useQuery({ query: GET_BIRTHDAY_DATA })

  const activeNodePulseID = useRecoilValue(activeNodePulseIDAtom)

  useEffect(() => {
    if (!result.data) return
    setLayoutMethods({
      refetch: () => {
        refetch({ requestPolicy: 'network-only' })
      }
    })
    if (Object.keys(result.data?.getBirthdayData.data).length > 0) {
      const date = new Date()
      while (!result.data?.getBirthdayData.data[parseInt(date.toISOString().slice(5, 10).replace('-', ''))]) {
        date.setDate(date.getDate() + 1)
      }
      const upcomingBirthDate = document.getElementById(parseInt(date.toISOString().slice(5, 10).replace('-', '')))
      upcomingBirthDate.style.background = 'hsla(100, 100%, 35%, 1)'
      upcomingBirthDate.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    // eslint-disable-next-line
  }, [result.data])

  if (result.error) return <ErrorModal icon title='Oops!' message={result.error.message} />

  if (result.fetching) return <Loading />

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <Flex
      id='container'
      h='100vh'
      pb='2.5rem'
      flexDirection='column'
      overflowY='scroll !important'
      overflowX='hidden'
      bg='hsla(0, 0%, 0%, .75)'
      sx={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
    >
      {Object.entries(result.data.getBirthdayData.data).map(([dayMonth, users]) => {
        // convert dob to proper date
        const dob = dayMonth.padStart(4, '0')
        return (
          <Flex
            key={dayMonth}
            alignItems='center'
            position='relative'
          >
            <Box
              w='11px'
              h='11px'
              position='absolute'
              left='4.2rem'
              bg='hsla(0, 0%, 100%, .7)'
              borderRadius='50%'
            />
            <Text
              id={dayMonth}
              w='6ch'
              px='.5em'
              color='hsla(0, 0%, 100%, .9)'
              bg='hsla(343, 100%, 40%, 1)'
              fontWeight='600'
              borderRadius='0 5px 5px 0'
              textAlign='center'
              boxShadow='1px 3px 5px hsla(0, 0%, 0%, .5)'
            >
              {months[parseInt(dob.slice(0, 2), 10) - 1]} <br /> {dob.substring(2)}
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
                <Flex key={user.id} position='relative' boxSize='40px' my='3' mx='.5rem'>
                  <Image
                    src={user.avatar}
                    layout='fill'
                    objectFit='contain'
                    className='avatar'
                    onClick={() => setActiveNodeID(user.id)}
                  />
                  <style jsx global>
                    {`
                    .avatar {
                      border-radius: 50%;
                    }
                  `}
                  </style>
                  {/* <Box
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
                  onClick={() => setActiveNodeID(user.id)}
                /> */}
                  {user.id === activeNodePulseID && <ActivePulse />}
                  <Text
                    w='20px'
                    h='20px'
                    display='grid'
                    placeItems='center'
                    position='absolute'
                    top='-7px'
                    right='-3px'
                    zIndex='5'
                    fontSize='12px'
                    bg='hsla(310, 100%, 40%, 1)'
                    borderRadius='50%'
                    boxShadow='0px 3px 5px hsla(0, 0%, 0%, .8)'
                  >
                    {user.age}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        )
      })}
      <Text
        py='1em'
        textAlign='center'
        opacity='.5'
      >
        Users without data: {result.data.getBirthdayData.unknownCount}
      </Text>
    </Flex>
  )
}
