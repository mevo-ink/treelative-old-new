// For the search only version
import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch(process.env.ALGOLIA_APP, process.env.ALGOLIA_KEY)
const index = client.initIndex('users')

export default index
