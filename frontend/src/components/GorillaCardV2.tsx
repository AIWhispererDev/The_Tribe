import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Text, HStack, VStack, Circle, Image, Button, Progress, keyframes, Divider } from '@chakra-ui/react';

// Keyframes for shine effect
const shineAnimation = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

// Theme based on Pokemon card style
const theme = {
  cardFrame: '#B088C9',
  cardFrameLight: '#D4B8E8',
  cardInner: '#DFC5E7',
  titleText: '#000000',
  powerTitle: '#E94ACA',
  powerText: '#666666',
  frameYellow: '#FFD952',
  diamondBlue: '#A5D8FF',
  energyPurple: '#9C6B98',
  energyYellow: '#FFD952',
};

interface GorillaCardProps {
  gorilla: {
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
  } | null;
  onMint: () => void;
  onEvolve: (id: string) => void;
  onBurn: (id: string) => void;
  score: number;
  isRecommendedBurn: boolean;
}

const EnergySymbol = ({ color }: { color: string }) => (
  <Circle
    size="16px"
    bg={`linear-gradient(135deg, ${color} 0%, #ffffff 100%)`}
    boxShadow={`0 0 5px ${color}`}
  />
);

const CardFace = ({ children, isBack = false }: { children: React.ReactNode, isBack?: boolean }) => (
  <Box
    position="absolute"
    w="full"
    h="full"
    sx={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: isBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
    }}
  >
    {children}
  </Box>
);

const StatBar = ({ label, value, max = 10, color }: { label: string; value: number; max?: number; color: string }) => (
  <Box w="full">
    <HStack justify="space-between" mb={1}>
      <Text fontSize="xs" color="gray.300">{label}</Text>
      <Text fontSize="xs" color="gray.300">{value}/{max}</Text>
    </HStack>
    <Progress 
      value={value} 
      max={max} 
      size="sm" 
      borderRadius="full"
      sx={{
        '& > div': {
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          _hover: {
            background: `linear-gradient(90deg, ${color}88, ${color})`
          }
        }
      }}
      bg="whiteAlpha.200"
    />
  </Box>
);

const CardFrame = ({ children, isShiny }: { children: React.ReactNode, isShiny?: boolean }) => (
  <Box
    position="relative"
    borderRadius="12px"
    p="2px"
    h="full"
    sx={{
      // Outer frame gradient
      background: `linear-gradient(135deg, #E8D8F3 0%, #B088C9 100%)`,
      boxShadow: '0 2px 7px rgba(0,0,0,0.15)',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '12px',
        padding: '2px',
        background: isShiny 
          ? 'linear-gradient(45deg, #ffd700, #ff69b4, #4169e1, #ffd700)'
          : 'linear-gradient(45deg, #ffffff66, #ffffff33)',
        backgroundSize: '200% 100%',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        animation: isShiny ? `${shineAnimation} 2s linear infinite` : 'none',
      },
      // Inner frame gradient
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: '2px',
        borderRadius: '10px',
        background: `linear-gradient(160deg, 
          #E8D8F3 0%, 
          #D4B8E8 35%,
          #C9A3E1 65%,
          #B088C9 100%
        )`,
        opacity: 0.9,
      }
    }}
  >
    <Box
      position="relative"
      zIndex={1}
      bg="white"
      borderRadius="10px"
      p="12px"
      mx="8px"
      my="8px"
      h="calc(100% - 16px)"
      boxShadow="inset 0 0 5px rgba(0,0,0,0.1)"
    >
      {children}
    </Box>
  </Box>
);

const getStageEvolution = (stage: number) => {
  const stages = ['Baby', 'Juvenile', 'Adult', 'Silverback'];
  const currentStage = stages[stage];
  const previousStage = stage > 0 ? stages[stage - 1] : null;
  
  return previousStage 
    ? `Evolves from ${previousStage} Gorilla - Stage ${stage + 1}`
    : `Basic Gorilla - Stage ${stage + 1}`;
};

const PowerSection = ({ power, score }: { power: string, score: number }) => (
  <Box p="6px">
    <HStack mb="2px" spacing={1}>
      <EnergySymbol color={theme.energyPurple} />
      <EnergySymbol color={theme.energyPurple} />
      <EnergySymbol color={theme.energyYellow} />
      <Text color={theme.powerTitle} fontWeight="bold" fontSize="sm">
        {power}
      </Text>
    </HStack>
    <Box
      bg={`rgba(176, 136, 201, 0.2)`}
      p="4px"
      borderRadius="sm"
      mt="2px"
    >
      <Text color={theme.powerText} fontSize="xs" lineHeight="1.2">
        This gorilla's diamond hands grant +{Math.floor(score * 100)} Attack and +{Math.floor(score * 50)} Wealth.
      </Text>
    </Box>
  </Box>
);

