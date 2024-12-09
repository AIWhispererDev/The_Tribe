import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AptosWalletAdapterProvider plugins={[/* Add wallet plugins here */]} autoConnect={true}>
        <App />
      </AptosWalletAdapterProvider>
    </ChakraProvider>
  </React.StrictMode>,
)