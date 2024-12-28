import React, { createContext, useContext, useState, useEffect } from 'react';
import * as NightlyWallet from "@nightlylabs/wallet-selector-aptos";

interface NightlyWalletContextType {
  adapter: NightlyWallet.NightlyConnectAptosAdapter | null;
  setAdapter: (adapter: NightlyWallet.NightlyConnectAptosAdapter | null) => void;
  isWalletReady: boolean;
  setIsWalletReady: (ready: boolean) => void;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  account: { address: string; publicKey: string } | null;
  setAccount: (account: { address: string; publicKey: string } | null) => void;
}

const NightlyWalletContext = createContext<NightlyWalletContextType | null>(null);

export const useNightlyWallet = () => {
  const context = useContext(NightlyWalletContext);
  if (!context) {
    throw new Error('useNightlyWallet must be used within a NightlyWalletProvider');
  }
  return context;
};

interface NightlyWalletProviderProps {
  children: React.ReactNode;
}

export function NightlyWalletProvider({ children }: NightlyWalletProviderProps) {
  const [adapter, setAdapter] = useState<NightlyWallet.NightlyConnectAptosAdapter | null>(null);
  const [isWalletReady, setIsWalletReady] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<{ address: string; publicKey: string } | null>(null);

  return (
    <NightlyWalletContext.Provider value={{ 
      adapter, 
      setAdapter,
      isWalletReady,
      setIsWalletReady,
      isConnected,
      setIsConnected,
      account,
      setAccount
    }}>
      {children}
    </NightlyWalletContext.Provider>
  );
}
