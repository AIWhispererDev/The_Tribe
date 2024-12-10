import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import LandingPage from './components/LandingPage'
import { ChakraProvider } from '@chakra-ui/react'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { PetraWallet } from "petra-plugin-wallet-adapter"
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter"
import { Box } from '@chakra-ui/react'
import Header from './components/Header'
import TribePage from './components/TribePage'
import MintPage from './components/MintPage'
import EvolvePage from './components/EvolvePage'
import LeaderboardPage from './components/LeaderboardPage'

// Initialize wallet adapters
const wallets = [new PetraWallet(), new MartianWallet()];

// Game route wrapper component
const GameRouteWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box 
    minHeight="100vh" 
    bg="gray.900" 
    backgroundImage="url('/stars-background.jpg')"
    backgroundSize="cover"
    backgroundAttachment="fixed"
  >
    <Header />
    {children}
  </Box>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/game" element={<App />} />
            <Route path="/tribe" element={<GameRouteWrapper><TribePage /></GameRouteWrapper>} />
            <Route path="/mint" element={<GameRouteWrapper><MintPage /></GameRouteWrapper>} />
            <Route path="/evolve" element={<GameRouteWrapper><EvolvePage /></GameRouteWrapper>} />
            <Route path="/leaderboard" element={<GameRouteWrapper><LeaderboardPage /></GameRouteWrapper>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AptosWalletAdapterProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)