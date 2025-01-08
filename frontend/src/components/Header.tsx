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
import { useWallet } from '../contexts/WalletContext';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { adapter } = useWallet();

  const navItems = [
    { path: '/tribe', label: 'MY TRIBE' },
    { path: '/mint', label: 'MINT GORILLA' },
    { path: '/evolve', label: 'EVOLVE' },
    { path: '/leaderboard', label: 'LEADERBOARD' },
  ];

  return (
    <Box
      as="header"
      position="fixed"
      w="100%"
      zIndex={10}
      backdropFilter="blur(10px)"
      bg="rgba(0, 0, 0, 0.3)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" h="4rem">
          {/* Logo */}
          <Link
            as={RouterLink}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            color="white"
            _hover={{ textDecoration: 'none', color: 'purple.300' }}
          >
            CryptoGorilla
          </Link>

          {/* Navigation */}
          {!isMobile && (
            <HStack spacing={8}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  color={location.pathname === item.path ? 'purple.300' : 'white'}
                  fontWeight={location.pathname === item.path ? 'bold' : 'normal'}
                  _hover={{ color: 'purple.300' }}
                >
                  {item.label}
                </Link>
              ))}
            </HStack>
          )}

          {/* Wallet */}
          <WalletSelector adapter={adapter} />

          {/* Mobile Menu */}
          {isMobile && (
            <Box color="white" cursor="pointer">
              <Icon as={Menu} boxSize={6} />
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  );
}