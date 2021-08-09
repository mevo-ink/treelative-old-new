import {
  Text,
  Wrap,
  Image,
  WrapItem
} from '@chakra-ui/react'

import {
  Pie,
  Cell,
  PieChart,
  Legend,
  ResponsiveContainer
} from 'recharts'

import { useQuery } from 'urql'
import { INSIGHTS_BY_LOCATION } from 'graphql/queries/insights'

import Loading from 'components/_common/Loading'

const COLORS = ['#F56565', '#ECC94B', '#48BB78', '#4299E1', '#A0AEC0', '#38B2AC', '#9F7AEA', '#000000']

const baseURL = ' https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/'

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, country, count, code }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  if (code) {
    return (
      <svg x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'}>
        <image href={baseURL + code.toLowerCase() + '.svg'} width='20' height='20' />
      </svg>
    )
  } else {
    return (
      <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
        others
      </text>
    )
  }
}

const renderLegend = (props) => {
  const { payload } = props

  return (
    <Wrap spacing='4' justify='center'>
      {
        payload.map((entry, index) => (entry.payload.code &&
          <WrapItem key={`item-${index}`}>
            <Image src={baseURL + entry.payload.code?.toLowerCase() + '.svg'} width='20px' height='20px' mr='1' />
            <Text>{(entry.payload.percent * 100).toFixed(0)}%</Text>
          </WrapItem>
        ))
      }
    </Wrap>
  )
}

export default function CountryInsight () {
  const [result] = useQuery({ query: INSIGHTS_BY_LOCATION })

  if (result.fetching) return <Loading />

  return (
    <>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={result.data.insightsByLocation.data}
            cx='50%'
            cy='50%'
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            dataKey='count'
          >
            {result.data.insightsByLocation.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign='top' layout='vertical' content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
      <Text
        mt='-1.6rem'
        fontSize='.8rem'
        textAlign='end'
        opacity='.5'
      >
        Users without data: {result.data.insightsByLocation.unknownCount}
      </Text>
    </>
  )
}
