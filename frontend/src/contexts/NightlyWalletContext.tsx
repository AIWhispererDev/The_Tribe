import React, { createContext, useContext, useState, useEffect } from 'react';
import * as NightlyWallet from "@nightlylabs/wallet-selector-aptos";

interface NightlyWalletContextType {
  adapter: NightlyWallet.NightlyConnectAptosAdapter | null;
  setAdapter: (adapter: NightlyWallet.NightlyConnectAptosAdapter | null) => void;
  isWalletReady: boolean;
  setIsWalletReady: (ready: boolean) => void;
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

  return (
    <NightlyWalletContext.Provider value={{ 
      adapter, 
      setAdapter,
      isWalletReady,
      setIsWalletReady
    }}>
      {children}
    </NightlyWalletContext.Provider>
  );
}
