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

import { useQuery } from 'react-query'
import { getAgeInsights } from 'graphql/client/queries/insights'
import { getUsersByAgeRange } from 'graphql/client/queries/users'

import Loading from 'components/_common/Loading'
import UsersMoreInfo from 'components/Menu/Insights/UsersMoreInfo'

export default function AgeInsight () {
  const { data, isLoading } = useQuery('getAgeInsights', getAgeInsights)

  const [activeIndex, setActiveIndex] = useState(0)

  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false)

  if (isLoading) return <Loading />

  return (
    <>
      {isMoreInfoOpen && (
        <UsersMoreInfo
          title={`Ages ${isMoreInfoOpen}`}
          queryFn={getUsersByAgeRange}
          variables={{ ageRange: isMoreInfoOpen }}
          onClose={() => setIsMoreInfoOpen(null)}
        />
      )}
      <Text
        mt='-1.6rem'
        fontSize='.8rem'
        textAlign='end'
      >
        Users without data: {data.unknownCount}
      </Text>
      <ResponsiveContainer>
        <BarChart data={data.ages}>
          <XAxis dataKey='ageRange' height={100} angle={290} tickMargin={25} tickSize={0} interval={0} />
          <Bar dataKey='count' fill='#ffffff'>
            {data.ages.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                cursor='pointer'
                fill={index === activeIndex ? `hsla(${index * 30}, 100%, 60%, 1)` : `hsla(${index * 30}, 100%, 40%, 1)`}
                onClick={() => setIsMoreInfoOpen(entry.ageRange)}
                onMouseOver={() => setActiveIndex(index)}
              />
            ))}
            <LabelList
              dataKey='count'
              position='top'
              fill='#fff'
              fontWeight='bold'
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
