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
      const currentAccount = await walletAdapter.account();
      console.log('Current account:', currentAccount);
      
      if (currentAccount) {
        console.log('Account found:', currentAccount);
        setConnected(true);
        setAccount({
          address: currentAccount.address.toString(),
          publicKey: currentAccount.publicKey.toString()
        });
        setIsWalletReady(true);
        return true;
      }
    } catch (error) {
      console.log('No active account found:', error);
      setConnected(false);
      setAccount(null);
      setIsWalletReady(false);
    }
    return false;
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
          network: MOVEMENT_NETWORK
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
      
      setConnected(true);
      setAccount({
        address: account.address.toString(),
        publicKey: account.publicKey.toString()
      });
      setIsWalletReady(true);
      
      toast({
        title: 'Wallet Connected',
        description: 'Successfully connected to wallet',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      setIsWalletReady(false);
      setConnected(false);
      setAccount(null);
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect wallet. Please try again.',
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

  return (
    <TribalButton
      onClick={connected ? handleDisconnect : handleConnect}
      leftIcon={<FaWallet />}
    >
      {connected && account ? `Connected: ${account.address.slice(0, 4)}...${account.address.slice(-4)}` : 'Connect Wallet'}
    </TribalButton>
  );
}