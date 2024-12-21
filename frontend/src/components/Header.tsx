import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  useBreakpointValue,
  Icon,
} from '@chakra-ui/react';
import { Menu } from 'lucide-react';
import WalletSelector from './WalletSelector';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const navItems = [
    { path: '/tribe', label: 'MY TRIBE' },
    { path: '/mint', label: 'MINT GORILLA' },
    { path: '/evolve', label: 'EVOLVE' },
    { path: '/leaderboard', label: 'LEADERBOARD' },
  ];

  return (
    <Box 
      bg="rgba(0, 0, 0, 0.9)"
      borderBottom="1px solid"
      borderColor="rgba(204, 255, 0, 0.2)"
      backdropFilter="blur(10px)"
      py={4}
      position="relative"
      _after={{
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(204, 255, 0, 0.5), transparent)'
      }}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Link 
            as={RouterLink} 
            to="/"
            fontSize="2xl"
            fontWeight="bold"
            color="#CCFF00"
            _hover={{ 
              textDecoration: 'none',
              textShadow: '0 0 10px rgba(204, 255, 0, 0.5)'
            }}
            transition="all 0.2s"
          >
            TRIBE
          </Link>

          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                color={location.pathname === item.path ? '#CCFF00' : 'whiteAlpha.900'}
                fontWeight="medium"
                fontSize="sm"
                letterSpacing="wide"
                textTransform="uppercase"
                _hover={{ 
                  color: '#CCFF00',
                  textShadow: '0 0 10px rgba(204, 255, 0, 0.5)'
                }}
                transition="all 0.2s"
              >
                {item.label}
              </Link>
            ))}
          </HStack>

          <HStack spacing={4}>
            <WalletSelector />
            {isMobile && (
              <Box
                as="button"
                p={2}
                color="white"
                _hover={{ 
                  bg: 'whiteAlpha.100',
                  color: '#CCFF00'
                }}
                borderRadius="md"
                transition="all 0.2s"
              >
                <Icon as={Menu} boxSize={6} />
              </Box>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}