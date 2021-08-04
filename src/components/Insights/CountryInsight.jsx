import {
  Pie,
  Cell,
  PieChart,
  ResponsiveContainer
} from 'recharts'

import { useQuery } from 'urql'
import { INSIGHTS_BY_LOCATION } from 'graphql/queries/insights'

import Loading from 'components/Loading'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, country, count }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {country} ({count})
    </text>
  )
}

export default function CountryInsight () {
  const [result] = useQuery({ query: INSIGHTS_BY_LOCATION })

  if (result.fetching) return <Loading />

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={result.data.insightsByLocation}
          cx='50%'
          cy='50%'
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={140}
          dataKey='count'
        >
          {result.data.insightsByLocation.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
