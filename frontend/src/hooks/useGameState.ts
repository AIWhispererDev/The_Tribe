import { useState, useEffect } from 'react';
import { Aptos, AptosConfig } from '@aptos-labs/ts-sdk';
import { Gorilla } from '../types/types';
import { MOVEMENT_NETWORK } from '../misc/adapter';
import { updateTribe } from '../game/tribeLogic';
import { useToast } from '@chakra-ui/react';
import { UserResponseStatus } from '@aptos-labs/wallet-standard';
import { useWallet } from '../contexts/WalletContext';

const NODE_URL = MOVEMENT_NETWORK.url;
const CRYPTO_GORILLA_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const MAX_TRIBE_SIZE = 5;

const config = new AptosConfig({ network: MOVEMENT_NETWORK });
const client = new Aptos(config);

export const useGameState = () => {
  const toast = useToast();
  const { adapter, connected: isConnected, account } = useWallet();
  const [tribe, setTribe] = useState<Array<Gorilla | null>>([null, null, null, null, null]);
  const [tribeScore, setTribeScore] = useState(0);
  const [bananaTokens, setBananaTokens] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState<'pending' | 'success' | 'error' | null>(null);

  const fetchTribeData = async () => {
    if (!adapter || !account) return;

    try {
      const resources = await client.getAccountResources({
        accountAddress: account.address,
      });

      const tribeResource = resources.find(
        (r) => r.type === `${CRYPTO_GORILLA_ADDRESS}::cryptogorilla::TribeData`
      );

      if (tribeResource) {
        const data = tribeResource.data as any;
        const newTribe = updateTribe(data.gorillas);
        setTribe(newTribe);
        setTribeScore(data.tribe_score);
        setBananaTokens(data.banana_tokens);
      }
    } catch (error) {
      console.error('Error fetching tribe data:', error);
    }
  };

  useEffect(() => {
    if (isConnected && account) {
      fetchTribeData();
    }
  }, [isConnected, account?.address]);

  const mintGorilla = async (position: number) => {
    if (!adapter) {
      toast({
        title: 'Error',
        description: 'Wallet adapter is not initialized.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!account) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet first.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setTransactionStatus('pending');

      const transaction = {
        data: {
          function: `${CRYPTO_GORILLA_ADDRESS}::cryptogorilla::mint_gorilla`,
          functionArguments: [position],
        },
      };

      const response = await adapter.signAndSubmitTransaction(transaction);

      if (response.status === UserResponseStatus.APPROVED) {
        toast({
          title: 'Success',
          description: 'Gorilla minted successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setTransactionStatus('success');
        await fetchTribeData();
      } else {
        setTransactionStatus('error');
        toast({
          title: 'Error',
          description: 'Failed to mint gorilla.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error minting gorilla:', error);
      setTransactionStatus('error');
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to mint gorilla',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const burnGorilla = async (gorillaId: string) => {
    if (!adapter) {
      toast({
        title: 'Error',
        description: 'Wallet adapter is not initialized.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!account) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet first.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setTransactionStatus('pending');

      const transaction = {
        data: {
          function: `${CRYPTO_GORILLA_ADDRESS}::cryptogorilla::burn_gorilla`,
          functionArguments: [gorillaId],
        },
      };

      const response = await adapter.signAndSubmitTransaction(transaction);

      if (response.status === UserResponseStatus.APPROVED) {
        toast({
          title: 'Success',
          description: 'Gorilla burned successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setTransactionStatus('success');
        await fetchTribeData();
      } else {
        setTransactionStatus('error');
        toast({
          title: 'Error',
          description: 'Failed to burn gorilla.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error burning gorilla:', error);
      setTransactionStatus('error');
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to burn gorilla',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const evolveGorilla = async (gorillaId: string) => {
    if (!adapter) {
      toast({
        title: 'Error',
        description: 'Wallet adapter is not initialized.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!account) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet first.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setTransactionStatus('pending');

      const transaction = {
        data: {
          function: `${CRYPTO_GORILLA_ADDRESS}::cryptogorilla::evolve_gorilla`,
          functionArguments: [gorillaId],
        },
      };

      const response = await adapter.signAndSubmitTransaction(transaction);

      if (response.status === UserResponseStatus.APPROVED) {
        toast({
          title: 'Success',
          description: 'Gorilla evolved successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setTransactionStatus('success');
        await fetchTribeData();
      } else {
        setTransactionStatus('error');
        toast({
          title: 'Error',
          description: 'Failed to evolve gorilla.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error evolving gorilla:', error);
      setTransactionStatus('error');
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to evolve gorilla',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return {
    tribe,
    tribeScore,
    bananaTokens,
    transactionStatus,
    setTransactionStatus,
    fetchTribeData,
    mintGorilla,
    burnGorilla,
    evolveGorilla
  };
};
