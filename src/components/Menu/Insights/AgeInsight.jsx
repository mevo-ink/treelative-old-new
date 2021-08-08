import { Text } from '@chakra-ui/react'

import {
  Bar,
  Cell,
  XAxis,
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
          <XAxis dataKey='ages' angle={270} tickMargin={30} height={100} interval={0} />
          <Bar dataKey='count' fill='#ffffff' label={{ position: 'top' }}>
            {result.data.insightsByAge.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill='#ffffff' />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Text
        mt='-1.6rem'
        fontSize='.8rem'
        textAlign='end'
        opacity='.5'
      >
        Users without Date of Birth: {result.data.insightsByAge.unknownCount}
      </Text>
    </>
  )
}
