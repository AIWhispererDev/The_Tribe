// Game-related types and interfaces will be moved here
export interface Gorilla {
  id: string;
  name: string;
  strength: number;
  intelligence: number;
  socialSkills: number;
  agility: number;
  endurance: number;
  leadership: number;
  stage: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface GameState {
  tribe: Array<Gorilla | null>;
  tribeScore: number;
  bananaTokens: number;
  transactionStatus: 'pending' | 'success' | 'error' | null;
}

export interface EvolutionRules {
  minStats: {
    strength: number;
    intelligence: number;
    socialSkills: number;
    agility: number;
    endurance: number;
    leadership: number;
  };
}

export interface TribeConfig {
  maxSize: number;
  perfectTribe: {
    totalStats: number;
    stageDistribution: number[];
    rarityDistribution: Record<string, number>;
  };
  rarityScores: Record<string, number>;
}
