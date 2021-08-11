import { Text } from '@chakra-ui/react'

import {
  Bar,
  Cell,
  XAxis,
  LabelList,
  BarChart,
  ResponsiveContainer
} from 'recharts'

import { useQuery } from 'urql'
import { INSIGHTS_BY_AGE } from 'graphql/queries/insights'

import Loading from 'components/_common/Loading'

export default function AgeInsight () {
  const [result] = useQuery({ query: INSIGHTS_BY_AGE })

  if (result.fetching) return <Loading />

  return (
    <>
      <ResponsiveContainer>
        <BarChart data={result.data.insightsByAge.data}>
          <XAxis dataKey='ages' height={100} angle={-290} tickMargin={25} tickSize={0} interval={0} />
          <Bar dataKey='count' fill='#ffffff'>
            {result.data.insightsByAge.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`hsla(${index * 30}, 100%, 40%, 1)`} />
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
