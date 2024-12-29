// Environment variables
export const CRYPTO_GORILLA_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
export const NODE_URL = import.meta.env.VITE_NODE_URL || "http://127.0.0.1:8080/v1";

// Game constants
export const MAX_TRIBE_SIZE = 5;

// Evolution constants
export const EVOLUTION_STAGES = ['Baby', 'Juvenile', 'Adult', 'Silverback'];

export const PERFECT_TRIBE = {
  totalStats: 150,
  stageDistribution: [1, 1, 2, 1],
  rarityDistribution: { common: 2, rare: 1, epic: 1, legendary: 1 },
} as const;

export const RARITY_SCORES = {
  common: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
} as const;
