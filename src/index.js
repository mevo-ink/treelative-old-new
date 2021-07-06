import { StrictMode } from 'react'
import { render } from 'react-dom'

import App from 'App'

import { ChakraProvider } from '@chakra-ui/react'
import theme from 'utils/theme'

import { RecoilRoot } from 'recoil'

import { Provider } from 'urql'
import client from 'graphql/client'

import reportWebVitals from 'reportWebVitals'

render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Provider value={client}>
          <App />
        </Provider>
      </RecoilRoot>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
