import { useState } from 'react'

import { Text } from '@chakra-ui/react'

import {
  Bar,
  Cell,
  XAxis,
  BarChart,
  LabelList,
  ResponsiveContainer
} from 'recharts'

import { useQuery } from 'urql'
import { INSIGHTS_BY_AGE } from 'graphql/client/queries/insights'
import { GET_USERS_BY_AGES } from 'graphql/client/queries/users'

import Loading from 'components/_common/Loading'

import UsersMoreInfo from 'components/Menu/Insights/UsersMoreInfo'

export default function AgeInsight () {
  const [activeIndex, setActiveIndex] = useState(0)

  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false)

  const [result] = useQuery({ query: INSIGHTS_BY_AGE })

  if (result.fetching) return <Loading />

  return (
    <>
      {isMoreInfoOpen && (
        <UsersMoreInfo
          title={`Age ${isMoreInfoOpen}`}
          query={GET_USERS_BY_AGES}
          variables={{ ages: isMoreInfoOpen }}
          onClose={() => setIsMoreInfoOpen(null)}
        />
      )}
      <ResponsiveContainer>
        <BarChart data={result.data.insightsByAge.data}>
          <XAxis dataKey='ages' height={100} angle={-290} tickMargin={25} tickSize={0} interval={0} />
          <Bar dataKey='count' fill='#ffffff'>
            {result.data.insightsByAge.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                cursor='pointer'
                fill={index === activeIndex ? `hsla(${index * 30}, 100%, 60%, 1)` : `hsla(${index * 30}, 100%, 40%, 1)`}
                onClick={() => setIsMoreInfoOpen(entry.ages)}
                onMouseOver={() => setActiveIndex(index)}
              />
            ))}
            <LabelList
              dataKey='count'
              position='insideTop'
              fill='#000'
              fontWeight='bold'
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Text
        mt='-1.6rem'
        fontSize='.8rem'
        textAlign='end'
        opacity='.5'
      >
        Users without data: {result.data.insightsByAge.unknownCount}
      </Text>
    </>
  )
}
