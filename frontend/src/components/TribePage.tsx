import { Box, Container, Heading, Text, VStack, HStack, Button, Grid, keyframes } from '@chakra-ui/react';
import { Share2, PlayCircle } from 'lucide-react';
import QuestCard from './QuestCard';

interface QuestCard {
  id: string;
  name: string;
  level: string;
  edition: string;
  image: string;
}

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
        bg: 'purple.400',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
      }
    }}
  />
);

export default function TribePage() {
  const sampleCards: QuestCard[] = [
    {
      id: '1',
      name: 'Cosmic Jennie',
      level: 'LV8',
      edition: 'Interwoven Edition',
      image: '/cosmic-jennie.png'
    },
    {
      id: '2',
      name: 'Cosmic Jennie',
      level: 'LV8',
      edition: 'Interwoven Edition',
      image: '/cosmic-jennie.png'
    },
    {
      id: '3',
      name: 'Cosmic Jennie',
      level: 'LV8',
      edition: 'Interwoven Edition',
      image: '/cosmic-jennie.png'
    },
    {
      id: '4',
      name: 'Cosmic Jennie',
      level: 'LV8',
      edition: 'Interwoven Edition',
      image: '/cosmic-jennie.png'
    },
    {
      id: '5',
      name: 'Cosmic Jennie',
      level: 'LV8',
      edition: 'Interwoven Edition',
      image: '/cosmic-jennie.png'
    }
  ];

  return (
    <Box 
      minH="100vh" 
      bg="black" 
      position="relative"
      overflow="hidden"
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(107, 75, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none',
        }
      }}
      py={12}
    >
      {/* Animated stars background */}
      {[...Array(50)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          width="2px"
          height="2px"
          bg="white"
          borderRadius="full"
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          animation={`${twinkleAnimation} ${2 + Math.random() * 3}s infinite`}
          opacity={0.2}
        />
      ))}

      <Container maxW="container.xl">
        <VStack spacing={12} align="center">
          <Box
            animation={`${floatAnimation} 6s ease-in-out infinite`}
          >
            <Heading 
              color="white" 
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              textAlign="center"
              mb={4}
              bgGradient="linear(to-r, white, purple.400)"
              bgClip="text"
              letterSpacing="tight"
            >
              Complete weekly quests and{' '}
              <Text as="span" color="gray.400">
                earn stickers
              </Text>
            </Heading>
          </Box>

          <HStack spacing={4}>
            <Button
              leftIcon={<PlayCircle />}
              bg="white"
              color="black"
              _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
              _active={{ transform: 'translateY(0)' }}
              size="lg"
              px={8}
              transition="all 0.2s"
            >
              How to play
            </Button>
            <Button
              leftIcon={<Share2 />}
              variant="outline"
              color="white"
              borderColor="purple.400"
              _hover={{ bg: 'whiteAlpha.100', transform: 'translateY(-2px)' }}
              _active={{ transform: 'translateY(0)' }}
              size="lg"
              px={8}
              transition="all 0.2s"
            >
              Share on X
            </Button>
          </HStack>

          <Box position="relative" w="full" mt={8}>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }}
              gap={8}
              w="full"
              position="relative"
            >
              {sampleCards.map((card, index) => (
                <Box key={card.id} position="relative">
                  {index < sampleCards.length - 1 && (
                    <ConnectingLine />
                  )}
                  <Box position="relative" zIndex={1}>
                    <QuestCard {...card} />
                  </Box>
                </Box>
              ))}
            </Grid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 