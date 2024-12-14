import React, { useState, useEffect } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import { Box, Container, Flex, Text, VStack, HStack, Badge, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { Coins, Trophy, Info } from 'lucide-react';
import GorillaCard from './GorillaCard';

const CRYPTO_GORILLA_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
const MAX_TRIBE_SIZE = 5;

const client = new AptosClient(NODE_URL);

interface Gorilla {
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

const PERFECT_TRIBE = {
  totalStats: 150,
  stageDistribution: [1, 1, 2, 1],
  rarityDistribution: { common: 2, rare: 1, epic: 1, legendary: 1 },
};

const RARITY_SCORES = { common: 1, rare: 2, epic: 3, legendary: 4 };

const CryptoGorillaGame: React.FC = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const [tribe, setTribe] = useState<Array<Gorilla | null>>([
    {
      id: 'pre-minted-gorilla-1',
      name: 'Baby Gorilla',
      strength: 1,
      intelligence: 1,
      socialSkills: 1,
      agility: 1,
      endurance: 1,
      leadership: 1,
      stage: 0,
      rarity: 'common'
    },
    null,
    null,
    null,
    null
  ]);
  const [bananaTokens, setBananaTokens] = useState(0);
  const [tribeScore, setTribeScore] = useState(0);
  const [lastActionTime, setLastActionTime] = useState<number>(0);

  useEffect(() => {
    if (account?.address) {
      fetchTribeData();
    }
  }, [account]);

  useEffect(() => {
    calculateTribeScore();
  }, [tribe]);

  const fetchTribeData = async () => {
    if (!account?.address) return;

    try {
      const tribeResponse = await client.view({
        function: `${CRYPTO_GORILLA_ADDRESS}::gorilla_game_module::get_tribe`,
        type_arguments: [],
        arguments: [account.address],
      });

      const gorillaIds = tribeResponse[0] as string[];
      const detailedTribe = await Promise.all(gorillaIds.map(async (gorillaId: string) => {
        const info = await client.view({
          function: `${CRYPTO_GORILLA_ADDRESS}::gorilla_game_module::get_gorilla_info`,
          type_arguments: [],
          arguments: [gorillaId],
        });
        return { 
          id: gorillaId, 
          strength: Number(info[0]), 
          intelligence: Number(info[1]), 
          socialSkills: Number(info[2]), 
          stage: Number(info[3]),
          agility: 1,
          endurance: 1,
          leadership: 1,
          name: 'Gorilla',
          rarity: 'common' as const
        };
      }));

      setTribe(detailedTribe);

      const scoreResponse = await client.view({
        function: `${CRYPTO_GORILLA_ADDRESS}::gorilla_game_module::calculate_tribe_score`,
        type_arguments: [],
        arguments: [account.address],
      });
      
      setTribeScore(Number(scoreResponse[0]));

      const lastActionResponse = await client.view({
        function: `${CRYPTO_GORILLA_ADDRESS}::gorilla_game_module::get_last_action_time`,
        type_arguments: [],
        arguments: [account.address],
      });
      
      setLastActionTime(Number(lastActionResponse[0]));
    } catch (error) {
      console.error("Error fetching tribe data:", error);
    }
  };

  const calculateTribeScore = () => {
    const activeGorillas = tribe.filter((g): g is Gorilla => g !== null);
    
    // Calculate total stats
    const totalStats = activeGorillas.reduce((sum, g) => 
      sum + g.strength + g.intelligence + g.socialSkills + g.agility + g.endurance + g.leadership, 0);
    const statsScore = Math.min(totalStats / PERFECT_TRIBE.totalStats, 1);

    // Calculate stage distribution score
    const stageDistribution = [0, 0, 0, 0];
    activeGorillas.forEach(g => stageDistribution[g.stage]++);
    const stageScore = stageDistribution.reduce((score, count, index) => 
      score + Math.min(count / PERFECT_TRIBE.stageDistribution[index], 1), 0) / 4;

    // Calculate rarity distribution score
    const rarityDistribution = { common: 0, rare: 0, epic: 0, legendary: 0 };
    activeGorillas.forEach(g => rarityDistribution[g.rarity]++);
    const rarityScore = Object.entries(PERFECT_TRIBE.rarityDistribution).reduce((score, [rarity, count]) => 
      score + Math.min(rarityDistribution[rarity as keyof typeof rarityDistribution] / count, 1), 0) / 5;

    // Calculate final score (weighted average)
    const finalScore = (statsScore * 0.4 + stageScore * 0.3 + rarityScore * 0.3) * 100;
    setTribeScore(Math.round(finalScore));
  };

  const mintGorilla = async (index: number) => {
    try {
      const rarities = ['common', 'common', 'rare', 'rare', 'epic', 'legendary'];
      const newGorilla: Gorilla = {
        id: `gorilla-${Date.now()}`,
        name: 'Baby Gorilla',
        strength: 1,
        intelligence: 1,
        socialSkills: 1,
        agility: 1,
        endurance: 1,
        leadership: 1,
        stage: 0,
        rarity: rarities[Math.floor(Math.random() * rarities.length)] as 'common' | 'rare' | 'epic' | 'legendary'
      };

      setTribe(prevTribe => {
        const newTribe = [...prevTribe];
        newTribe[index] = newGorilla;
        return newTribe;
      });

      // For testing purposes, we'll add Banana Tokens when minting
      setBananaTokens(prev => prev + 10);
      alert("Gorilla Minted Successfully! You received 10 Banana Tokens.");
    } catch (error) {
      console.error("Error minting gorilla:", error);
      alert("Failed to mint gorilla. Please try again.");
    }
  };

  const evolveGorilla = async (gorillaId: string) => {
    try {
      setTribe(prevTribe => prevTribe.map(gorilla => {
        if (gorilla && gorilla.id === gorillaId && gorilla.stage < 3) {
          const newStage = gorilla.stage + 1;
          return {
            ...gorilla,
            stage: newStage,
            name: `${['Baby', 'Juvenile', 'Adult', 'Silverback'][newStage]} Gorilla`,
            strength: gorilla.strength + 1,
            intelligence: gorilla.intelligence + 1,
            socialSkills: gorilla.socialSkills + 1,
            agility: gorilla.agility + 1,
            endurance: gorilla.endurance + 1,
            leadership: gorilla.leadership + 1,
          };
        }
        return gorilla;
      }));

      alert("Gorilla Evolved Successfully!");
    } catch (error) {
      console.error("Error evolving gorilla:", error);
      alert("Failed to evolve gorilla. Please try again.");
    }
  };

  const burnGorilla = async (gorillaId: string) => {
    try {
      setTribe(prevTribe => prevTribe.map(gorilla => 
        gorilla && gorilla.id === gorillaId ? null : gorilla
      ));
      setBananaTokens(prev => prev + 50);
      alert("Gorilla burned successfully. You received 50 Banana Tokens.");
    } catch (error) {
      console.error("Error burning gorilla:", error);
      alert("Failed to burn gorilla. Please try again.");
    }
  };

  const calculateGorillaScore = (gorilla: Gorilla): number => {
    const statScore = (gorilla.strength + gorilla.intelligence + gorilla.socialSkills + 
                       gorilla.agility + gorilla.endurance + gorilla.leadership) / 30;
    const stageScore = gorilla.stage / 3;
    const rarityScore = RARITY_SCORES[gorilla.rarity] / 4;

    return (statScore * 0.4 + stageScore * 0.3 + rarityScore * 0.3) * 100;
  };

  const getRecommendedBurn = (): Gorilla | null => {
    const activeGorillas = tribe.filter((g): g is Gorilla => g !== null);
    if (activeGorillas.length <= 1) return null;

    return activeGorillas.reduce((lowest, current) => 
      calculateGorillaScore(current) < calculateGorillaScore(lowest) ? current : lowest
    );
  };

  return (
    <Box
      minH="100vh"
      bg="black"
      position="relative"
      overflow="hidden"
      py={8}
    >
      <Container maxW="container.xl" position="relative">
        <VStack spacing={8}>
          {/* Stats Bar */}
          <Flex
            w="full"
            justify="space-between"
            align="center"
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            p={4}
            borderRadius="xl"
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            <HStack spacing={6}>
              <HStack>
                <Coins size={24} color="yellow.400" />
                <VStack align="start" spacing={0}>
                  <Text color="gray.400" fontSize="sm">Banana Tokens</Text>
                  <Text color="white" fontSize="xl" fontWeight="bold">
                    {bananaTokens}
                  </Text>
                </VStack>
              </HStack>

              <HStack>
                <Trophy size={24} color="purple.400" />
                <VStack align="start" spacing={0}>
                  <Text color="gray.400" fontSize="sm">Tribe Score</Text>
                  <Text 
                    color="white" 
                    fontSize="xl" 
                    fontWeight="bold"
                    bgGradient="linear(to-r, purple.400, blue.400)"
                    bgClip="text"
                  >
                    {tribeScore}%
                  </Text>
                </VStack>
              </HStack>
            </HStack>

            <Tooltip 
              label="Burn a gorilla to receive 50 Banana Tokens" 
              placement="top"
            >
              <Box cursor="pointer">
                <Info size={20} color="gray.400" />
              </Box>
            </Tooltip>
          </Flex>

          {/* Cards Grid */}
          <Box w="full">
            <Flex 
              flexWrap="wrap" 
              gap={6} 
              justify="center"
              sx={{
                '& > div': {
                  flex: '0 0 auto',
                }
              }}
            >
              {tribe.map((gorilla, index) => (
                <Box
                  key={gorilla ? gorilla.id : `empty-${index}`}
                  position="relative"
                >
                  <GorillaCard 
                    gorilla={gorilla}
                    onMint={() => mintGorilla(index)}
                    onEvolve={evolveGorilla}
                    onBurn={burnGorilla}
                    score={gorilla ? calculateGorillaScore(gorilla) : 0}
                    isRecommendedBurn={gorilla === getRecommendedBurn()}
                  />
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Tips Section */}
          <Box
            w="full"
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            p={4}
            borderRadius="xl"
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            <VStack align="start" spacing={3}>
              <Text color="gray.300">
                💡 Tip: Burning a gorilla will give you 50 Banana Tokens to mint a new one.
              </Text>
              {getRecommendedBurn() && (
                <HStack>
                  <Badge colorScheme="red">Recommendation</Badge>
                  <Text color="gray.300">
                    Consider burning {getRecommendedBurn()?.name} (Score: {calculateGorillaScore(getRecommendedBurn()!).toFixed(2)})
                  </Text>
                </HStack>
              )}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default CryptoGorillaGame;