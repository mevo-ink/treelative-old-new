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

import { useGetCountryInsights } from 'graphql/client/queries/insights'
import { useGetUsersByCountry } from 'graphql/client/queries/users'

import Loading from 'components/_common/Loading'
import UsersMoreInfo from 'components/Menu/Insights/UsersMoreInfo'

export default function CountryInsight () {
  const { data, isFetching } = useGetCountryInsights()

  const [activeIndex, setActiveIndex] = useState(0)

  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false)

  if (isFetching) return <Loading />

  return (
    <>
      {isMoreInfoOpen && (
        <UsersMoreInfo
          title={`Country ${isMoreInfoOpen}`}
          queryHook={useGetUsersByCountry}
          variables={{ country: isMoreInfoOpen }}
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
        <BarChart data={data.countries}>
          <XAxis dataKey='country' height={100} angle={290} tickMargin={40} tickSize={0} interval={0} />
          <Bar dataKey='count' fill='#ffffff'>
            {data.countries.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                cursor='pointer'
                fill={index === activeIndex ? `hsla(${index * 30}, 100%, 60%, 1)` : `hsla(${index * 30}, 100%, 40%, 1)`}
                onClick={() => setIsMoreInfoOpen(entry.country)}
                onMouseOver={() => setActiveIndex(index)}
              />
            ))}
            <LabelList
              dataKey='count'
              position='top'
              fill='#fff'
              marginTop={55}
              fontWeight='bold'
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
