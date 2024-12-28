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
              color: '#E5FF44'
            }}
          >
            CRYPTOGORILLA
          </Link>

          {isMobile ? (
            <Icon as={Menu} boxSize={6} color="white" />
          ) : (
            <HStack spacing={8} align="center">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  color={location.pathname === item.path ? '#CCFF00' : 'white'}
                  fontWeight="medium"
                  fontSize="sm"
                  _hover={{ 
                    color: '#E5FF44',
                    textDecoration: 'none'
                  }}
                  transition="color 0.2s"
                >
                  {item.label}
                </Link>
              ))}
              <Box ml={4}>
                <WalletSelector />
              </Box>
            </HStack>
          )}
        </Flex>
      </Container>
    </Box>
  );
}