import React, { useState, useCallback } from 'react';
import { AptosClient } from "aptos";
import { Box, Container, Text, VStack, HStack, Grid, keyframes, useToast, Icon, Button } from '@chakra-ui/react';
import { Coins, Trophy, Star, Leaf, TreePine, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GorillaCard from './GorillaCard';
import GorillaCardV2 from './GorillaCardV2';
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { TribalContainer, TribalButton, TribalDivider } from './TribalComponents';
import { useNightlyWallet } from '../contexts/NightlyWalletContext';

// Environment variables
const CRYPTO_GORILLA_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const NODE_URL = import.meta.env.VITE_NODE_URL || "http://127.0.0.1:8080/v1";
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
} as const;

const RARITY_SCORES: Record<Gorilla['rarity'], number> = {
  common: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
};

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

const jungleGradient = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

const lightRay = keyframes`
  0% { transform: rotate(0deg) translate(-50%, -50%) scale(1); opacity: 0.3; }
  50% { transform: rotate(180deg) translate(-50%, -50%) scale(1.2); opacity: 0.5; }
  100% { transform: rotate(360deg) translate(-50%, -50%) scale(1); opacity: 0.3; }
`;

const drumBeat = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const tribalPattern = keyframes`
  0% { transform: translateX(-100%) rotate(0deg); opacity: 0; }
  100% { transform: translateX(100%) rotate(360deg); opacity: 0.3; }
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
        background: 'linear-gradient(45deg, rgba(107, 75, 255, 0.8), rgba(107, 75, 255, 0.4))',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        boxShadow: '0 0 10px rgba(107, 75, 255, 0.3)',
        zIndex: 0
      }
    }}
  />
);

const EvolutionCelebration = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        position="fixed"
        inset={0}
        zIndex={50}
        overflow="hidden"
        bg="rgba(10, 13, 17, 0.9)"
      >
        {/* Tribal Patterns */}
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            position="absolute"
            top={`${20 * i}%`}
            left={0}
            width="100%"
            height="20px"
            opacity={0}
            background="url('/tribal-pattern.png')"
            backgroundSize="contain"
            animation={`${tribalPattern} ${3 + i * 0.5}s infinite linear`}
          />
        ))}

        {/* Central Animation */}
        <VStack
          spacing={8}
          justify="center"
          align="center"
          h="full"
          position="relative"
        >
          {/* Drum Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Box
              w="200px"
              h="200px"
              borderRadius="full"
              border="4px solid"
              borderColor="#E5FF44"
              position="relative"
              animation={`${drumBeat} 1s infinite`}
              _before={{
                content: '""',
                position: "absolute",
                inset: "-20px",
                border: "2px solid",
                borderColor: "rgba(229, 255, 68, 0.3)",
                borderRadius: "full",
              }}
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Icon 
                  as={Star} 
                  w={20} 
                  h={20} 
                  color="#E5FF44"
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                />
              </motion.div>
            </Box>
          </motion.div>

          {/* Text Animation */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Text
              fontSize="4xl"
              fontWeight="bold"
              bgGradient="linear(to-r, #E5FF44, #6B4BFF)"
              bgClip="text"
              textAlign="center"
              textShadow="0 0 20px rgba(229, 255, 68, 0.3)"
            >
              Evolution Complete!
            </Text>
          </motion.div>

          {/* Nature Particles */}
          <Particles
            id="evolution-particles"
            init={particlesInit}
            options={{
              particles: {
                number: { value: 100 },
                color: { value: "#E5FF44" },
                shape: { type: "circle" },
                opacity: {
                  value: 0.5,
                  random: true,
                  animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                  }
                },
                size: {
                  value: 3,
                  random: true,
                  animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 0.5,
                  }
                },
                move: {
                  enable: true,
                  speed: 3,
                  direction: "top",
                  random: true,
                  straight: false,
                  outModes: { default: "out" }
                }
              }
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%"
            }}
          />
        </VStack>
      </Box>
    </motion.div>
  );
};

const ParallaxBackground = ({ children }: { children: React.ReactNode }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Box
      position="relative"
      minH="100vh"
      overflow="hidden"
      bg="#0A0D11"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgGradient: 'linear(to-b, rgba(42, 76, 59, 0.2), rgba(10, 13, 17, 0.8))',
        animation: `${jungleGradient} 15s ease infinite`,
        backgroundSize: '200% 200%',
        zIndex: 0,
      }}
    >
      {/* Vine Silhouettes */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.1}
        backgroundImage="url('/vine-silhouettes.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        zIndex={1}
      />

      {/* Light Rays */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width="150%"
        height="150%"
        transform="translate(-50%, -50%)"
        background="radial-gradient(ellipse at center, rgba(229, 255, 68, 0.1) 0%, transparent 70%)"
        animation={`${lightRay} 20s linear infinite`}
        zIndex={2}
      />

      {/* Particles/Fireflies */}
      <Particles
        id="jungle-particles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 50, density: { enable: true, value_area: 1000 } },
            color: { value: "#E5FF44" },
            opacity: {
              value: 0.5,
              random: true,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false
              }
            },
            size: {
              value: 3,
              random: true,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.5,
                sync: false
              }
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "out" }
            }
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true
            }
          },
          background: {
            color: "transparent"
          }
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 3
        }}
      />

      {/* Misty Overlay */}
      <Box
        position="absolute"
        inset={0}
        backdropFilter="blur(40px)"
        zIndex={4}
        pointerEvents="none"
        background="linear-gradient(180deg, rgba(10, 13, 17, 0) 0%, rgba(10, 13, 17, 0.3) 100%)"
      />

      {/* Content Container */}
      <Box position="relative" zIndex={5}>
        {children}
      </Box>
    </Box>
  );
};

const TransactionFeedback = ({ status }: { status: 'pending' | 'success' | 'error' | null }) => {
  if (!status) return null;

  const config = {
    pending: {
      color: '#E5FF44',
      icon: TreePine,
      text: 'Transaction in progress...'
    },
    success: {
      color: '#2A4C3B',
      icon: Leaf,
      text: 'Transaction successful!'
    },
    error: {
      color: '#FF4444',
      icon: Flame,
      text: 'Transaction failed'
    }
  };

  const currentConfig = config[status];

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <TribalContainer
        position="fixed"
        bottom="4"
        right="4"
        minW="300px"
        variant="dark"
        showVines={false}
      >
        <HStack spacing={4}>
          <motion.div
            animate={{ 
              rotate: status === 'pending' ? 360 : 0,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
          >
            <Icon 
              as={currentConfig.icon} 
              w={6} 
              h={6} 
              color={currentConfig.color} 
            />
          </motion.div>
          <Text color={currentConfig.color}>
            {currentConfig.text}
          </Text>
        </HStack>
      </TribalContainer>
    </motion.div>
  );
};

const TRANSACTION_STATUS_TIMEOUT = 2000; // Consistent timeout duration

const CryptoGorillaGame: React.FC = () => {
  const { adapter, isWalletReady } = useNightlyWallet();
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
  const [showEvolution, setShowEvolution] = useState(false);
  const [useNewCardStyle, setUseNewCardStyle] = useState(false);

  const createTransactionPayload = (functionName: string, args: any[]) => {
    // Format arguments to BCS format
    const formattedArgs = args.map(arg => {
      if (typeof arg === 'number') {
        return arg.toString();
      } else if (typeof arg === 'string' && /^\d+$/.test(arg)) {
        // If it's a string containing only numbers
        return arg;
      } else if (typeof arg === 'string') {
        // For non-numeric strings, convert to hex if needed
        return arg.startsWith('0x') ? arg : `0x${Buffer.from(arg).toString('hex')}`;
      }
      return arg;
    });

    const payload = {
      function: `${CRYPTO_GORILLA_ADDRESS}::gorilla_game_module::${functionName}`,
      type_arguments: [],
      arguments: formattedArgs,
      type: "entry_function_payload"
    };

    console.log('Created transaction payload:', {
      ...payload,
      contractAddress: CRYPTO_GORILLA_ADDRESS,
      nodeUrl: NODE_URL
    });

    return payload;
  };

  const executeTransaction = async (
    functionName: string,
    args: any[],
    pendingMessage: string,
    successMessage: string
  ) => {
    if (!isWalletReady || !adapter) {
      showTransactionToast('error', 'Please connect your wallet first');
      return;
    }

    try {
      // Try to get the account, this will throw if not connected
      const account = await adapter.account();
      if (!account) {
        showTransactionToast('error', 'Please connect your wallet first');
        return;
      }

      setTransactionStatus('pending');
      showTransactionToast('pending', pendingMessage);

      const payload = createTransactionPayload(functionName, args);
      console.log('Submitting transaction with payload:', payload);
      
      const response = await adapter.signAndSubmitTransaction(payload);
      console.log('Transaction submitted:', response);
      
      await client.waitForTransaction(response.hash);
      console.log('Transaction confirmed');
      
      await fetchTribeData();

      setTransactionStatus('success');
      showTransactionToast('success', successMessage);
      return true;
    } catch (error: any) {
      console.error(`Error executing ${functionName}:`, error);
      const errorMessage = error.message || 'Please try again.';
      setTransactionStatus('error');
      showTransactionToast('error', `Transaction failed: ${errorMessage}`);
      return false;
    }
  };

  const fetchTribeData = async () => {
    if (!adapter?.publicAccount) {
      console.log("No wallet connected");
      return;
    }

    try {
      console.log("Fetching tribe data for address:", adapter.publicAccount.address);
      console.log("Using contract address:", CRYPTO_GORILLA_ADDRESS);
      
      const tribeResponse = await client.view({
        function: `${CRYPTO_GORILLA_ADDRESS}::gorilla_game_module::get_tribe`,
        type_arguments: [],
        arguments: [adapter.publicAccount.address],
      });

      console.log("Tribe response:", tribeResponse);

      const gorillaIds = tribeResponse[0] as string[];
      const detailedTribe = await Promise.all(gorillaIds.map(async (gorillaId: string) => {
        console.log("Fetching info for gorilla:", gorillaId);
        
        const info = await client.view({
          function: `${CRYPTO_GORILLA_ADDRESS}::gorilla_game_module::get_gorilla_info`,
          type_arguments: [],
          arguments: [gorillaId],
        });
        
        console.log("Gorilla info:", info);
        
        // Map the on-chain data to our Gorilla interface
        return { 
          id: gorillaId, 
          name: `${['Baby', 'Juvenile', 'Adult', 'Silverback'][Number(info[3])]} Gorilla`,
          strength: Number(info[0]), 
          intelligence: Number(info[1]), 
          socialSkills: Number(info[2]), 
          stage: Number(info[3]),
          agility: Number(info[4] || 1),
          endurance: Number(info[5] || 1),
          leadership: Number(info[6] || 1),
          rarity: info[7] as 'common' | 'rare' | 'epic' | 'legendary'
        };
      }));

      // Pad the tribe array with nulls if needed
      const paddedTribe = [...detailedTribe];
      while (paddedTribe.length < MAX_TRIBE_SIZE) {
        paddedTribe.push(null);
      }

      setTribe(paddedTribe);

      // Update tribe score from chain
      const scoreResponse = await client.view({
        function: `${CRYPTO_GORILLA_ADDRESS}::gorilla_game_module::calculate_tribe_score`,
        type_arguments: [],
        arguments: [adapter.publicAccount.address],
      });
      
      setTribeScore(Number(scoreResponse[0]));
    } catch (error: any) {
      console.error("Error fetching tribe data:", error);
      
      // More specific error messages based on the error type
      let errorMessage = 'Failed to fetch tribe data.';
      
      if (error.message?.includes('Module not found')) {
        errorMessage = 'Contract not found. Please check if the contract is deployed correctly.';
      } else if (error.message?.includes('Function not found')) {
        errorMessage = 'Contract function not found. Please check if the contract is up to date.';
      } else if (error.message?.includes('Invalid arguments')) {
        errorMessage = 'Invalid wallet address format.';
      } else if (error.message?.includes('execution failed')) {
        errorMessage = 'Contract execution failed. Please try again later.';
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  React.useEffect(() => {
    if (adapter?.publicAccount) {
      fetchTribeData();
    }
  }, [adapter]);

  React.useEffect(() => {
    calculateTribeScore();
  }, [tribe]);

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

  const showTransactionToast = (type: 'pending' | 'success' | 'error', message: string) => {
    // Close any existing pending toast
    if (type === 'success' || type === 'error') {
      toast.closeAll();
    }

    toast({
      id: `transaction-toast-${Date.now()}`,
      title: type === 'pending' ? 'Transaction Pending' : type === 'success' ? 'Success!' : 'Error!',
      description: message,
      status: type === 'pending' ? 'info' : type === 'success' ? 'success' : 'error',
      duration: type === 'pending' ? 3000 : 2000,
      isClosable: true,
      position: 'bottom-right',
      variant: 'solid',
    });
  };

  const evolveGorilla = async (gorillaId: string) => {
    const success = await executeTransaction(
      'evolve_gorilla',
      [gorillaId],
      'Evolving your gorilla...',
      'Your gorilla has evolved successfully!'
    );

    if (success) {
      setShowEvolution(true);
      setTimeout(() => setShowEvolution(false), 1500);
    }
  };

  const burnGorilla = async (gorillaId: string) => {
    await executeTransaction(
      'burn_gorilla',
      [gorillaId],
      'Burning your gorilla...',
      'Your gorilla has been burned successfully!'
    );
  };

  const mintGorilla = async (index: number) => {
    await executeTransaction(
      'mint_gorilla',
      [index.toString()],
      'Minting your gorilla...',
      'Your gorilla has been minted successfully!'
    );
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
    <ParallaxBackground>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <HStack justify="space-between">
            <Text color="white" fontSize="2xl">Your Gorilla Tribe</Text>
            <Button
              onClick={() => setUseNewCardStyle(!useNewCardStyle)}
              variant="outline"
              colorScheme="purple"
            >
              {useNewCardStyle ? 'Classic Style' : 'Pokemon Style'}
            </Button>
          </HStack>

          <TribalContainer>
            <HStack spacing={8} justify="center" wrap="wrap">
              <TribalButton
                icon={Coins}
                variant="primary"
                size="lg"
                px={8}
              >
                <HStack>
                  <Text>{bananaTokens}</Text>
                  <Text color="rgba(229, 255, 68, 0.8)">Banana Tokens</Text>
                </HStack>
              </TribalButton>

              <TribalButton
                icon={Trophy}
                variant="secondary"
                size="lg"
                px={8}
              >
                <HStack>
                  <Text>Tribe Score:</Text>
                  <Text color="rgba(229, 255, 68, 0.8)">{tribeScore}%</Text>
                </HStack>
              </TribalButton>

              <TribalButton
                icon={TreePine}
                variant="primary"
                size="lg"
                px={8}
              >
                <HStack>
                  <Text>Active Gorillas:</Text>
                  <Text color="rgba(229, 255, 68, 0.8)">
                    {tribe.filter(g => g !== null).length}/{MAX_TRIBE_SIZE}
                  </Text>
                </HStack>
              </TribalButton>
            </HStack>
          </TribalContainer>

          <TribalDivider variant="glowing" />

          <Box position="relative" w="full">
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
                  <Box 
                    position="relative" 
                    zIndex={1}
                    sx={{
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: '#0A0D11',
                        borderRadius: 'xl',
                        zIndex: 0
                      }
                    }}
                  >
                    <Box position="relative" zIndex={1}>
                      {useNewCardStyle ? (
                        <GorillaCardV2
                          gorilla={gorilla}
                          onMint={() => mintGorilla(index)}
                          onEvolve={() => gorilla && evolveGorilla(gorilla.id)}
                          onBurn={() => gorilla && burnGorilla(gorilla.id)}
                          score={gorilla ? calculateGorillaScore(gorilla) : 0}
                          isRecommendedBurn={gorilla === getRecommendedBurn()}
                        />
                      ) : (
                        <GorillaCard 
                          gorilla={gorilla}
                          onMint={() => mintGorilla(index)}
                          onEvolve={() => gorilla && evolveGorilla(gorilla.id)}
                          onBurn={() => gorilla && burnGorilla(gorilla.id)}
                          score={gorilla ? calculateGorillaScore(gorilla) : 0}
                          isRecommendedBurn={gorilla === getRecommendedBurn()}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Box>

          <TribalContainer variant="dark">
            <VStack align="start" spacing={4}>
              <HStack spacing={3}>
                <Icon as={Leaf} color="#E5FF44" />
                <Text color="gray.300" fontSize="lg">
                  Tip: Burning a gorilla will give you 50 Banana Tokens to mint a new one.
                </Text>
              </HStack>
              {getRecommendedBurn() && (
                <HStack spacing={3}>
                  <Icon as={Flame} color="#E5FF44" />
                  <Text color="gray.300" fontSize="lg">
                    Consider burning {getRecommendedBurn()?.name} (Score: {calculateGorillaScore(getRecommendedBurn()!).toFixed(2)})
                  </Text>
                </HStack>
              )}
            </VStack>
          </TribalContainer>
        </VStack>
      </Container>

      <AnimatePresence mode="wait">
        {showEvolution && <EvolutionCelebration />}
        <TransactionFeedback status={transactionStatus} />
      </AnimatePresence>
    </ParallaxBackground>
  );
};

export default CryptoGorillaGame;