import 'styles.css'

import { useEffect } from 'react'

import Head from 'next/head'

import { ChakraProvider } from '@chakra-ui/react'
import theme from 'utils/theme'

import { RecoilRoot } from 'recoil'

import useServiceWorker from 'hooks/useServiceWorker'

export default function App ({ Component, pageProps }) {
  useServiceWorker()

  useEffect(() => {
    // set language
    document.documentElement.lang = 'en-us'

    // add event listener on resize to handle mobile navbar issue
    document.querySelector(':root').style.setProperty('--vh', window.innerHeight / 100 + 'px')
    const resize = window.addEventListener('resize', () => {
      document.querySelector(':root').style.setProperty('--vh', window.innerHeight / 100 + 'px')
    })
    return () => {
      window.removeEventListener('resize', resize)
    }
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

// TODO:
/*
  Review Firebase Magic Email - also add phone number login
  Add tooltips for pie and bar charts - for insights - with user avatars that fall under that category
    Add two new queries:
      - Get users by age
      - Get users by country
      - Use these both to show tooltips on charts - avatars
  Add PWA prompt
  Refactor Error Modal
  Add find me ring indicator graph view
  MAKE YouTube VIDEO OF how to / intro
  API
    - mutation to update a user's email - authenticated endpoint - but check for firebase token
    - mutation to create a new user - authenticated endpoint - but check for firebase token
    - loginWIthProvider - 2 different responses
      - without email - We could not find an account associated with the email
      - with email, but unverified - please wait
      - success
  LOGIN PROCESS - OAUTH
   - all users will have unverified flag set to true at the beginning
   - if the user has a profile associated wit the email - continue
   - else:
     - Give the user to choose from existing users with no email associated
     - If the user chooses an existing user, update the profile with the email: remove the unverified flag after manual verification
     - If the user chooses to create a new user, create a new profile with the email: remove the unverified flag after manual verification

  NEXT JS
    - if time- user next js' Image component

  ?? deploy tyo netlify?

  ROUTES:
    /auth
      - /login
      - /verifyEmail
      - /verifyPhoneNumber
    /index - all layouts
    /profile/:id
    /contactUs

  DONE:
    - query to suggest users with no email - unauthenticated endpoint

*/
