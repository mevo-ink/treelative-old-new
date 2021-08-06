import { useEffect } from 'react'

import {
  Box,
  Flex,
  Text,
  Image,
  Divider
} from '@chakra-ui/react'

import { useQuery } from 'urql'
import { useSetRecoilState, useRecoilState } from 'recoil'

import { GET_BIRTHDAY_DATA } from 'graphql/queries/layouts'
import { activeNodeIDAtom, layoutMethodsAtom, activeNodePulseIDAtom } from 'utils/atoms.js'

import Loading from 'components/Loading'
import ErrorModal from 'components/_common/ErrorModal'
import ActivePulse from 'components/_common/ActivePulse'

export default function Birthday () {
  const setLayoutMethods = useSetRecoilState(layoutMethodsAtom)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result, refetch] = useQuery({ query: GET_BIRTHDAY_DATA })

  const [activeNodePulseID, setActiveNodePulseID] = useRecoilState(activeNodePulseIDAtom)

  useEffect(() => {
    if (!result.data) return
    setLayoutMethods({
      refetch: () => {
        refetch({ requestPolicy: 'network-only' })
      }
    })
    const date = new Date()
    while (!result.data?.getBirthdayData.data[date.toISOString().slice(5, 10)]) {
      date.setDate(date.getDate() + 1)
    }
    const upcomingBirthDate = document.getElementById(date.toISOString().slice(5, 10))
    upcomingBirthDate.style.background = 'hsla(100, 100%, 35%, 1)'
    upcomingBirthDate.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // eslint-disable-next-line
  }, [result.data])

  if (result.error) {
    return (
      <ErrorModal>
        {result.error.message}
      </ErrorModal>
    )
  }

  if (result.fetching) return <Loading />

  const handleUserSelect = (userID) => {
    setActiveNodePulseID(userID)
    setActiveNodeID(userID)
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <Flex
      id='container'
      h='100vh'
      pb='2.5rem'
      flexDirection='column'
      overflowY='scroll'
      overflowX='hidden'
      bg='hsla(0, 0%, 0%, .75)'
      sx={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
    >
      {Object.entries(result.data.getBirthdayData.data).map(([dob, users]) =>
        <Flex
          key={dob}
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
            id={dob}
            w='6ch'
            px='.5em'
            color='hsla(0, 0%, 100%, .9)'
            bg='hsla(343, 100%, 40%, 1)'
            fontWeight='600'
            borderRadius='0 5px 5px 0'
            textAlign='center'
            boxShadow='1px 3px 5px hsla(0, 0%, 0%, .5)'
          >
            {months[parseInt(dob.slice(0, 2) - 1, 10)]} <br /> {dob.substring(3)}
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
                <Image
                  src={user.avatar}
                  fallbackSrc={user.brokenAvatar}
                  alt='children-avatar'
                  w='40px'
                  h='40px'
                  mx='.5rem'
                  my='3'
                  objectFit='contain'
                  borderRadius='50%'
                  zIndex='1'
                  onClick={() => handleUserSelect(user.id)}
                />
                {user.id === activeNodePulseID && <ActivePulse />}
                <Text
                  w='20px'
                  h='20px'
                  display='grid'
                  placeItems='center'
                  position='absolute'
                  top='5px'
                  right='5px'
                  zIndex='1'
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
      )}
    </Flex>
  )
}
