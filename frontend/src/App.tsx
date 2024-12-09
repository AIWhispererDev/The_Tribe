import React from 'react';
import { ChakraProvider, Box, VStack } from "@chakra-ui/react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import Header from "./components/Header";
import CryptoGorillaGame from "./components/CryptoGorillaGame";

const wallets = [new PetraWallet(), new MartianWallet()];

function App() {
  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={false}>
      <ChakraProvider>
        <Box 
          minHeight="100vh" 
          bg="gray.900" 
          backgroundImage="url('/stars-background.jpg')"
          backgroundSize="cover"
          backgroundAttachment="fixed"
        >
          <Header />
          <CryptoGorillaGame />
        </Box>
      </ChakraProvider>
    </AptosWalletAdapterProvider>
  );
}

export default App;