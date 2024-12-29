import React from 'react';
import { Box, Container, Text, VStack, HStack, Grid, useToast, Icon, Button } from '@chakra-ui/react';
import { Coins, Trophy, Leaf, TreePine, Flame } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useNightlyWallet } from '../contexts/NightlyWalletContext';

// Components
import GorillaCard from './GorillaCard';
import GorillaCardV2 from './GorillaCardV2';
import { TribalContainer, TribalButton, TribalDivider } from './TribalComponents';
import ConnectingLine from './animations/ConnectingLine';
import EvolutionCelebration from './animations/EvolutionCelebration';
import ParallaxBackground from './animations/ParallaxBackground';
import TransactionFeedback from './animations/TransactionFeedback';

// Hooks
import { useGameState } from '../hooks/useGameState';

// Game Logic
import { calculateTribeScore, calculateGorillaScore, getRecommendedBurn } from '../game/tribeLogic';

const CryptoGorillaGame: React.FC = () => {
  const toast = useToast();
  const { isConnected } = useNightlyWallet();
  const [useNewCardStyle, setUseNewCardStyle] = React.useState(false);
  const [showEvolution, setShowEvolution] = React.useState(false);

  const {
    tribe,
    tribeScore,
    bananaTokens,
    transactionStatus,
    setTransactionStatus,
    fetchTribeData,
    mintGorilla,
    burnGorilla,
    evolveGorilla
  } = useGameState();

  const showTransactionToast = (status: 'info' | 'success' | 'error' | 'pending', message: string) => {
    toast({
      title: message,
      status: status === 'pending' ? 'info' : status,
      duration: status === 'pending' ? null : 5000,
      isClosable: true,
    });
  };

  return (
    <ParallaxBackground>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <AnimatePresence>
            {showEvolution && (
              <EvolutionCelebration onComplete={() => setShowEvolution(false)} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {transactionStatus && (
              <TransactionFeedback status={transactionStatus} />
            )}
          </AnimatePresence>

          {/* Header with Title and Style Toggle */}
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

          {/* Stats Buttons */}
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
                    {tribe.filter(g => g !== null).length}/5
                  </Text>
                </HStack>
              </TribalButton>
            </HStack>
          </TribalContainer>

          <TribalDivider variant="glowing" />

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
    </ParallaxBackground>
  );
};

export default CryptoGorillaGame;
