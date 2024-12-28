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
  const { adapter, setAdapter, setIsWalletReady } = useNightlyWallet();
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<WalletAccount | null>(null);

  const checkWalletConnection = async (walletAdapter: NightlyWallet.NightlyConnectAptosAdapter) => {
    try {
      console.log('Checking wallet connection...');
      if (!walletAdapter) {
        console.error('Wallet adapter not initialized');
        return false;
      }

      // We'll only check account status when handling the connect action
      setIsWalletReady(true);
      return true;
    } catch (error) {
      console.error('Wallet connection error:', error);
      setConnected(false);
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
        setConnected(true);
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
      setConnected(false);
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
      setConnected(false);
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
  }, [toast, setAdapter, setIsWalletReady]);

  return (
    <TribalButton
      onClick={connected ? handleDisconnect : handleConnect}
      leftIcon={<FaWallet />}
    >
      {connected && account ? `Connected: ${account.address.slice(0, 4)}...${account.address.slice(-4)}` : 'Connect Wallet'}
    </TribalButton>
  );
}