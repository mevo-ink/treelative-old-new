import { useState } from 'react'

import {
  Box,
  Text,
  Wrap,
  Image,
  WrapItem
} from '@chakra-ui/react'

import {
  Pie,
  Cell,
  Legend,
  Tooltip,
  PieChart,
  ResponsiveContainer
} from 'recharts'

import { useQuery } from 'urql'
import { INSIGHTS_BY_LOCATION } from 'graphql/queries/insights'
import { GET_USERS_BY_COUNTRY } from 'graphql/queries/users'

import Loading from 'components/_common/Loading'

import UsersMoreInfo from 'components/Menu/Insights/UsersMoreInfo'

const baseURL = ' https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/'

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, country, count, code }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  if (code) {
    return (
      <svg x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'}>
        <image href={baseURL + code.toLowerCase() + '.svg'} width='20' height='20' style={{ pointerEvents: 'none' }} />
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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const country = payload[0].payload.country
    return (
      <Box
        p='2'
        color='white'
        borderRadius='20px'
        background='hsla(225, 36%, 4%, 0.6)'
      >
        <Text>{country}</Text>
      </Box>
    )
  }
  return null
}

export default function CountryInsight () {
  const [activeIndex, setActiveIndex] = useState(0)

  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false)

  const [result] = useQuery({ query: INSIGHTS_BY_LOCATION })

  if (result.fetching) return <Loading />

  const renderLegend = (props) => {
    const { payload } = props

    return (
      <>
        <Wrap spacing='4' justify='center'>
          {
            payload.map((entry, index) => (entry.payload.code &&
              <WrapItem key={`item-${index}`}>
                <img
                  src={baseURL + entry.payload.code?.toLowerCase() + '.svg'}
                  alt={entry.payload.code?.toLowerCase()}
                  style={{ width: '20px', height: '20px', marginRight: '.3rem' }}
                />
                <Text>{(entry.payload.percent * 100).toFixed(0)}%</Text>
              </WrapItem>
            ))
          }
        </Wrap>
        <Text
          mt='1rem'
          fontSize='.8rem'
          textAlign='end'
          opacity='.5'
        >
          Users without data: {result.data.insightsByLocation.unknownCount}
        </Text>
      </>
    )
  }

  return (
    <>
      {isMoreInfoOpen && (
        <UsersMoreInfo
          title={`${isMoreInfoOpen}`}
          query={GET_USERS_BY_COUNTRY}
          variables={{ country: isMoreInfoOpen }}
          onClose={() => setIsMoreInfoOpen(null)}
        />
      )}
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={result.data.insightsByLocation.data}
            cx='50%'
            cy='50%'
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={145}
            dataKey='count'
          >
            {result.data.insightsByLocation.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                cursor='pointer'
                fill={index === activeIndex ? `hsla(${index * 40}, 100%, 60%, 1)` : `hsla(${index * 40}, 100%, 40%, 1)`}
                stroke='hsla(225, 36%, 4%, 1)'
                onClick={() => setIsMoreInfoOpen(entry.country)}
                onMouseOver={() => setActiveIndex(index)}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign='bottom' layout='vertical' content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}
