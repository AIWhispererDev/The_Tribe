import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, VStack, HStack, Text, Button, Progress } from '@chakra-ui/react';
import { Repeat, Hexagon, Sparkles, Star } from 'lucide-react';

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

const StatBar = ({ label, value, max = 10 }: { label: string; value: number; max?: number }) => (
  <Box w="full">
    <HStack justify="space-between" mb={1}>
      <Text fontSize="xs" color="gray.400">{label}</Text>
      <Text fontSize="xs" color="gray.400">{value}/{max}</Text>
    </HStack>
    <Progress 
      value={value} 
      max={max} 
      size="sm" 
      borderRadius="full"
      colorScheme="purple"
      bg="whiteAlpha.200"
    />
  </Box>
);

const StageProgress = ({ stage }: { stage: number }) => {
  const stages = ['Baby', 'Juvenile', 'Adult', 'Silverback'];
  return (
    <VStack w="full" spacing={2}>
      <Progress 
        value={(stage / 3) * 100}
        colorScheme="purple"
        size="sm"
        borderRadius="full"
        sx={{
          '& > div': {
            transition: 'all 0.8s ease-in-out'
          }
        }}
      />
      <HStack justify="space-between" w="full">
        {stages.map((s, i) => (
          <Box
            key={s}
            w="2"
            h="2"
            borderRadius="full"
            bg={i <= stage ? 'purple.400' : 'whiteAlpha.200'}
            transition="all 0.3s"
          />
        ))}
      </HStack>
      <HStack justify="space-between" w="full">
        {stages.map((s, i) => (
          <Text
            key={s}
            fontSize="xs"
            color={i <= stage ? 'purple.400' : 'whiteAlpha.400'}
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
      <MotionBox
        whileHover={{ scale: 1.05, rotateY: 5 }}
        transition={{ duration: 0.3 }}
        style={{ perspective: '1000px' }}
      >
        <Box
          position="relative"
          borderRadius="xl"
          overflow="hidden"
          sx={{
            background: 'linear-gradient(165deg, rgba(107, 75, 255, 0.2), rgba(107, 75, 255, 0.05))',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: 'rgba(107, 75, 255, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            _before: {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(107, 75, 255, 0.1), rgba(107, 75, 255, 0))',
              zIndex: 0,
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
      </MotionBox>
    );
  }

  return (
    <Box
      onClick={handleClick}
      cursor="pointer"
      w="full"
      h="450px"
      position="relative"
      sx={{ perspective: '1000px' }}
    >
      <MotionBox
        position="relative"
        w="full"
        h="full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `rotateY(${isFlipped ? '180deg' : '0deg'})`,
        }}
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
              background: 'linear-gradient(165deg, rgba(107, 75, 255, 0.2), rgba(107, 75, 255, 0.05))',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: isRecommendedBurn ? 'red.400' : 'rgba(107, 75, 255, 0.3)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              _before: {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(107, 75, 255, 0.1), rgba(107, 75, 255, 0))',
                zIndex: 0,
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

              <StageProgress stage={gorilla.stage} />

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

        {/* Back of card (Stats) */}
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
              background: 'linear-gradient(165deg, rgba(107, 75, 255, 0.2), rgba(107, 75, 255, 0.05))',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: 'rgba(107, 75, 255, 0.3)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
            p={4}
          >
            <VStack spacing={4} h="full">
              <Text 
                color="white" 
                fontWeight="bold"
                fontSize="lg"
                letterSpacing="wide"
              >
                {gorilla.name} Stats
              </Text>

              <VStack w="full" spacing={3}>
                <StatBar label="Strength" value={gorilla.strength} />
                <StatBar label="Intelligence" value={gorilla.intelligence} />
                <StatBar label="Social Skills" value={gorilla.socialSkills} />
                <StatBar label="Agility" value={gorilla.agility} />
                <StatBar label="Endurance" value={gorilla.endurance} />
                <StatBar label="Leadership" value={gorilla.leadership} />
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
      </MotionBox>
    </Box>
  );
}