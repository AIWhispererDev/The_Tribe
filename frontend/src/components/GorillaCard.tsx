import React, { useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useAnimation } from 'framer-motion';
import { Box, VStack, HStack, Text, Button, Progress, Badge, useColorModeValue } from '@chakra-ui/react';
import { Flame, ArrowUpCircle, Star } from 'lucide-react';

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

interface StageInfo {
  name: string;
  color: string;
  description: string;
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

const getStageColorScheme = (stage: number): string => {
  const schemes = ['green', 'blue', 'purple', 'orange'];
  return schemes[Math.min(stage, schemes.length - 1)];
};

const getStageInfo = (stage: number): StageInfo => {
  const stages: Record<number, StageInfo> = {
    0: {
      name: 'Baby',
      color: 'green.400',
      description: 'Just starting out'
    },
    1: {
      name: 'Juvenile',
      color: 'blue.400',
      description: 'Growing stronger'
    },
    2: {
      name: 'Adult',
      color: 'purple.400',
      description: 'Peak performance'
    },
    3: {
      name: 'Silverback',
      color: 'orange.400',
      description: 'Legendary status'
    }
  };

  return stages[Math.min(stage, 3)] || stages[0];
};

const EvolutionProgress = ({ stage }: { stage: number }) => {
  const stageInfo = getStageInfo(stage);
  const progress = ((stage + 1) / 4) * 100;

  return (
    <Box w="full">
      <HStack justify="space-between" mb={1}>
        <HStack>
          <Star size={14} color={stageInfo.color} />
          <Text fontSize="xs" color="gray.700" fontWeight="bold">
            {stageInfo.name} Stage
          </Text>
        </HStack>
        <Text fontSize="xs" color="gray.600">
          {stage + 1}/4
        </Text>
      </HStack>
      <Progress
        value={progress}
        size="sm"
        borderRadius="full"
        colorScheme={getStageColorScheme(stage)}
        bg="whiteAlpha.300"
        sx={{
          '& > div': {
            transition: 'all 0.8s ease-in-out'
          }
        }}
      />
      <Text fontSize="xs" color="gray.600" mt={1}>
        {stageInfo.description}
      </Text>
    </Box>
  );
};

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

// Card tilt configuration
const TILT_MAX = 15; // Maximum tilt angle
const SHINE_DISTANCE = 200; // Distance for shine effect

interface MousePosition {
  x: number;
  y: number;
}

export default function GorillaCard({ gorilla, onMint, onEvolve, onBurn, score, isRecommendedBurn }: GorillaCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position values for tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [TILT_MAX, -TILT_MAX]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-TILT_MAX, TILT_MAX]);

  // Add spring physics to the rotation for smooth animation
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Shine effect animation
  const shinePosition = useMotionValue(SHINE_DISTANCE);
  const shineOpacity = useTransform(
    shinePosition,
    [0, SHINE_DISTANCE / 2, SHINE_DISTANCE],
    [0, 0.5, 0]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isHovered) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate normalized position (-0.5 to 0.5)
      const x = (event.clientX - centerX) / rect.width;
      const y = (event.clientY - centerY) / rect.height;

      mouseX.set(x);
      mouseY.set(y);
      
      // Update shine effect position
      const angle = Math.atan2(y, x);
      const distance = Math.sqrt(x * x + y * y) * SHINE_DISTANCE;
      shinePosition.set(distance);
    },
    [isHovered, mouseX, mouseY, shinePosition]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    shinePosition.set(SHINE_DISTANCE);
  };

  if (!gorilla) {
    return (
      <MotionBox
        w="250px"
        h="350px"
        bg="whiteAlpha.100"
        borderRadius="xl"
        p={4}
        position="relative"
        overflow="hidden"
        whileHover={{ 
          y: -8,
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        sx={{
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'whiteAlpha.200',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
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
            as={motion.button}
            onClick={onMint}
            colorScheme="purple"
            size="lg"
            w="full"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Mint New Gorilla
          </Button>
        </VStack>
      </MotionBox>
    );
  }

  const handleClick = () => {
    if (!isHovered) {
      setIsFlipped(!isFlipped);
    }
  };

  const cardFront = (
    <Box
      position="absolute"
      w="full"
      h="full"
      onClick={(e) => {
        e.stopPropagation();
        if (!isHovered) {
          setIsFlipped(true);
        }
      }}
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
          <Badge 
            colorScheme={getStageColorScheme(gorilla.stage)} 
            fontSize="xs"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Star size={12} />
            Stage {gorilla.stage + 1}
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
          
          <EvolutionProgress stage={gorilla.stage} />

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
      onClick={(e) => {
        e.stopPropagation();
        if (!isHovered) {
          setIsFlipped(false);
        }
      }}
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
          <Badge 
            colorScheme={getStageColorScheme(gorilla.stage)}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Star size={12} />
            Stage {gorilla.stage + 1}
          </Badge>
        </HStack>

        <EvolutionProgress stage={gorilla.stage} />

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
              colorScheme={getStageColorScheme(gorilla.stage)}
              size="sm"
              flex={1}
            >
              Evolve to {getStageInfo(gorilla.stage + 1).name}
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
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: 'preserve-3d'
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          pointerEvents="none"
          overflow="hidden"
          borderRadius="xl"
          sx={{
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-100%',
              left: '-100%',
              right: '-100%',
              bottom: '-100%',
              background: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
              transform: 'rotate(45deg)',
              transition: 'all 0.3s ease',
              opacity: isHovered ? 1 : 0,
              zIndex: 1
            }
          }}
        />
        {cardFront}
        {cardBack}
      </MotionBox>
    </Box>
  );
}