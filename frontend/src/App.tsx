import React from 'react';
import { Box, VStack } from "@chakra-ui/react";
import Header from "./components/Header";
import CryptoGorillaGame from "./components/CryptoGorillaGame";

function App() {
  return (
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
  );
}

export default App;