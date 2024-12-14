import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, VStack, HStack, Text, Button, Progress, Badge, useColorModeValue } from '@chakra-ui/react';
import { Flame, ArrowUpCircle } from 'lucide-react';

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

const rarityConfig = {
  common: {
    color: '#FDE68A',
    gradient: 'linear-gradient(135deg, #FDE68A 0%, #D4B106 100%)',
    badge: 'yellow'
  },
  rare: {
    color: '#93C5FD',
    gradient: 'linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)',
    badge: 'blue'
  },
  epic: {
    color: '#C084FC',
    gradient: 'linear-gradient(135deg, #C084FC 0%, #7C3AED 100%)',
    badge: 'purple'
  },
  legendary: {
    color: '#FCD34D',
    gradient: 'linear-gradient(135deg, #FCD34D 0%, #D97706 100%)',
    badge: 'orange'
  },
};

const MotionBox = motion(Box);

const StatBar = ({ label, value, max = 10, color }: { label: string; value: number; max?: number; color: string }) => (
  <Box w="full">
    <HStack justify="space-between" mb={1}>
      <Text fontSize="xs" color="gray.600">{label}</Text>
      <Text fontSize="xs" color="gray.600">{value}/{max}</Text>
    </HStack>
    <Progress 
      value={value} 
      max={max} 
      size="sm" 
      borderRadius="full"
      colorScheme={color}
      bg="whiteAlpha.300"
    />
  </Box>
);

export default function GorillaCard({ gorilla, onMint, onEvolve, onBurn, score, isRecommendedBurn }: GorillaCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!gorilla) {
    return (
      <Box
        w="250px"
        h="350px"
        bg="whiteAlpha.100"
        borderRadius="xl"
        p={4}
        position="relative"
        overflow="hidden"
        sx={{
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'whiteAlpha.200',
          transition: 'all 0.3s',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }
        }}
      >
        <VStack h="full" justify="center" spacing={6}>
          <Box
            w="full"
            h="60%"
            bg="whiteAlpha.200"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="whiteAlpha.500" fontSize="lg">Empty Slot</Text>
          </Box>
          <Button
            onClick={onMint}
            colorScheme="purple"
            size="lg"
            w="full"
            sx={{
              _hover: {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              }
            }}
          >
            Mint New Gorilla
          </Button>
        </VStack>
      </Box>
    );
  }

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const cardFront = (
    <Box
      position="absolute"
      w="full"
      h="full"
      sx={{
        backfaceVisibility: 'hidden',
        background: rarityConfig[gorilla.rarity].gradient,
        borderRadius: 'xl',
        padding: 4,
        overflow: 'hidden'
      }}
    >
      <VStack h="full" spacing={3}>
        <HStack w="full" justify="space-between">
          <Badge colorScheme={rarityConfig[gorilla.rarity].badge} fontSize="xs">
            {gorilla.rarity.toUpperCase()}
          </Badge>
          <Badge colorScheme="gray" fontSize="xs">
            Stage {gorilla.stage}
          </Badge>
        </HStack>

        <Box
          w="full"
          h="180px"
          position="relative"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
        >
          <Box
            as="img"
            src={`/gorilla_${gorilla.stage}.jpg`}
            alt={gorilla.name}
            w="full"
            h="full"
            sx={{
              objectFit: 'cover',
              transform: 'scale(1.1)',
              transition: 'transform 0.3s',
              _hover: { transform: 'scale(1.2)' }
            }}
          />
        </Box>

        <VStack w="full" align="start" spacing={2} mt="auto">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.800"
          >
            {gorilla.name}
          </Text>
          
          <HStack w="full" justify="space-between">
            <Text fontSize="sm" color="gray.700">
              Power Level: {gorilla.strength + gorilla.intelligence + gorilla.socialSkills + gorilla.agility + gorilla.endurance + gorilla.leadership}
            </Text>
            <Text 
              fontSize="sm" 
              fontWeight="bold"
              color="gray.700"
            >
              Score: {score.toFixed(1)}
            </Text>
          </HStack>

          <Text fontSize="xs" color="gray.600" alignSelf="center" mt={2}>
            Click to see stats →
          </Text>
        </VStack>
      </VStack>
    </Box>
  );

  const cardBack = (
    <Box
      position="absolute"
      w="full"
      h="full"
      sx={{
        backfaceVisibility: 'hidden',
        background: rarityConfig[gorilla.rarity].gradient,
        borderRadius: 'xl',
        padding: 4,
        transform: 'rotateY(180deg)'
      }}
    >
      <VStack h="full" spacing={4}>
        <HStack w="full" justify="space-between">
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            {gorilla.name}
          </Text>
          <Badge colorScheme={rarityConfig[gorilla.rarity].badge}>
            Stage {gorilla.stage}
          </Badge>
        </HStack>

        <VStack w="full" spacing={3}>
          <StatBar label="Strength" value={gorilla.strength} color="red" />
          <StatBar label="Intelligence" value={gorilla.intelligence} color="blue" />
          <StatBar label="Social Skills" value={gorilla.socialSkills} color="green" />
          <StatBar label="Agility" value={gorilla.agility} color="yellow" />
          <StatBar label="Endurance" value={gorilla.endurance} color="purple" />
          <StatBar label="Leadership" value={gorilla.leadership} color="cyan" />
        </VStack>

        <HStack w="full" justify="space-between" mt="auto">
          {gorilla.stage < 3 && (
            <Button
              leftIcon={<ArrowUpCircle size={16} />}
              onClick={(e) => {
                e.stopPropagation();
                onEvolve(gorilla.id);
              }}
              colorScheme="blue"
              size="sm"
              flex={1}
            >
              Evolve
            </Button>
          )}
          <Button
            leftIcon={<Flame size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              onBurn(gorilla.id);
            }}
            colorScheme="red"
            size="sm"
            flex={1}
          >
            Burn
          </Button>
        </HStack>
      </VStack>
    </Box>
  );

  return (
    <Box
      w="250px"
      h="350px"
      sx={{
        perspective: '1000px',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {isRecommendedBurn && (
        <Badge
          position="absolute"
          top="-2"
          right="-2"
          colorScheme="red"
          borderRadius="full"
          zIndex={10}
          px={2}
        >
          Recommended to Burn
        </Badge>
      )}
      <MotionBox
        w="full"
        h="full"
        position="relative"
        sx={{
          transformStyle: 'preserve-3d'
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={handleClick}
      >
        {cardFront}
        {cardBack}
      </MotionBox>
    </Box>
  );
}