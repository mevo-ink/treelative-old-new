import {
  Pie,
  Cell,
  PieChart,
  ResponsiveContainer
} from 'recharts'

import { useQuery } from 'urql'
import { INSIGHTS_BY_LOCATION } from 'graphql/queries/insights'

import Loading from 'components/_common/Loading'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const baseURL = ' https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/'

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, country, count, code }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <svg x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'}>
      {code !== undefined && <image href={baseURL + code.toLowerCase() + '.svg'} width='20' height='20' />}
    </svg>
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
          outerRadius={150}
          dataKey='count'
        >
          {result.data.insightsByLocation.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} outline='red' />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
