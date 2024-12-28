import { useState, useEffect } from 'react';
import * as NightlyWallet from "@nightlylabs/wallet-selector-aptos";
import { TribalButton } from './TribalComponents/Button';
import { FaWallet } from "react-icons/fa";
import { useNightlyWallet } from '../contexts/NightlyWalletContext';
import { useToast } from '@chakra-ui/react';

interface WalletAccount {
  address: string;
  publicKey: string;
}

const MOVEMENT_NETWORK = "Movement";

export default function WalletSelector() {
  const toast = useToast();
  const { adapter, setAdapter, setIsWalletReady, setIsConnected, setAccount } = useNightlyWallet();
  const [connected, setLocalConnected] = useState(false);

  const checkWalletConnection = async (walletAdapter: NightlyWallet.NightlyConnectAptosAdapter) => {
    try {
      console.log('Checking wallet connection...');
      if (!walletAdapter) {
        console.error('Wallet adapter not initialized');
        return false;
      }

      // Check if we have a public account
      const publicAccount = walletAdapter.publicAccount;
      if (publicAccount?.address) {
        setIsConnected(true);
        setLocalConnected(true);
        setAccount({
          address: publicAccount.address.toString(),
          publicKey: publicAccount.publicKey.toString()
        });
        setIsWalletReady(true);
        return true;
      }

      setIsWalletReady(true);
      return false;
    } catch (error) {
      console.error('Wallet connection error:', error);
      setLocalConnected(false);
      setIsConnected(false);
      setAccount(null);
      setIsWalletReady(false);
      return false;
    }
  };

  const handleConnect = async () => {
    if (!adapter) {
      toast({
        title: 'Wallet Error',
        description: 'Wallet not initialized. Please refresh the page.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      console.log('Connecting to wallet...');
      const account = await adapter.connect();
      console.log('Connected to wallet, account:', account);
      
      if (account && account.address) {
        setLocalConnected(true);
        setIsConnected(true);
        setAccount({
          address: account.address.toString(),
          publicKey: account.publicKey.toString()
        });
        toast({
          title: 'Success',
          description: 'Wallet connected successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setLocalConnected(false);
      setIsConnected(false);
      setAccount(null);
      toast({
        title: 'Connection Error',
        description: error instanceof Error ? error.message : 'Failed to connect wallet',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDisconnect = async () => {
    if (!adapter) return;

    try {
      await adapter.disconnect();
      setLocalConnected(false);
      setIsConnected(false);
      setAccount(null);
      setIsWalletReady(false);
      toast({
        title: 'Wallet Disconnected',
        description: 'Successfully disconnected from wallet',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error('Failed to disconnect wallet:', error);
      toast({
        title: 'Disconnect Failed',
        description: error.message || 'Failed to disconnect wallet. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const initWallet = async () => {
      try {
        console.log('Initializing wallet...');
        const nightlyAdapter = await NightlyWallet.NightlyConnectAptosAdapter.build({
          appMetadata: {
            name: "CryptoGorilla",
            description: "CryptoGorilla Game",
            icon: "/images/tribe-logo.png",
          },
          network: MOVEMENT_NETWORK,
          networkType: "movement",
          chainId: 1,
        });
        
        setAdapter(nightlyAdapter);
        console.log('Wallet initialized:', nightlyAdapter);
        await checkWalletConnection(nightlyAdapter);
      } catch (error) {
        console.error('Failed to initialize wallet:', error);
        setIsWalletReady(false);
        toast({
          title: 'Wallet Error',
          description: 'Failed to initialize wallet. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    initWallet();
  }, [toast, setAdapter, setIsWalletReady, setIsConnected, setAccount]);

  return (
    <TribalButton
      onClick={connected ? handleDisconnect : handleConnect}
      leftIcon={<FaWallet />}
    >
      {connected ? 'Disconnect Wallet' : 'Connect Wallet'}
    </TribalButton>
  );
}