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

  Add PWA prompt

  Investigate firebase cloud notifications

  Refactor Error Modal

  Add find me ring indicator graph view

  MAKE YouTube VIDEO OF how to / intro

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
       suggestNewUsers (query: "vara")
    - mutation to update a user's email - authenticated endpoint by checking for firebase token
       connectUserEmail(userID: "asd" email: "ad" token:"ad")
    - mutation to create a new user and link with email ^ same as above, send empty userID
      connectUserEmail(email: "ad" token:"ad")

    Add two new queries: for insights tooltips
      - Get users by age  - getUsersByAges(ages: "0-10")
      - Get users by country  - getUsersByCountry(country: "Canada")

    Add query to get contact us users
      - getContactUsers -- returns all admin users
*/
