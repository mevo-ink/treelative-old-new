import 'styles.css'

import { useEffect } from 'react'

import Head from 'next/head'

import { ChakraProvider } from '@chakra-ui/react'
import theme from 'utils/theme'

import { RecoilRoot } from 'recoil'

import { withUrqlClient } from 'next-urql'
import client from 'graphql/client'

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    document.documentElement.lang = 'en-us'
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
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
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default withUrqlClient(client)(App)
