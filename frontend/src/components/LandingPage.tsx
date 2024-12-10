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
} from '@chakra-ui/react';

export default function LandingPage() {
  const navigate = useNavigate();

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
            <Link as={RouterLink} to="/nucks" _hover={{ color: '#CCFF00' }} transition="colors 0.2s">
              NUCKS
            </Link>
            <Link as={RouterLink} to="/auonc" _hover={{ color: '#CCFF00' }} transition="colors 0.2s">
              AUONC
            </Link>
            <Link as={RouterLink} to="/pyrocis" _hover={{ color: '#CCFF00' }} transition="colors 0.2s">
              PYROCIS
            </Link>
            <Link as={RouterLink} to="/auot" _hover={{ color: '#CCFF00' }} transition="colors 0.2s">
              AUOT
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

        {/* Hero Section */}
        <Container maxW="container.xl" pt={{ base: 20, md: 32 }} pb={20}>
          <Box textAlign="center" mb={16}>
            <Box
              mx="auto"
              mb={8}
              position="relative"
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
              <Image
                src="/images/tribe-logo.png"
                alt="THE TRIBE"
                mx="auto"
                maxW={{ base: "280px", md: "400px" }}
                w="full"
                filter="drop-shadow(0 0 20px rgba(204, 255, 0, 0.3))"
              />
            </Box>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              color="#CCFF00"
              mb={12}
              letterSpacing="wide"
              opacity={0.9}
            >
              BLOCKCHAIN GAME
            </Text>
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
          </Box>

          {/* NFT Cards */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={8}
            maxW="900px"
            mx="auto"
            px={4}
          >
            {[1, 2, 3].map((item) => (
              <Box
                key={item}
                className="nft-card"
                position="relative"
                transform={`rotate(${(item - 2) * 8}deg)`}
                transition="all 0.3s"
                _hover={{ 
                  transform: 'rotate(0deg) translateY(-10px)',
                  zIndex: 1
                }}
              >
                <Box
                  className="nft-card-inner"
                  bg="black"
                  p={4}
                  rounded="2xl"
                  border="1px solid"
                  borderColor="rgba(204, 255, 0, 0.3)"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '200%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(204, 255, 0, 0.2), transparent)',
                    animation: 'shine 2s infinite'
                  }}
                  _hover={{
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
                </Box>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
} 