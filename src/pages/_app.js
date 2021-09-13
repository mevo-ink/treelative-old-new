import 'styles.css'

import { useEffect, useState } from 'react'

import Head from 'next/head'

import { ChakraProvider } from '@chakra-ui/react'
import theme from 'utils/theme'

import { RecoilRoot } from 'recoil'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

import { messaging } from 'utils/firebaseApp'
import initFirebaseCloudMessaging from 'utils/webPush'

export default function App ({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false
      }
    }
  }))

  const setToken = async () => {
    const token = await initFirebaseCloudMessaging()
    if (token) {
      messaging.onMessage((message) => console.log('foreground', message))
    }
  }

  useEffect(() => {
    // set language
    document.documentElement.lang = 'en-us'

    // add event listener on resize to handle mobile navbar issue
    document.querySelector(':root').style.setProperty('--vh', window.innerHeight / 100 + 'px')
    const resize = window.addEventListener('resize', () => {
      document.querySelector(':root').style.setProperty('--vh', window.innerHeight / 100 + 'px')
    })

    // init firebase cloud messaging
    setToken()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Treelative</title>
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
        <meta property='og:image' content='/logo512.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='hsla(225, 36%, 4%, 1)' />
        <meta name='description' content='Family Tree Visualization' />
        <link rel='apple-touch-icon' href='/logo192.png' />
        <link href='https://fonts.googleapis.com/css2?family=Lato&display=swap' rel='stylesheet' />
      </Head>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <RecoilRoot>
              <Component {...pageProps} />
            </RecoilRoot>
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </>

  )
}

// TODO:
/*
  Investigate firebase cloud notifications

  Add find me ring indicator graph view - version 2.1 - if server side canvas rendering is a success !

  MAKE YouTube VIDEO OF how to / intro

  LOGIN PROCESS - OAUTH
     - If the user chooses to create a new user, create a new profile with the email: remove the unverified flag after manual verification
*/
