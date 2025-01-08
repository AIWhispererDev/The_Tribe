import { useState } from "react";
import { TribalButton } from './TribalComponents/Button';
import { FaWallet } from "react-icons/fa";
import { useWallet } from '../contexts/WalletContext';

export default function WalletSelector() {
  const { connected, handleConnect, handleDisconnect } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleClick = async () => {
    if (connected) {
      await handleDisconnect();
    } else {
      setIsConnecting(true);
      try {
        await handleConnect();
      } finally {
        setIsConnecting(false);
      }
    }
  };

  return (
    <TribalButton
      onClick={handleClick}
      leftIcon={<FaWallet />}
      text={isConnecting ? "Connecting..." : (connected ? "Disconnect Wallet" : "Connect Wallet")}
      disabled={isConnecting}
    />
  );
}