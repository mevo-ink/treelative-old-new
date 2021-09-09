import { useRouter } from 'next/router'

import { useEffect } from 'react'

import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { getBirthdayData } from 'graphql/server/resolvers/queries/layouts/getBirthdayData'
import { getBirthdayData as getBirthdayDataQueryFn } from 'graphql/client/queries/layouts'

import { useRecoilValue } from 'recoil'
import { activeNodePulseIDAtom } from 'utils/atoms.js'

import Image from 'next/image'
import Wrapper from 'components/Wrapper'
import ErrorModal from 'components/_common/ErrorModal'
import ActivePulse from 'components/_common/ActivePulse'

import {
  Box,
  Flex,
  Text,
  Divider
} from '@chakra-ui/react'

import blurImagePlaceholder from 'utils/blurImagePlaceholder'

export async function getServerSideProps () {
  // pre-fetch the layout data
  const queryClient = new QueryClient()
  const birthdayData = await getBirthdayData()
  queryClient.setQueryData('getBirthdayData', birthdayData)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default function Birthday () {
  const router = useRouter()

  const { data, error } = useQuery('getBirthdayData', getBirthdayDataQueryFn)

  const activeNodePulseID = useRecoilValue(activeNodePulseIDAtom)

  useEffect(() => {
    if (error) return
    // find the next upcoming birthday
    if (Object.keys(data.birthdays).length > 0) {
      const date = new Date()
      const upcomingBirthDayMonth = Object.keys(data.birthdays)
        .find(birthDateMonth => {
          const [birthDate, birthMonth] = birthDateMonth.split('-')
          const birthDay = new Date(`${birthDate}-${birthMonth}-${date.getFullYear()}`)
          return birthDay >= date
        })
      if (upcomingBirthDayMonth) {
        const upcomingBirthDate = document.getElementById(upcomingBirthDayMonth)
        upcomingBirthDate.style.background = 'hsla(100, 100%, 25%, 1)'
        upcomingBirthDate.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
    // eslint-disable-next-line
  }, [])

  if (error) return <ErrorModal icon title='Oops!' message={error.message} />

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <Wrapper>
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
        {Object.entries(data.birthdays).map(([dayMonth, users]) => {
          // convert dob to proper date
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
                {months[parseInt(dayMonth.slice(0, 2), 10) - 1]} <br /> {dayMonth.substring(3)}
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
                      placeholder='blur'
                      blurDataURL={blurImagePlaceholder(40, 40)}
                      onClick={() => router.push(`?userID=${user.id}`, `/users/${user.id}`, { shallow: true, scroll: false })}
                    />
                    <style jsx global>
                      {`
                      .avatar {
                        border-radius: 50%;
                      }
                    `}
                    </style>
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
          Users without data: {data.unknownCount}
        </Text>
      </Flex>
    </Wrapper>
  )
}
