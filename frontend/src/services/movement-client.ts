import { Network } from '@aptos-labs/ts-sdk';
import { MOVEMENT_NETWORK } from '../misc/adapter';

// Network configuration
export const NETWORK = Network.CUSTOM;
export const FULL_NODE = MOVEMENT_NETWORK.url;
export const INDEXER_NODE = MOVEMENT_NETWORK.url;

// Chain configuration
export const CHAIN_ID = MOVEMENT_NETWORK.chainId;  // Movement testnet chain ID
export const NETWORK_NAME = "Movement";
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