const CardWrapper = ({ children, onClick }: { children: React.ReactNode, onClick?: (e: React.MouseEvent) => void }) => (
  <Box
    onClick={onClick}
    cursor={onClick ? "pointer" : "default"}
    w="full"
    h="450px"
    position="relative"
    sx={{ perspective: '1000px' }}
  >
    {children}
  </Box>
);

export default function GorillaCardV2({ gorilla, onMint, onEvolve, onBurn, score }: GorillaCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!gorilla) {
    return (
      <Box position="relative" w="full" maxW="300px" mx="auto" h="450px">
        <CardFrame isShiny={false}>
          <VStack spacing={2} h="full" align="stretch">
            {/* Header */}
            <Box position="relative" w="full" minH="28px" mb={1}>
              <Text 
                fontSize="md" 
                fontWeight="bold" 
                textAlign="center" 
                color={theme.titleText}
                mt="8px"
              >
                Empty Slot
              </Text>
              <HStack position="absolute" right="0" top="0" spacing="1px">
                <Text fontSize="xs" fontWeight="bold" color={theme.titleText}>
                  0 HP
                </Text>
                <EnergySymbol color={theme.energyPurple} />
              </HStack>
            </Box>

            <Divider borderColor="gray.300" />

            {/* Image */}
            <Box
              position="relative"
              bg={theme.frameYellow}
              border="1px solid black"
              w="full"
              h="140px"
              overflow="hidden"
              borderRadius="4px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                onClick={onMint}
                colorScheme="purple"
                size="sm"
              >
                Mint Gorilla
              </Button>
            </Box>

            <Divider borderColor="gray.300" />

            {/* Character Info */}
            <Text fontSize="10px" color={theme.powerText} textAlign="center">
              Click to mint a new gorilla
            </Text>

            <Divider borderColor="gray.300" />

            {/* Empty Powers */}
            <Box p="6px">
              <Text color={theme.powerText} fontSize="xs">
                No powers available
              </Text>
            </Box>

            <Divider borderColor="gray.300" />

            {/* Empty Stats */}
            <HStack justify="space-between" p="4px" bg={`rgba(176, 136, 201, 0.2)`} w="full">
              <HStack spacing={1}>
                <Circle size="16px" bg={theme.energyPurple} />
                <Text fontWeight="bold" fontSize="xs">STR 0</Text>
              </HStack>
              <HStack spacing={1}>
                <Circle size="16px" bg={theme.energyYellow} />
                <Text fontWeight="bold" fontSize="xs">DEF +0</Text>
              </HStack>
            </HStack>

            {/* Footer */}
            <HStack justify="space-between" w="full" mt="auto" px="2px">
              <Text fontSize="8px" color={theme.powerText}>
                GORILLA COLLECTION
              </Text>
              <Text fontSize="8px" color={theme.powerText}>
                ◇ 0/1000
              </Text>
            </HStack>
          </VStack>
        </CardFrame>
      </Box>
    );
  }

  const stageText = getStageEvolution(gorilla.stage);
  const rarityHP = {
    common: 50,
    rare: 100,
    epic: 200,
    legendary: 420
  }[gorilla.rarity];

  const isShiny = gorilla.rarity === 'legendary' || gorilla.rarity === 'epic';

  const handleCardClick = (e: React.MouseEvent) => {
    // Only flip if clicking the card itself, not buttons
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.card-content')) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <Box position="relative" w="full" maxW="300px" mx="auto">
      <CardWrapper onClick={handleCardClick}>
        <motion.div
          className="card-content"
          style={{ 
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
          }}
          animate={{ 
            rotateY: isFlipped ? 180 : 0,
            scale: 1
          }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {/* Front of card */}
          <CardFace>
            <CardFrame isShiny={isShiny}>
              <VStack spacing={2} h="full" align="stretch">
                {/* Header */}
                <Box position="relative" w="full" minH="28px" mb={1}>
                  <Text 
                    fontSize="10px" 
                    color={theme.powerText} 
                    position="absolute" 
                    left="0" 
                    top="0"
                    fontStyle="italic"
                  >
                    {stageText}
                  </Text>
                  <Text 
                    fontSize="md" 
                    fontWeight="bold" 
                    textAlign="center" 
                    color={theme.titleText}
                    mt="8px"
                  >
                    {gorilla.name}
                  </Text>
                  <HStack position="absolute" right="0" top="0" spacing="1px">
                    <Text fontSize="xs" fontWeight="bold" color={theme.titleText}>
                      {rarityHP} HP
                    </Text>
                    <EnergySymbol color={theme.energyPurple} />
                  </HStack>
                </Box>

                <Divider borderColor="gray.300" />

                {/* Image */}
                <Box
                  position="relative"
                  bg={theme.frameYellow}
                  border="1px solid black"
                  w="full"
                  h="140px"
                  overflow="hidden"
                  borderRadius="4px"
                >
                  <Image
                    src={`/gorilla-${gorilla.stage}.png`}
                    alt={gorilla.name}
                    objectFit="cover"
                    w="full"
                    h="full"
                  />
                </Box>

                <Divider borderColor="gray.300" />

                {/* Character Info */}
                <Text fontSize="10px" color={theme.powerText} textAlign="center">
                  {gorilla.rarity.charAt(0).toUpperCase() + gorilla.rarity.slice(1)} Gorilla · Stage {gorilla.stage + 1}
                </Text>

                <Divider borderColor="gray.300" />

                {/* Powers */}
                <PowerSection power="Diamond Force" score={score} />
                <PowerSection power="Gorilla Strength" score={score * 0.5} />

                <Divider borderColor="gray.300" />

                {/* Stats */}
                <HStack justify="space-between" p="4px" bg={`rgba(176, 136, 201, 0.2)`} w="full">
                  <HStack spacing={1}>
                    <Circle size="16px" bg={theme.energyPurple} />
                    <Text fontWeight="bold" fontSize="xs">STR {gorilla.strength}</Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Circle size="16px" bg={theme.energyYellow} />
                    <Text fontWeight="bold" fontSize="xs">DEF +{gorilla.endurance}</Text>
                  </HStack>
                </HStack>

                {/* Footer */}
                <HStack justify="space-between" w="full" mt="auto" px="2px">
                  <Text fontSize="8px" color={theme.powerText}>
                    GORILLA COLLECTION #{gorilla.id.slice(0, 4)}
                  </Text>
                  <Text fontSize="8px" color={theme.powerText}>
                    ◇ {Math.floor(score * 1000)}/1000
                  </Text>
                </HStack>
              </VStack>
            </CardFrame>
          </CardFace>

          {/* Back of card */}
          <CardFace isBack>
            <CardFrame isShiny={isShiny}>
              <VStack spacing={3} h="full" align="stretch">
                <Text 
                  fontSize="lg" 
                  fontWeight="bold" 
                  color={theme.titleText}
                  textAlign="center"
                  w="full"
                  pb={2}
                >
                  Stats
                </Text>

                <Divider borderColor="gray.300" />

                <VStack w="full" spacing={3} flex={1}>
                  <StatBar label="Strength" value={gorilla.strength} color={theme.energyPurple} />
                  <StatBar label="Intelligence" value={gorilla.intelligence} color={theme.energyPurple} />
                  <StatBar label="Social Skills" value={gorilla.socialSkills} color={theme.energyPurple} />
                  <StatBar label="Agility" value={gorilla.agility} color={theme.energyPurple} />
                  <StatBar label="Endurance" value={gorilla.endurance} color={theme.energyPurple} />
                  <StatBar label="Leadership" value={gorilla.leadership} color={theme.energyPurple} />
                </VStack>

                <Divider borderColor="gray.300" />

                {/* Action Buttons */}
                <HStack 
                  justify="center" 
                  spacing={2}
                  onClick={e => e.stopPropagation()}
                  pb={2}
                >
                  {gorilla.stage < 3 && (
                    <Button
                      size="xs"
                      colorScheme="purple"
                      onClick={() => onEvolve(gorilla.id)}
                    >
                      Evolve
                    </Button>
                  )}
                  <Button
                    size="xs"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => onBurn(gorilla.id)}
                  >
                    Burn
                  </Button>
                </HStack>
              </VStack>
            </CardFrame>
          </CardFace>
        </motion.div>
      </CardWrapper>
    </Box>
  );
} 