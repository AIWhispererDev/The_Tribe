import React from 'react';
import { Box } from "@chakra-ui/react";
import CryptoGorillaGame from "./components/CryptoGorillaGame";
import { WalletProvider } from './contexts/WalletContext';

function App() {
  return (
    <WalletProvider>
      <Box>
        <CryptoGorillaGame />
      </Box>
    </WalletProvider>
  );
}

export default App;