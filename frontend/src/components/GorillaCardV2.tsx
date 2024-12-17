import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Text, HStack, VStack, Circle, Image, Button, Progress, keyframes } from '@chakra-ui/react';

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

const CardFrame = ({ children, isShiny }: { children: React.ReactNode, isShiny?: boolean }) => (
  <Box
    position="relative"
    borderRadius="12px"
    p="2px"
    h="full"
    sx={{
      background: `linear-gradient(135deg, ${theme.cardFrameLight}, ${theme.cardFrame})`,
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '12px',
        padding: '2px',
        background: isShiny 
          ? 'linear-gradient(45deg, #ffd700, #ff69b4, #4169e1, #ffd700)'
          : 'linear-gradient(45deg, #ffffff33, #ffffff00)',
        backgroundSize: '200% 100%',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        animation: isShiny ? `${shineAnimation} 2s linear infinite` : 'none',
      }
    }}
  >
    <Box
      bg={`linear-gradient(135deg, ${theme.cardInner} 0%, ${theme.cardFrameLight} 100%)`}
      borderRadius="10px"
      p="8px"
      position="relative"
      h="full"
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '10px',
          background: 'radial-gradient(circle at 50% 50%, #ffffff33, #ffffff00)',
          opacity: 0.5,
        }
      }}
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
  <Box bg={`rgba(176, 136, 201, 0.2)`} p="6px" mb="6px">
    <HStack mb="2px" spacing={1}>
      <EnergySymbol color={theme.energyPurple} />
      <EnergySymbol color={theme.energyPurple} />
      <EnergySymbol color={theme.energyYellow} />
      <Text color={theme.powerTitle} fontWeight="bold" fontSize="sm">
        {power}
      </Text>
    </HStack>
    <Text color={theme.powerText} fontSize="xs" lineHeight="1.2">
      This gorilla's diamond hands grant +{Math.floor(score * 100)} Attack and +{Math.floor(score * 50)} Wealth.
    </Text>
  </Box>
);

const StatsBack = ({ gorilla }: { gorilla: GorillaCardProps['gorilla'] }) => {
  if (!gorilla) return null;
  
  return (
    <VStack spacing={2} p={4} h="full" bg={`rgba(176, 136, 201, 0.1)`}>
      <Text fontSize="xl" fontWeight="bold" color={theme.titleText} mb={4}>
        Stats
      </Text>
      {[
        { label: 'Strength', value: gorilla.strength },
        { label: 'Intelligence', value: gorilla.intelligence },
        { label: 'Social Skills', value: gorilla.socialSkills },
        { label: 'Agility', value: gorilla.agility },
        { label: 'Endurance', value: gorilla.endurance },
        { label: 'Leadership', value: gorilla.leadership },
      ].map(({ label, value }) => (
        <HStack key={label} w="full" justify="space-between">
          <Text color={theme.powerText} fontSize="sm">{label}</Text>
          <Text color={theme.titleText} fontWeight="bold" fontSize="sm">{value}</Text>
        </HStack>
      ))}
    </VStack>
  );
};

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
          whileHover={{ scale: 1.02 }}
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
              {/* Header */}
              <Box position="relative" mb="4px" h="28px">
                <Text fontSize="10px" color={theme.powerText} position="absolute" left="2px" top="2px">
                  {stageText}
                </Text>
                <Text fontSize="md" fontWeight="bold" textAlign="center" color={theme.titleText} mt="2px">
                  {gorilla.name}
                </Text>
                <HStack position="absolute" right="2px" top="2px" spacing="1px">
                  <Text fontSize="xs" fontWeight="bold" color={theme.titleText}>
                    {rarityHP} HP
                  </Text>
                  <EnergySymbol color={theme.energyPurple} />
                </HStack>
              </Box>

              {/* Image */}
              <Box
                position="relative"
                bg={theme.frameYellow}
                border="1px solid black"
                mb="4px"
                h="140px"
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
              <Text fontSize="10px" color={theme.powerText} mb="4px" textAlign="center">
                {gorilla.rarity.charAt(0).toUpperCase() + gorilla.rarity.slice(1)} Gorilla · Stage {gorilla.stage + 1}
              </Text>

              {/* Powers */}
              <PowerSection power="Diamond Force" score={score} />
              <PowerSection power="Gorilla Strength" score={score * 0.5} />

              {/* Stats */}
              <HStack justify="space-between" p="4px" bg={`rgba(176, 136, 201, 0.2)`}>
                <HStack spacing={1}>
                  <Circle size="16px" bg={theme.energyPurple} />
                  <Text fontWeight="bold" fontSize="xs">STR {gorilla.strength}</Text>
                </HStack>
                <HStack spacing={1}>
                  <Circle size="16px" bg={theme.energyYellow} />
                  <Text fontWeight="bold" fontSize="xs">DEF +{gorilla.endurance}</Text>
                </HStack>
              </HStack>

              {/* Progress Bar */}
              <Box mt="4px" mb="2px">
                <Progress 
                  value={Math.min(100, (score * 1000) / 10)} 
                  size="xs" 
                  colorScheme="purple" 
                  borderRadius="full"
                />
              </Box>

              {/* Footer */}
              <HStack justify="space-between" px="2px">
                <Text fontSize="8px" color={theme.powerText}>
                  GORILLA COLLECTION #{gorilla.id.slice(0, 4)}
                </Text>
                <Text fontSize="8px" color={theme.powerText}>
                  ◇ {Math.floor(score * 1000)}/1000
                </Text>
              </HStack>
            </CardFrame>
          </CardFace>

          {/* Back of card */}
          <CardFace isBack>
            <CardFrame isShiny={isShiny}>
              <StatsBack gorilla={gorilla} />
            </CardFrame>
          </CardFace>
        </motion.div>
      </CardWrapper>

      {/* Action Buttons - Now inside a container that's part of the card */}
      <Box 
        position="absolute" 
        bottom="-40px" 
        left="0" 
        right="0" 
        bg={`linear-gradient(to bottom, ${theme.cardFrame}CC, ${theme.cardFrame})`}
        borderRadius="0 0 12px 12px"
        p="2"
      >
        <HStack 
          justify="center" 
          spacing={2}
          onClick={e => e.stopPropagation()}
        >
          <Button
            size="xs"
            colorScheme="purple"
            onClick={() => onEvolve(gorilla.id)}
            isDisabled={gorilla.stage >= 3}
          >
            Evolve
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {isFlipped ? 'Front' : 'Stats'}
          </Button>
          <Button
            size="xs"
            colorScheme="red"
            variant="outline"
            onClick={() => onBurn(gorilla.id)}
          >
            Burn
          </Button>
        </HStack>
      </Box>
    </Box>
  );
} 