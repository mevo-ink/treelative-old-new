import { useRouter } from 'next/router'

import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { getUserData } from 'graphql/server/resolvers/queries/users/getUser'
import { getSession } from 'utils/auth'

import ProfileCard from 'components/ProfileCard'

export async function getServerSideProps (ctx) {
  // pre-fetch the user data
  const queryClient = new QueryClient()
  const userData = await getUserData(ctx.query.userID)

  if ((!userData || userData.error)) {
    return {
      redirect: {
        permanent: false,
        destination: '/layouts/graph'
      }
    }
  }

  queryClient.setQueryData('getUserData', userData)

  if (!userData.isPublic) {
    // if the user is not public, authenticate
    const session = await getSession(ctx)
    if (session.error) {
      return {
        redirect: {
          permanent: false,
          destination: `/auth/login?userID=${ctx.query.userID}`
        }
      }
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default function Profile () {
  const router = useRouter()

  const onProfileClose = () => {
    router.push('/layouts/graph')
  }

  return (
    <ProfileCard userID={router.query.userID} onClose={onProfileClose} />
  )
}
