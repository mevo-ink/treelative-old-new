import { useRouter } from 'next/router'

export default function Home(props) {
  const router = useRouter()
  const { userID } = router.query

  console.log(userID)
  return (
    <div>ADAS</div>
  )
}