import {ChakraProvider} from '@chakra-ui/react'
import { MoralisProvider } from 'react-moralis'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <MoralisProvider appId='60fw9OOT0K9DoYpBU4DC00GyqoIc9hMuWGxnkSB1' 
      serverUrl='https://l6mlug7kjkna.usemoralis.com:2053/server'>
      <Component {...pageProps} />
      </MoralisProvider>
    </ChakraProvider>

  )}

export default MyApp
