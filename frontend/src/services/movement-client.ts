import { Network } from '@aptos-labs/ts-sdk';

// Network configuration
export const NETWORK = Network.CUSTOM;
export const FULL_NODE = import.meta.env.VITE_NODE_URL || "http://127.0.0.1:8080/v1";
export const INDEXER_NODE = import.meta.env.VITE_INDEXER_URL || "http://127.0.0.1:8080/v1";

// Chain configuration
export const CHAIN_ID = 4;  // Local testnet chain ID
export const NETWORK_NAME = "Local Testnet";
export const NETWORK_CURRENCY = "MOVE";

// Contract addresses
export const GORILLA_CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

// Initialize Movement client
export const initializeMovementClient = () => {
  return {
    fullNode: FULL_NODE,
    indexerNode: INDEXER_NODE,
    network: NETWORK,
    chainId: CHAIN_ID
  };
};

// Helper function to validate network
export const validateNetwork = async (chainId: number): Promise<boolean> => {
  return chainId === CHAIN_ID;
};

// Helper function to format addresses
export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};