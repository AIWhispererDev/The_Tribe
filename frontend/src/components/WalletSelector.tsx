import { useState, useEffect } from 'react';
import { Button } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import * as NightlyWallet from "@nightlylabs/wallet-selector-aptos";

interface WalletAccount {
  address: string;
  publicKey: string;
}

const MOVEMENT_NETWORK = "Movement";

export default function WalletSelector() {
  const [adapter, setAdapter] = useState<NightlyWallet.NightlyConnectAptosAdapter | null>(null);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<WalletAccount | null>(null);

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
        });
        
        setAdapter(nightlyAdapter);
        console.log('Wallet initialized:', nightlyAdapter);

        try {
          const currentAccount = await nightlyAdapter.account();
          if (currentAccount) {
            setConnected(true);
            setAccount(currentAccount);
          }
        } catch (error) {
          console.log('No active account found');
        }
      } catch (error) {
        console.error('Failed to initialize wallet:', error);
      }
    };

    initWallet();
  }, []);

  const handleConnect = async () => {
    try {
      if (!adapter) return;
      await adapter.connect();
      const currentAccount = await adapter.account();
      setConnected(true);
      setAccount(currentAccount);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (!adapter) return;
      await adapter.disconnect();
      setConnected(false);
      setAccount(null);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  const displayAddress = typeof account?.address === 'string' 
    ? `${account.address.substring(0, 6)}...${account.address.substring(account.address.length - 4)}`
    : '';

  return (
    <Button
      leftIcon={<FaWallet />}
      onClick={connected ? handleDisconnect : handleConnect}
      colorScheme={connected ? "green" : "gray"}
    >
      {connected ? `Connected: ${displayAddress}` : "Connect Wallet"}
    </Button>
  );
}