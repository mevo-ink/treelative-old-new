import ProfileCardServer from 'components/ProfileCardServer'

import { withUrqlClient } from 'next-urql'
import client from 'graphql/client'

import { GET_USER } from 'graphql/queries/users'

const Profile = ({ userID }) => {
  return <ProfileCardServer userID={userID} />
}

// populate initial data on server
Profile.getInitialProps = async (ctx) => {
  const userID = ctx.query.userID
  await ctx.urqlClient.query(GET_USER, { id: userID }).toPromise()
  return { userID }
}

export default withUrqlClient(client)(Profile)
