import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, VStack, HStack, Text, Button, Progress } from '@chakra-ui/react';
import { Repeat, Hexagon, Sparkles, Star, Leaf } from 'lucide-react';

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

const MotionBox = motion(Box);

const HolographicIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
  <Box
    position="relative"
    w="24px"
    h="24px"
    borderRadius="lg"
    overflow="hidden"
    sx={{
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, #4158D0, #C850C0, #4158D0)',
        backgroundSize: '200% 200%',
        animation: 'gradient 3s ease infinite',
        opacity: 0.8,
        borderRadius: 'lg',
      }
    }}
  >
    <Icon 
      size={20} 
      style={{ 
        position: 'relative', 
        zIndex: 1,
        color: 'white',
        margin: '2px'
      }} 
    />
  </Box>
);

const rarityEffects = {
  legendary: {
    borderGradient: 'linear-gradient(45deg, #FFD700, #FFA500)',
    iconGlow: '0 0 15px #FFD700',
    backgroundEffect: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.15), transparent 70%)',
    particleColor: '#FFD700',
    accentColor: '#FFA500'
  },
  epic: {
    borderGradient: 'linear-gradient(45deg, #9400D3, #4B0082)',
    iconGlow: '0 0 15px #9400D3',
    backgroundEffect: 'radial-gradient(circle at center, rgba(148, 0, 211, 0.15), transparent 70%)',
    particleColor: '#9400D3',
    accentColor: '#4B0082'
  },
  rare: {
    borderGradient: 'linear-gradient(45deg, #0096FF, #00008B)',
    iconGlow: '0 0 15px #0096FF',
    backgroundEffect: 'radial-gradient(circle at center, rgba(0, 150, 255, 0.15), transparent 70%)',
    particleColor: '#0096FF',
    accentColor: '#00008B'
  },
  common: {
    borderGradient: 'linear-gradient(45deg, #2A4C3B, #1A2F24)',
    iconGlow: '0 0 15px #2A4C3B',
    backgroundEffect: 'radial-gradient(circle at center, rgba(42, 76, 59, 0.15), transparent 70%)',
    particleColor: '#2A4C3B',
    accentColor: '#1A2F24'
  }
};

const LeafParticles = ({ color }: { color: string }) => (
  <Box
    position="absolute"
    inset={0}
    overflow="hidden"
    pointerEvents="none"
  >
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          color: color,
          opacity: 0.3,
          x: Math.random() * 100 + '%',
          y: Math.random() * 100 + '%'
        }}
        animate={{
          y: ['0%', '100%'],
          rotate: [0, 360],
          opacity: [0.3, 0]
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2
        }}
      >
        <Leaf size={20} />
      </motion.div>
    ))}
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
        }
      }}
      bg="whiteAlpha.200"
    />
  </Box>
);

const StageProgress = ({ stage, color }: { stage: number; color: string }) => {
  const stages = ['Baby', 'Juvenile', 'Adult', 'Silverback'];
  return (
    <VStack w="full" spacing={2}>
      <Progress 
        value={(stage / 3) * 100}
        size="sm"
        borderRadius="full"
        sx={{
          '& > div': {
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            transition: 'all 0.8s ease-in-out'
          }
        }}
        bg="whiteAlpha.200"
      />
      <HStack justify="space-between" w="full">
        {stages.map((s, i) => (
          <Text
            key={s}
            fontSize="xs"
            color={i <= stage ? color : 'whiteAlpha.400'}
            transition="all 0.3s"
          >
            {s}
          </Text>
        ))}
      </HStack>
    </VStack>
  );
};

