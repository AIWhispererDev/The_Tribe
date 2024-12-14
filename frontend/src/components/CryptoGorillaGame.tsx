import React, { useState, useEffect } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import { Box, Container, Heading, Text, VStack, HStack, Button, Grid, keyframes, useToast, Icon } from '@chakra-ui/react';
import { Coins, Trophy, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const twinkleAnimation = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 0.8; }
  100% { opacity: 0.2; }
`;

const ConnectingLine = () => (
  <Box
    position="absolute"
    height="2px"
    width="100%"
    left="50%"
    top="50%"
    transform="translateY(-50%)"
    zIndex={0}
    sx={{
      background: 'linear-gradient(90deg, rgba(107, 75, 255, 0.3), rgba(107, 75, 255, 0.1))',
      _before: {
        content: '""',
        position: 'absolute',
        width: '10px',
        height: '10px',
        borderRadius: 'full',
        bg: 'purple.400',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
      }
    }}
  />
);

const EvolutionCelebration = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0, 1, 0]
      }}
      transition={{ duration: 1.5 }}
    >
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(circle at center, purple.500 0%, transparent 70%)"
        zIndex={10}
      >
        <VStack spacing={4} justify="center" h="full">
          <Icon as={Star} w={20} h={20} color="yellow.400" />
          <Text
            fontSize="2xl"
            fontWeight="bold"
            bgGradient="linear(to-r, yellow.400, purple.400)"
            bgClip="text"
          >
            Evolution Complete!
          </Text>
        </VStack>
      </Box>
    </motion.div>
  );
};

const CryptoGorillaGame: React.FC = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const toast = useToast();
  const [transactionStatus, setTransactionStatus] = useState<'pending' | 'success' | 'error' | null>(null);
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
  const [showEvolution, setShowEvolution] = useState(false);

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

  // Transaction feedback component
  const TransactionFeedback = ({ status }: { status: 'pending' | 'success' | 'error' | null }) => {
    if (!status) return null;

    const config = {
      pending: {
        color: 'yellow.400',
        icon: '⏳',
        text: 'Transaction in progress...'
      },
      success: {
        color: 'green.400',
        icon: '✅',
        text: 'Transaction successful!'
      },
      error: {
        color: 'red.400',
        icon: '❌',
        text: 'Transaction failed'
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Box
          position="fixed"
          bottom="4"
          right="4"
          bg="whiteAlpha.100"
          backdropFilter="blur(10px)"
          color="white"
          px="6"
          py="3"
          borderRadius="xl"
          border="1px solid"
          borderColor="whiteAlpha.200"
          boxShadow="lg"
          zIndex={1000}
        >
          <HStack spacing={3}>
            <Text fontSize="xl">{config[status].icon}</Text>
            <Text color={config[status].color}>{config[status].text}</Text>
          </HStack>
        </Box>
      </motion.div>
    );
  };

  const showTransactionToast = (type: 'pending' | 'success' | 'error', message: string) => {
    toast({
      title: type === 'pending' ? 'Transaction Pending' : type === 'success' ? 'Success!' : 'Error!',
      description: message,
      status: type === 'pending' ? 'info' : type === 'success' ? 'success' : 'error',
      duration: type === 'pending' ? null : 5000,
      isClosable: true,
      position: 'bottom-right',
      variant: 'solid',
      bg: type === 'pending' ? 'yellow.400' : type === 'success' ? 'green.400' : 'red.400',
      color: 'white',
    });
  };

  const mintGorilla = async (index: number) => {
    setTransactionStatus('pending');
    showTransactionToast('pending', 'Minting your new gorilla...');
    
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

      setBananaTokens(prev => prev + 10);
      setTransactionStatus('success');
      showTransactionToast('success', `Successfully minted a ${newGorilla.rarity} gorilla! You received 10 Banana Tokens.`);
    } catch (error) {
      console.error("Error minting gorilla:", error);
      setTransactionStatus('error');
      showTransactionToast('error', 'Failed to mint gorilla. Please try again.');
    } finally {
      setTimeout(() => setTransactionStatus(null), 3000);
    }
  };

  const evolveGorilla = async (gorillaId: string) => {
    setTransactionStatus('pending');
    showTransactionToast('pending', 'Evolving your gorilla...');
    
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

      setShowEvolution(true);
      setTimeout(() => setShowEvolution(false), 1500);

      setTransactionStatus('success');
      showTransactionToast('success', 'Your gorilla has evolved successfully!');
    } catch (error) {
      console.error("Error evolving gorilla:", error);
      setTransactionStatus('error');
      showTransactionToast('error', 'Failed to evolve gorilla. Please try again.');
    } finally {
      setTimeout(() => setTransactionStatus(null), 3000);
    }
  };

  const burnGorilla = async (gorillaId: string) => {
    setTransactionStatus('pending');
    showTransactionToast('pending', 'Burning your gorilla...');
    
    try {
      setTribe(prevTribe => prevTribe.map(gorilla => 
        gorilla && gorilla.id === gorillaId ? null : gorilla
      ));
      setBananaTokens(prev => prev + 50);
      
      setTransactionStatus('success');
      showTransactionToast('success', 'Gorilla burned successfully. You received 50 Banana Tokens.');
    } catch (error) {
      console.error("Error burning gorilla:", error);
      setTransactionStatus('error');
      showTransactionToast('error', 'Failed to burn gorilla. Please try again.');
    } finally {
      setTimeout(() => setTransactionStatus(null), 3000);
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
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(107, 75, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none',
        }
      }}
      py={12}
    >
      {/* Animated stars background */}
      {[...Array(50)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          width="2px"
          height="2px"
          bg="white"
          borderRadius="full"
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          animation={`${twinkleAnimation} ${2 + Math.random() * 3}s infinite`}
          opacity={0.2}
        />
      ))}

      <Container maxW="container.xl">
        <VStack spacing={12} align="center">
          <Box
            animation={`${floatAnimation} 6s ease-in-out infinite`}
          >
            <Heading 
              color="white" 
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              textAlign="center"
              mb={4}
              bgGradient="linear(to-r, white, purple.400)"
              bgClip="text"
              letterSpacing="tight"
            >
              Build your ultimate{' '}
              <Text as="span" color="gray.400">
                gorilla tribe
              </Text>
            </Heading>
          </Box>

          {/* Stats Bar */}
          <HStack spacing={4}>
            <Button
              leftIcon={<Coins />}
              bg="white"
              color="black"
              _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
              _active={{ transform: 'translateY(0)' }}
              size="lg"
              px={8}
              transition="all 0.2s"
            >
              {bananaTokens} Banana Tokens
            </Button>
            <Button
              leftIcon={<Trophy />}
              variant="outline"
              color="white"
              borderColor="purple.400"
              _hover={{ bg: 'whiteAlpha.100', transform: 'translateY(-2px)' }}
              _active={{ transform: 'translateY(0)' }}
              size="lg"
              px={8}
              transition="all 0.2s"
            >
              Tribe Score: {tribeScore}%
            </Button>
          </HStack>

          {/* Cards Grid */}
          <Box position="relative" w="full" mt={8}>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }}
              gap={8}
              w="full"
              position="relative"
            >
              {tribe.map((gorilla, index) => (
                <Box key={gorilla ? gorilla.id : `empty-${index}`} position="relative">
                  {index < tribe.length - 1 && (
                    <ConnectingLine />
                  )}
                  <Box position="relative" zIndex={1}>
                    <GorillaCard 
                      gorilla={gorilla}
                      onMint={() => mintGorilla(index)}
                      onEvolve={evolveGorilla}
                      onBurn={burnGorilla}
                      score={gorilla ? calculateGorillaScore(gorilla) : 0}
                      isRecommendedBurn={gorilla === getRecommendedBurn()}
                    />
                  </Box>
                </Box>
              ))}
            </Grid>
          </Box>

          {/* Tips Section */}
          <Box
            w="full"
            bg="whiteAlpha.50"
            backdropFilter="blur(10px)"
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            <VStack align="start" spacing={3}>
              <Text color="gray.300" fontSize="lg">
                💡 Tip: Burning a gorilla will give you 50 Banana Tokens to mint a new one.
              </Text>
              {getRecommendedBurn() && (
                <Text color="gray.300" fontSize="lg">
                  🔥 Consider burning {getRecommendedBurn()?.name} (Score: {calculateGorillaScore(getRecommendedBurn()!).toFixed(2)})
                </Text>
              )}
            </VStack>
          </Box>
        </VStack>
      </Container>

      <AnimatePresence mode="wait">
        {showEvolution && <EvolutionCelebration />}
        <TransactionFeedback status={transactionStatus} />
      </AnimatePresence>
    </Box>
  );
};

export default CryptoGorillaGame;