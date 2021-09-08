export async function getServerSideProps () {
  return {
    redirect: {
      permanent: false,
      destination: '/layouts/graph'
    }
  }
}

export default function Home () {
  return <h1>boom shaka laka</h1>
}
