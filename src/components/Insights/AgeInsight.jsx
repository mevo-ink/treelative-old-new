import {
  Bar,
  XAxis,
  BarChart,
  ResponsiveContainer
} from 'recharts'

import { useQuery } from 'urql'
import { INSIGHTS_BY_AGE } from 'graphql/queries/insights'

import Loading from 'components/Loading'

export default function AgeInsight () {
  const [result] = useQuery({ query: INSIGHTS_BY_AGE })

  if (result.fetching) return <Loading />

  return (
    <ResponsiveContainer>
      <BarChart w={150} h={40} data={result.data.insightsByAge}>
        <XAxis dataKey='ages' angle={270} tickMargin={30} height={100} interval={0} />
        <Bar dataKey='count' fill='#ffffff' />
      </BarChart>
    </ResponsiveContainer>
  )
}
