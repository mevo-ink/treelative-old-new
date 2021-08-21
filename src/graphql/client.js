import { dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'

const cache = cacheExchange({
  keys: {
    Social: () => null
  }
})

const client = (ssrExchange, ctx) => ({
  url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
  exchanges: [dedupExchange, cache, ssrExchange, fetchExchange],
  fetchOptions: () => {
    const AUTH_SESSION_ID = ctx
      ? ctx?.req?.headers?.AUTH_SESSION_ID
      : window.localStorage.getItem('AUTH_SESSION_ID')
    return {
      headers: { AUTH_SESSION_ID }
    }
  }
})

export default client
