import {
  createClient,
  dedupExchange,
  fetchExchange
} from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'

import { simplePagination } from '@urql/exchange-graphcache/extras'

import { devtoolsExchange } from '@urql/devtools'

const cache = cacheExchange({
  keys: {
    Couple: () => null
  },
  resolvers: {
    Query: {
      queryUser: simplePagination()
    }
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
