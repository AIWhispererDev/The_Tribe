import React, { useState } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button, Text, VStack, useToast } from '@chakra-ui/react';

const WalletConnector: React.FC = () => {
  const { account, connected, wallet, connect, disconnect } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const toast = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect();
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Connection failed",
        description: "Please make sure you have a wallet extension installed and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  if (connected && account) {
    return (
      <VStack>
        <Text>Connected: {account.address.slice(0, 6)}...{account.address.slice(-4)}</Text>
        <Button onClick={disconnect} colorScheme="red">
          Disconnect Wallet
        </Button>
      </VStack>
    );
  }

  return (
    <Button 
      onClick={handleConnect} 
      colorScheme="blue"
      isLoading={isConnecting}
      loadingText="Connecting..."
    >
      Connect Wallet
    </Button>
  );
};

export default WalletConnector;