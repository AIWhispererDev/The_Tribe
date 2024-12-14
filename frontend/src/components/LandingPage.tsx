import { Play, Menu } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionText = motion(Text);

export default function LandingPage() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Transform values for hero section
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 300], [0, 50]);

  const handlePlayNow = () => {
    navigate('/game');
  };

  return (
    <Box 
      minH="100vh" 
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
          backgroundImage: "url('/images/jungle-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9))',
          zIndex: 1
        }
      }}
    >
      {/* Content wrapper */}
      <Box position="relative" zIndex={3}>
        {/* Header */}
        <Flex
          as="header"
          px={6}
          py={4}
          align="center"
          justify="space-between"
        >
          <Link 
            as={RouterLink} 
            to="/"
            fontSize="2xl"
            fontWeight="bold"
            color="#CCFF00"
            _hover={{ textDecoration: 'none' }}
            display="flex"
            alignItems="center"
          >
            THE TRIBE
          </Link>
          
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/tribe" _hover={{ color: '#CCFF00' }} transition="colors 0.2s">
              MY TRIBE
            </Link>
            <Link as={RouterLink} to="/mint" _hover={{ color: '#CCFF00' }} transition="colors 0.2s">
              MINT GORILLA
            </Link>
            <Link as={RouterLink} to="/evolve" _hover={{ color: '#CCFF00' }} transition="colors 0.2s">
              EVOLVE
            </Link>
            <Link as={RouterLink} to="/leaderboard" _hover={{ color: '#CCFF00' }} transition="colors 0.2s">
              LEADERBOARD
            </Link>
          </HStack>
          
          <Button
            bg="#CCFF00"
            color="black"
            px={6}
            py={2}
            rounded="full"
            fontSize="sm"
            fontWeight="bold"
            _hover={{ 
              bg: '#CCFF00', 
              transform: 'translateY(-2px)',
              boxShadow: '0 0 20px rgba(204, 255, 0, 0.5)'
            }}
            transition="all 0.2s"
            onClick={handlePlayNow}
          >
            PLAY NOW
          </Button>
        </Flex>

        {/* Hero Section with Scroll Animations */}
        <Container maxW="container.xl" pt={{ base: 20, md: 32 }} pb={20}>
          <MotionBox 
            textAlign="center" 
            mb={16}
            style={{
              opacity: heroOpacity,
              scale: heroScale,
              y: heroY
            }}
          >
            <MotionBox
              mx="auto"
              mb={8}
              position="relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              _after={{
                content: '""',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: '-20px',
                width: '60px',
                height: '4px',
                background: '#CCFF00',
                borderRadius: 'full'
              }}
            >
              <MotionImage
                src="/images/tribe-logo.png"
                alt="THE TRIBE"
                mx="auto"
                maxW={{ base: "280px", md: "400px" }}
                w="full"
                filter="drop-shadow(0 0 20px rgba(204, 255, 0, 0.3))"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </MotionBox>
            <MotionText
              fontSize={{ base: 'xl', md: '2xl' }}
              color="#CCFF00"
              mb={12}
              letterSpacing="wide"
              opacity={0.9}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              BLOCKCHAIN GAME
            </MotionText>
            <Button
              bg="#CCFF00"
              color="black"
              px={8}
              py={6}
              rounded="full"
              fontSize="xl"
              fontWeight="bold"
              _hover={{ 
                bg: '#CCFF00',
                transform: 'translateY(-2px)',
                boxShadow: '0 0 30px rgba(204, 255, 0, 0.5)'
              }}
              transition="all 0.2s"
              onClick={handlePlayNow}
              mb={20}
            >
              PLAY NOW
            </Button>
          </MotionBox>

          {/* NFT Cards with Scroll Animations */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={8}
            maxW="900px"
            mx="auto"
            px={4}
          >
            {[1, 2, 3].map((item, index) => (
              <MotionBox
                key={item}
                className="nft-card"
                position="relative"
                transform={`rotate(${(item - 2) * 8}deg)`}
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  rotate: (item - 2) * 8 
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8,
                    delay: index * 0.2 
                  }
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ 
                  rotate: 0,
                  y: -10,
                  scale: 1.05,
                  zIndex: 1,
                  transition: { duration: 0.3 }
                }}
              >
                <MotionBox
                  className="nft-card-inner"
                  bg="black"
                  p={4}
                  rounded="2xl"
                  border="1px solid"
                  borderColor="rgba(204, 255, 0, 0.3)"
                  position="relative"
                  overflow="hidden"
                  whileHover={{
                    borderColor: 'rgba(204, 255, 0, 0.8)',
                    boxShadow: '0 0 30px rgba(204, 255, 0, 0.2)'
                  }}
                >
                  <Box
                    bg="black"
                    rounded="xl"
                    overflow="hidden"
                    position="relative"
                    height="300px"
                  >
                    <Box
                      position="absolute"
                      inset={0}
                      bg="linear-gradient(45deg, rgba(204, 255, 0, 0.1), transparent)"
                    />
                    <Text
                      position="absolute"
                      top={4}
                      left={4}
                      color="#CCFF00"
                      fontSize="sm"
                      fontWeight="bold"
                      px={3}
                      py={1}
                      bg="rgba(0,0,0,0.8)"
                      rounded="full"
                      borderWidth={1}
                      borderColor="rgba(204, 255, 0, 0.3)"
                    >
                      NFT #{item}
                    </Text>
                    <Box
                      position="absolute"
                      bottom={4}
                      left={4}
                      right={4}
                      p={3}
                      bg="rgba(0,0,0,0.8)"
                      backdropFilter="blur(10px)"
                      rounded="lg"
                      borderWidth={1}
                      borderColor="rgba(204, 255, 0, 0.2)"
                    >
                      <Text color="#CCFF00" fontSize="sm" fontWeight="bold">
                        BANANA TRIBE NFT
                      </Text>
                    </Box>
                  </Box>
                </MotionBox>
              </MotionBox>
            ))}
          </Grid>

          {/* Features Section with Scroll Animations */}
          <MotionBox 
            mt={32} 
            textAlign="center" 
            position="relative" 
            zIndex={2}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Heading
              fontSize={{ base: '3xl', md: '4xl' }}
              mb={16}
              color="#CCFF00"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Game Features
            </Heading>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
              gap={8}
              maxW="1200px"
              mx="auto"
            >
              {[
                {
                  title: 'Unique NFT Collection',
                  description: 'Collect and trade unique gorilla NFTs with different attributes and rarity levels.',
                  icon: '🎨'
                },
                {
                  title: 'Evolution System',
                  description: 'Evolve your gorillas through multiple stages to increase their power and value.',
                  icon: '⚡'
                },
                {
                  title: 'Competitive Gameplay',
                  description: 'Compete with other players on the leaderboard and earn rewards.',
                  icon: '🏆'
                }
              ].map((feature) => (
                <Box
                  key={feature.title}
                  bg="rgba(0,0,0,0.5)"
                  p={8}
                  rounded="xl"
                  border="1px solid"
                  borderColor="rgba(204, 255, 0, 0.2)"
                  _hover={{
                    transform: 'translateY(-8px)',
                    borderColor: 'rgba(204, 255, 0, 0.4)',
                    boxShadow: '0 0 30px rgba(204, 255, 0, 0.1)'
                  }}
                  transition="all 0.3s"
                >
                  <Text fontSize="4xl" mb={4}>{feature.icon}</Text>
                  <Heading
                    fontSize="xl"
                    color="#CCFF00"
                    mb={4}
                  >
                    {feature.title}
                  </Heading>
                  <Text color="gray.300">
                    {feature.description}
                  </Text>
                </Box>
              ))}
            </Grid>
          </MotionBox>

          {/* Roadmap Section with Scroll Animations */}
          <MotionBox 
            mt={32} 
            position="relative" 
            zIndex={2}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Heading
              fontSize={{ base: '3xl', md: '4xl' }}
              mb={16}
              color="#CCFF00"
              textTransform="uppercase"
              letterSpacing="wide"
              textAlign="center"
            >
              Roadmap
            </Heading>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
              gap={8}
              maxW="1200px"
              mx="auto"
            >
              {[
                {
                  phase: 'Phase 1',
                  title: 'Launch',
                  items: ['Initial NFT Collection', 'Marketplace Integration', 'Community Building']
                },
                {
                  phase: 'Phase 2',
                  title: 'Evolution',
                  items: ['Evolution Mechanics', 'Attribute System', 'Rarity Tiers']
                },
                {
                  phase: 'Phase 3',
                  title: 'Gameplay',
                  items: ['PvP Battles', 'Leaderboard System', 'Reward Distribution']
                },
                {
                  phase: 'Phase 4',
                  title: 'Expansion',
                  items: ['New NFT Collections', 'Cross-Chain Integration', 'Mobile App']
                }
              ].map((phase, index) => (
                <Box
                  key={phase.phase}
                  bg="rgba(0,0,0,0.5)"
                  p={6}
                  rounded="xl"
                  border="1px solid"
                  borderColor="rgba(204, 255, 0, 0.2)"
                  position="relative"
                  _hover={{
                    borderColor: 'rgba(204, 255, 0, 0.4)',
                    transform: 'translateY(-8px)',
                    boxShadow: '0 0 30px rgba(204, 255, 0, 0.1)'
                  }}
                  transition="all 0.3s"
                >
                  <Box
                    position="absolute"
                    top="-12px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="#CCFF00"
                    color="black"
                    px={4}
                    py={1}
                    rounded="full"
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    {phase.phase}
                  </Box>
                  <Heading
                    fontSize="xl"
                    color="white"
                    mb={4}
                    mt={4}
                    textAlign="center"
                  >
                    {phase.title}
                  </Heading>
                  <VStack spacing={2} align="stretch">
                    {phase.items.map((item) => (
                      <HStack key={item} spacing={2}>
                        <Box
                          w="6px"
                          h="6px"
                          rounded="full"
                          bg="#CCFF00"
                          flexShrink={0}
                        />
                        <Text color="gray.300" fontSize="sm">
                          {item}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              ))}
            </Grid>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
} 