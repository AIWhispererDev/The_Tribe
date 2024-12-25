import { createContext, useContext, ReactNode } from 'react';
import { useWallet as useAptosWallet } from '@aptos-labs/wallet-adapter-react';
import type { WalletName } from '@aptos-labs/wallet-adapter-react';

interface WalletContextType {
  connected: boolean;
  address: string | null;
  connect: (walletName: WalletName) => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const { 
    connect,
    disconnect,
    account,
    connected,
  } = useAptosWallet();

  const address = account?.address?.toString() || null;

  return (
    <WalletContext.Provider value={{ 
      connected, 
      address, 
      connect: async (walletName: WalletName) => {
        try {
          await connect(walletName);
        } catch (error) {
          console.error('Failed to connect wallet:', error);
        }
      }, 
      disconnect: async () => {
        try {
          await disconnect();
        } catch (error) {
          console.error('Failed to disconnect wallet:', error);
        }
      } 
    }}>
      {children}
    </WalletContext.Provider>
  );
} 