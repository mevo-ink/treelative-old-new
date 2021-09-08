import { useRouter } from 'next/router'

import ProfileCard from 'components/ProfileCard'

export default function Profile () {
  const router = useRouter()

  const onProfileClose = () => {
    router.push('/')
  }

  return (
    <ProfileCard userID={router.query.userID} onClose={onProfileClose} />
  )
}

// // populate initial data on server
// Profile.getInitialProps = async (ctx) => {
//   const userID = ctx.query.userID
//   await ctx.urqlClient.query(GET_USER, { id: userID }).toPromise()
//   return { userID }
// }
