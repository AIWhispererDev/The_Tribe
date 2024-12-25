import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import LandingPage from './components/LandingPage'
import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import Header from './components/Header'
import TribePage from './components/TribePage'
import MintPage from './components/MintPage'
import EvolvePage from './components/EvolvePage'
import LeaderboardPage from './components/LeaderboardPage'

// Game route wrapper component
const GameRouteWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box>
    {/* Background */}
    <Box 
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="#0A0D11"
      backgroundImage="radial-gradient(circle at center, rgba(204, 255, 0, 0.03) 0%, transparent 70%)"
      zIndex={0}
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("/stars-background.jpg")',
        backgroundSize: 'cover',
        opacity: 0.3,
        mixBlendMode: 'overlay'
      }}
    />
    
    {/* Header - always on top */}
    <Box 
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
    >
      <Header />
    </Box>
    
    {/* Content */}
    <Box 
      position="relative"
      zIndex={1}
      minHeight="100vh"
      pt="64px" // Reduced padding to match header height
    >
      {children}
    </Box>
  </Box>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<GameRouteWrapper><App /></GameRouteWrapper>} />
          <Route path="/tribe" element={<GameRouteWrapper><TribePage /></GameRouteWrapper>} />
          <Route path="/mint" element={<GameRouteWrapper><MintPage /></GameRouteWrapper>} />
          <Route path="/evolve" element={<GameRouteWrapper><EvolvePage /></GameRouteWrapper>} />
          <Route path="/leaderboard" element={<GameRouteWrapper><LeaderboardPage /></GameRouteWrapper>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)