import { Network } from '@aptos-labs/ts-sdk';

// Network configuration
export const NETWORK = Network.CUSTOM;
export const FULL_NODE = "https://aptos.testnet.porto.movementlabs.xyz/v1";
export const INDEXER_NODE = "https://indexer.testnet.porto.movementlabs.xyz/v1";

// Chain configuration
export const CHAIN_ID = 1;
export const NETWORK_NAME = "Movement Porto Testnet";
export const NETWORK_CURRENCY = "MOVE";

// Contract addresses
export const GORILLA_CONTRACT_ADDRESS = "0x..."; // Replace with actual contract address

// Initialize Movement client
export const initializeMovementClient = () => {
  return {
    fullNode: FULL_NODE,
    indexerNode: INDEXER_NODE,
    network: NETWORK,
    chainId: CHAIN_ID
  };
};

// Helper function to format addresses
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Helper function to validate network
export const validateNetwork = async (chainId: number): Promise<boolean> => {
  return chainId === CHAIN_ID;
}; 