import { Box, VStack, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Repeat, Hexagon, Sparkles, Star } from 'lucide-react';

interface QuestCardProps {
  id: string;
  name: string;
  level: string;
  edition: string;
  image: string;
}

const MotionBox = motion.create(Box);

const HolographicIcon = ({ icon: Icon }) => (
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

export default function QuestCard({ id, name, level, edition, image }: QuestCardProps) {
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
              src={image}
              alt={name}
              w="full"
              h="full"
              objectFit="cover"
              sx={{
                filter: 'contrast(1.1) brightness(1.1)',
              }}
            />
          </Box>

          <VStack spacing={0.5} align="flex-start" w="full">
            <Text 
              color="gray.400" 
              fontSize="sm"
              letterSpacing="wide"
            >
              {level}
            </Text>
            <Text 
              color="white" 
              fontWeight="bold"
              fontSize="lg"
              letterSpacing="wide"
            >
              {name}
            </Text>
            <Text 
              bgGradient="linear(to-r, purple.400, blue.400)"
              bgClip="text"
              fontSize="sm"
              fontWeight="medium"
            >
              {edition}
            </Text>
          </VStack>
        </VStack>
      </Box>
    </MotionBox>
  );
}