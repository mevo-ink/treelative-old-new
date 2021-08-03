import {
  createClient,
  dedupExchange,
  fetchExchange
} from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'

import { devtoolsExchange } from '@urql/devtools'

const cache = cacheExchange({
  keys: {
    Social: () => null
  }
})

export default createClient({
  url: process.env.REACT_APP_GRAPHQL_URL,
  exchanges: [devtoolsExchange, dedupExchange, cache, fetchExchange],
  fetchOptions: () => {
    const AUTH_SESSION_ID = window.localStorage.getItem('AUTH_SESSION_ID') || null
    return {
      headers: { AUTH_SESSION_ID }
    }
  }
})