export default function GorillaCard({ gorilla, onMint, onEvolve, onBurn, score, isRecommendedBurn }: GorillaCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (gorilla) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };

  if (!gorilla) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.3 }}
        style={{ perspective: '1000px' }}
      >
        <Box
          position="relative"
          borderRadius="xl"
          overflow="hidden"
          sx={{
            background: 'linear-gradient(165deg, rgba(42, 76, 59, 0.2), rgba(26, 47, 36, 0.05))',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: 'rgba(42, 76, 59, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(26, 47, 36, 0.37)',
            transition: 'all 0.3s ease-in-out',
            _hover: {
              boxShadow: '0 8px 32px 0 rgba(42, 76, 59, 0.5)',
              borderColor: 'rgba(42, 76, 59, 0.5)',
            }
          }}
          p={4}
        >
          <VStack spacing={3} position="relative" zIndex={1}>
            <HStack spacing={2} alignSelf="flex-start">
              <HolographicIcon icon={Repeat} />
              <HolographicIcon icon={Hexagon} />
              <HolographicIcon icon={Sparkles} />
              <HolographicIcon icon={Star} />
            </HStack>
            
            <Box
              w="full"
              h="200px"
              borderRadius="lg"
              overflow="hidden"
              position="relative"
              bg="whiteAlpha.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, rgba(107, 75, 255, 0.2) 0%, rgba(107, 75, 255, 0) 100%)',
                  zIndex: 1,
                }
              }}
            >
              <Button
                onClick={onMint}
                variant="outline"
                borderColor="purple.400"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                zIndex={2}
              >
                Mint Gorilla
              </Button>
            </Box>

            <VStack spacing={0.5} align="flex-start" w="full">
              <Text 
                color="gray.400" 
                fontSize="sm"
                letterSpacing="wide"
              >
                Empty Slot
              </Text>
              <Text 
                color="white" 
                fontWeight="bold"
                fontSize="lg"
                letterSpacing="wide"
              >
                Available
              </Text>
              <Text 
                bgGradient="linear(to-r, purple.400, blue.400)"
                bgClip="text"
                fontSize="sm"
                fontWeight="medium"
              >
                Mint a new gorilla
              </Text>
            </VStack>
          </VStack>
        </Box>
      </motion.div>
    );
  }

  const effect = rarityEffects[gorilla.rarity];

  return (
    <Box
      onClick={handleClick}
      cursor="pointer"
      w="full"
      h="450px"
      position="relative"
      sx={{ perspective: '1000px' }}
    >
      <motion.div
        style={{ 
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          scale: isHovered ? 1.05 : 1
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.6 }}
      >
        {/* Front of card */}
        <Box
          position="absolute"
          w="full"
          h="full"
          sx={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          <Box
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            h="full"
            sx={{
              background: effect.backgroundEffect,
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderImage: effect.borderGradient,
              borderImageSlice: 1,
              boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37), ${effect.iconGlow}`,
              transition: 'all 0.3s ease-in-out',
              _hover: {
                boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.5), ${effect.iconGlow}`,
              }
            }}
            p={4}
          >
            <LeafParticles color={effect.particleColor} />
            <VStack spacing={3} position="relative" zIndex={1}>
              <HStack spacing={2} alignSelf="flex-start">
                <HolographicIcon icon={Repeat} />
                <HolographicIcon icon={Hexagon} />
                <HolographicIcon icon={Sparkles} />
                <HolographicIcon icon={Star} />
              </HStack>
              
              <Box
                w="full"
                h="200px"
                borderRadius="lg"
                overflow="hidden"
                position="relative"
                sx={{
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(107, 75, 255, 0.2) 0%, rgba(107, 75, 255, 0) 100%)',
                    zIndex: 1,
                  }
                }}
              >
                <Box
                  as="img"
                  src={`/gorilla-${gorilla.stage}.png`}
                  alt={gorilla.name}
                  w="full"
                  h="full"
                  objectFit="cover"
                  sx={{
                    filter: 'contrast(1.1) brightness(1.1)',
                  }}
                />
              </Box>

              <StageProgress stage={gorilla.stage} color={effect.accentColor} />

              <VStack spacing={0.5} align="flex-start" w="full">
                <Text 
                  color="gray.400" 
                  fontSize="sm"
                  letterSpacing="wide"
                >
                  Score: {score.toFixed(1)}%
                </Text>
                <Text 
                  color="white" 
                  fontWeight="bold"
                  fontSize="lg"
                  letterSpacing="wide"
                >
                  {gorilla.name}
                </Text>
                <Text 
                  bgGradient="linear(to-r, purple.400, blue.400)"
                  bgClip="text"
                  fontSize="sm"
                  fontWeight="medium"
                >
                  {gorilla.rarity.charAt(0).toUpperCase() + gorilla.rarity.slice(1)} Gorilla
                </Text>
              </VStack>

              <HStack spacing={2} w="full">
                {gorilla.stage < 3 && (
                  <Button
                    onClick={(e) => handleButtonClick(e, () => onEvolve(gorilla.id))}
                    flex={1}
                    variant="outline"
                    borderColor="purple.400"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.200' }}
                    size="sm"
                  >
                    Evolve
                  </Button>
                )}
                <Button
                  onClick={(e) => handleButtonClick(e, () => onBurn(gorilla.id))}
                  flex={1}
                  variant="outline"
                  borderColor="red.400"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                  size="sm"
                >
                  Burn
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Box>

        {/* Back of card */}
        <Box
          position="absolute"
          w="full"
          h="full"
          sx={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <Box
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            h="full"
            sx={{
              background: effect.backgroundEffect,
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderImage: effect.borderGradient,
              borderImageSlice: 1,
              boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37), ${effect.iconGlow}`,
            }}
            p={4}
          >
            <LeafParticles color={effect.particleColor} />
            <VStack spacing={4} h="full">
              <Text 
                color="white" 
                fontWeight="bold"
                fontSize="lg"
                letterSpacing="wide"
                textShadow={effect.iconGlow}
              >
                {gorilla.name} Stats
              </Text>

              <VStack w="full" spacing={3}>
                <StatBar label="Strength" value={gorilla.strength} color={effect.accentColor} />
                <StatBar label="Intelligence" value={gorilla.intelligence} color={effect.accentColor} />
                <StatBar label="Social Skills" value={gorilla.socialSkills} color={effect.accentColor} />
                <StatBar label="Agility" value={gorilla.agility} color={effect.accentColor} />
                <StatBar label="Endurance" value={gorilla.endurance} color={effect.accentColor} />
                <StatBar label="Leadership" value={gorilla.leadership} color={effect.accentColor} />
              </VStack>

              <Text 
                color="gray.400"
                fontSize="sm"
                mt="auto"
                textAlign="center"
              >
                Click to see front →
              </Text>
            </VStack>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}