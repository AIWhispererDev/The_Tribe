import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import { NightlyConnectAptosAdapter } from '@nightlylabs/wallet-selector-aptos';
import { getAdapter, MOVEMENT_NETWORK, MOVEMENT_CHAIN_IDS } from '../misc/adapter';
import { UserResponseStatus } from '@aptos-labs/wallet-standard';

interface WalletContextType {
  adapter: NightlyConnectAptosAdapter | null;
  isInitializing: boolean;
  connected: boolean;
  account: { address: string; publicKey: string } | null;
  handleConnect: () => Promise<void>;
  handleDisconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  adapter: null,
  isInitializing: true,
  connected: false,
  account: null,
  handleConnect: async () => {},
  handleDisconnect: async () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useToast();
  const [adapter, setAdapter] = useState<NightlyConnectAptosAdapter | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<{ address: string; publicKey: string } | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const changeNetworkBeforeAction = useCallback(
    async (network: { chainId: number }, adapter: NightlyConnectAptosAdapter) => {
      if (!MOVEMENT_CHAIN_IDS.includes(network.chainId)) {
        const changeNetworkResponse = await adapter.changeNetwork(MOVEMENT_NETWORK);
        if (changeNetworkResponse && changeNetworkResponse.status === UserResponseStatus.APPROVED) {
          toast({
            title: "Success",
            description: "Network changed!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error",
            description: "User rejected network change",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          throw new Error("Couldn't change network");
        }
      }
    },
    [toast]
  );

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true);
        const adapter = await getAdapter();
        
        // Set up event listeners
        adapter.on("connect", (accInfo) => {
          if (accInfo && "address" in accInfo) {
            setAccount({
              address: accInfo.address.toString(),
              publicKey: accInfo.publicKey.toString()
            });
            setConnected(true);
          }
        });

        adapter.on("disconnect", () => {
          setAccount(null);
          setConnected(false);
        });

        adapter.on("accountChange", (accInfo) => {
          if (accInfo && "address" in accInfo) {
            setAccount({
              address: accInfo.address.toString(),
              publicKey: accInfo.publicKey.toString()
            });
          }
        });

        // Try eager connect
        if (await adapter.canEagerConnect()) {
          try {
            const response = await adapter.connect();
            if (response.status === UserResponseStatus.APPROVED && response.args) {
              setConnected(true);
              setAccount({
                address: response.args.address.toString(),
                publicKey: response.args.publicKey.toString()
              });
            }
          } catch (error) {
            console.error('Eager connect failed:', error);
            await adapter.disconnect().catch(() => {});
          }
        }

        setAdapter(adapter);
      } catch (error) {
        console.error('Failed to initialize adapter:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize wallet adapter',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, [toast]);

  const handleConnect = async () => {
    if (!adapter) {
      toast({
        title: 'Error',
        description: 'Wallet initialization failed. Please refresh the page and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isConnecting) {
      toast({
        title: 'Please Wait',
        description: 'Wallet connection is in progress...',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsConnecting(true);

      // Try to connect first
      const response = await adapter.connect();
      
      if (response && response.status === UserResponseStatus.APPROVED && response.args) {
        // After successful connection, check and change network if needed
        try {
          const network = await adapter.network();
          await changeNetworkBeforeAction(network, adapter);
        } catch (networkError) {
          console.error('Network change failed:', networkError);
          // Continue even if network change fails
        }

        setConnected(true);
        setAccount({
          address: response.args.address.toString(),
          publicKey: response.args.publicKey.toString()
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
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!adapter) return;

    try {
      await adapter.disconnect();
      setConnected(false);
      setAccount(null);
      toast({
        title: 'Wallet Disconnected',
        description: 'Successfully disconnected from wallet',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
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
    <WalletContext.Provider value={{ 
      adapter, 
      isInitializing, 
      connected, 
      account,
      handleConnect,
      handleDisconnect
    }}>
      {children}
    </WalletContext.Provider>
  );
};