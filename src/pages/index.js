import Layouts from 'components/Layouts'
import Menu from 'components/Menu'

import { useRecoilValue } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import ProfileCard from 'components/ProfileCard'

import { withUrqlClient } from 'next-urql'
import client from 'graphql/client/client'

import {
  GET_NETWORK_DATA,
  GET_MAP_DATA,
  GET_AGE_DATA,
  GET_BIRTHDAY_DATA
} from 'graphql/client/queries/layouts'

import Cookies from 'cookies'
import cookieCutter from 'cookie-cutter'

import useServiceWorker from 'hooks/useServiceWorker'

const Home = ({ layout }) => {
  useServiceWorker()

  const activeNodeID = useRecoilValue(activeNodeIDAtom)

  return (
    <>
      {activeNodeID && <ProfileCard />}
      <Menu />
      <Layouts layout={layout} />
    </>
  )
}

// populate initial data on server
Home.getInitialProps = async (ctx) => {
  const cookies = ctx.req ? new Cookies(ctx.req, ctx.res) : cookieCutter
  const layout = cookies.get('layout') || 'network'

  switch (layout) {
    case 'map':
      await ctx.urqlClient.query(GET_MAP_DATA).toPromise()
      break
    case 'age':
      await ctx.urqlClient.query(GET_AGE_DATA).toPromise()
      break
    case 'birthday':
      await ctx.urqlClient.query(GET_BIRTHDAY_DATA).toPromise()
      break
    default:
      await ctx.urqlClient.query(GET_NETWORK_DATA).toPromise()
      break
  }

  return { layout }
}

export default withUrqlClient(client)(Home)
