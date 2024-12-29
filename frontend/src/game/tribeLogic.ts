// Tribe management and validation logic
import { Gorilla } from '../types/types';

const MAX_TRIBE_SIZE = 5;

const PERFECT_TRIBE = {
  totalStats: 150,
  stageDistribution: [1, 1, 2, 1],
  rarityDistribution: { common: 2, rare: 1, epic: 1, legendary: 1 },
} as const;

const RARITY_SCORES: Record<Gorilla['rarity'], number> = {
  common: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
};

// Keep track of current tribe state
let currentTribe: Array<Gorilla | null> = [];

export const validateTribeSize = (tribe: Array<Gorilla | null>): boolean => {
  return tribe.filter(g => g !== null).length <= MAX_TRIBE_SIZE;
};

export const calculateTribeStats = (tribe: Array<Gorilla | null>) => {
  const activeMembers = tribe.filter((g): g is Gorilla => g !== null);
  
  const totalStats = activeMembers.reduce((sum, g) => {
    return sum + g.strength + g.intelligence + g.socialSkills + 
           g.agility + g.endurance + g.leadership;
  }, 0);

  const stageDistribution = Array(4).fill(0);
  activeMembers.forEach(g => stageDistribution[g.stage]++);

  const rarityDistribution = activeMembers.reduce((dist, g) => {
    dist[g.rarity] = (dist[g.rarity] || 0) + 1;
    return dist;
  }, {} as Record<string, number>);

  return {
    totalStats,
    stageDistribution,
    rarityDistribution
  };
};

export const calculateTribeScore = (tribe: Array<Gorilla | null>): number => {
  const stats = calculateTribeStats(tribe);
  
  // Base score from total stats
  let score = (stats.totalStats / PERFECT_TRIBE.totalStats) * 100;

  // Bonus for stage distribution
  const stageBonus = stats.stageDistribution.every(
    (count, i) => count >= PERFECT_TRIBE.stageDistribution[i]
  ) ? 20 : 0;

  // Bonus for rarity distribution
  const rarityBonus = Object.entries(PERFECT_TRIBE.rarityDistribution).every(
    ([rarity, count]) => (stats.rarityDistribution[rarity] || 0) >= count
  ) ? 30 : 0;

  return Math.min(score + stageBonus + rarityBonus, 150);
};

export const calculateGorillaScore = (gorilla: Gorilla): number => {
  const statScore = (gorilla.strength + gorilla.intelligence + gorilla.socialSkills + 
                     gorilla.agility + gorilla.endurance + gorilla.leadership) / 30;
  const stageScore = gorilla.stage / 3;
  const rarityScore = RARITY_SCORES[gorilla.rarity] / 4;

  return (statScore * 0.4 + stageScore * 0.3 + rarityScore * 0.3) * 100;
};

// Update the current tribe state
export const updateTribe = (tribe: Array<Gorilla | null>) => {
  currentTribe = tribe;
};

// Get recommended burn without requiring tribe parameter
export const getRecommendedBurn = (): Gorilla | null => {
  const activeGorillas = currentTribe.filter((g): g is Gorilla => g !== null);
  if (activeGorillas.length <= 1) return null;

  return activeGorillas.reduce((lowest, current) => 
    calculateGorillaScore(current) < calculateGorillaScore(lowest) ? current : lowest
  );
};
