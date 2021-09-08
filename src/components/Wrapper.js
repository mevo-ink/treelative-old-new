import { useRouter } from 'next/router'

import Menu from 'components/Menu'
import ProfileCard from 'components/ProfileCard'

export default function Wrapper ({ children }) {
  const router = useRouter()

  const onProfileClose = () => {
    // go back to the previous page
    router.back()
  }

  return (
    <>
      {router.query.userID && <ProfileCard userID={router.query.userID} onClose={onProfileClose} />}
      <Menu />
      {children}
    </>
  )
}
