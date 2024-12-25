import { useWallet } from '../contexts/WalletContext';
import { motion } from 'framer-motion';

export const WalletButton = () => {
  const { connected, address, connect, disconnect } = useWallet();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-jungle-dark font-bold shadow-lg"
      onClick={connected ? disconnect : connect}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-25"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <span className="relative z-10">
        {connected ? 
          `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}` : 
          'Connect Wallet'}
      </span>
    </motion.button>
  );
}; 