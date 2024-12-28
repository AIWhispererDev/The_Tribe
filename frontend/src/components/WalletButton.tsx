import { useWallet } from '../contexts/WalletContext';
import { TribalButton } from './TribalComponents/Button';

export const WalletButton = () => {
  const { connected, address, connect, disconnect } = useWallet();

  return (
    <TribalButton
      variant="primary"
      glowOnHover
      onClick={connected ? disconnect : connect}
    >
      {connected ? 
        `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}` : 
        'Connect Wallet'}
    </TribalButton>
  );
};