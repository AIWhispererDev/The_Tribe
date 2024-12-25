import React from 'react';
import { Box, HStack } from "@chakra-ui/react";
import CryptoGorillaGame from "./components/CryptoGorillaGame";
import WalletSelector from "./components/WalletSelector";

function App() {
  return (
    <Box>
      <HStack spacing={4} position="absolute" top={4} right={4} zIndex={1000}>
        <WalletSelector />
      </HStack>
      <CryptoGorillaGame />
    </Box>
  );
}

export default App;