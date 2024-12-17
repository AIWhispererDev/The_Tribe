import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Text, HStack, VStack, Circle, Image } from '@chakra-ui/react';

// Theme based on Pokemon card style
const theme = {
  cardFrame: '#B088C9',
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
    size="20px"
    bg={`linear-gradient(135deg, ${color} 0%, #ffffff 100%)`}
    boxShadow={`0 0 5px ${color}`}
  />
);

const CardFrame = ({ children }: { children: React.ReactNode }) => (
  <Box
    bg={`linear-gradient(135deg, ${theme.cardFrame} 0%, ${theme.cardInner} 100%)`}
    borderRadius="12px"
    p="8px"
    position="relative"
    h="full"
    boxShadow={`0 0 10px rgba(0,0,0,0.2)`}
  >
    {children}
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
  <Box bg={`rgba(176, 136, 201, 0.2)`} p="8px" mb="8px">
    <HStack mb="4px">
      <EnergySymbol color={theme.energyPurple} />
      <EnergySymbol color={theme.energyPurple} />
      <EnergySymbol color={theme.energyYellow} />
      <Text color={theme.powerTitle} fontWeight="bold">
        {power}
      </Text>
    </HStack>
    <Text color={theme.powerText} fontSize="sm">
      This gorilla's diamond hands grant +{Math.floor(score * 100)} Attack and +{Math.floor(score * 50)} Wealth.
    </Text>
  </Box>
);

export default function GorillaCardV2({ gorilla, onMint, score }: GorillaCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!gorilla) {
    return (
      <Box
        bg={theme.cardFrame}
        borderRadius="12px"
        p="16px"
        textAlign="center"
        onClick={onMint}
        cursor="pointer"
        _hover={{ transform: 'scale(1.02)' }}
        transition="transform 0.2s"
      >
        <Text color="white">Click to Mint</Text>
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

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ cursor: 'pointer', height: '100%' }}
    >
      <CardFrame>
        {/* Header */}
        <Box position="relative" mb="8px">
          <Text fontSize="xs" color={theme.powerText} position="absolute" left="4px" top="4px">
            {stageText}
          </Text>
          <Text fontSize="xl" fontWeight="bold" textAlign="center" color={theme.titleText}>
            {gorilla.name}
          </Text>
          <HStack position="absolute" right="4px" top="4px" spacing="2px">
            <Text fontSize="md" fontWeight="bold" color={theme.titleText}>
              {rarityHP} HP
            </Text>
            <EnergySymbol color={theme.energyPurple} />
          </HStack>
        </Box>

        {/* Image */}
        <Box
          position="relative"
          bg={theme.frameYellow}
          border="2px solid black"
          mb="8px"
          h="200px"
          overflow="hidden"
        >
          <Image
            src={`/gorilla-${gorilla.stage}.png`}
            alt={gorilla.name}
            objectFit="cover"
            w="full"
            h="full"
          />
        </Box>

        {/* Character Info */}
        <Text fontSize="sm" color={theme.powerText} mb="8px" textAlign="center">
          {gorilla.rarity.charAt(0).toUpperCase() + gorilla.rarity.slice(1)} Gorilla · Stage {gorilla.stage + 1}
        </Text>

        {/* Powers */}
        <PowerSection power="Diamond Force" score={score} />
        <PowerSection power="Gorilla Strength" score={score * 0.5} />

        {/* Stats */}
        <HStack justify="space-between" p="8px" bg={`rgba(176, 136, 201, 0.2)`}>
          <HStack>
            <Circle size="24px" bg={theme.energyPurple} />
            <Text fontWeight="bold">STR {gorilla.strength}</Text>
          </HStack>
          <HStack>
            <Circle size="24px" bg={theme.energyYellow} />
            <Text fontWeight="bold">DEF +{gorilla.endurance}</Text>
          </HStack>
        </HStack>

        {/* Footer */}
        <HStack justify="space-between" mt="4px" px="4px">
          <Text fontSize="xs" color={theme.powerText}>
            GORILLA COLLECTION #{gorilla.id.slice(0, 4)}
          </Text>
          <Text fontSize="xs" color={theme.powerText}>
            ◇ {Math.floor(score * 1000)}/1000
          </Text>
        </HStack>
      </CardFrame>
    </motion.div>
  );
} 