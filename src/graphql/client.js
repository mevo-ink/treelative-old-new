import { dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'

const cache = cacheExchange({
  keys: {
    Social: () => null
  }
})

const client = ssrExchange => ({
  url: '/api/graphql',
  exchanges: [dedupExchange, cache, ssrExchange, fetchExchange],
  fetchOptions: () => {
    const isServerSide = typeof window === 'undefined'
    const AUTH_SESSION_ID = (!isServerSide && window.localStorage.getItem('AUTH_SESSION_ID')) || null
    return {
      headers: { AUTH_SESSION_ID }
    }
  }
})

export default client
