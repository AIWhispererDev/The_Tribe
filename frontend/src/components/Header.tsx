import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Link,
  useBreakpointValue,
  Icon,
} from '@chakra-ui/react';
import { Menu, Wallet } from 'lucide-react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { connect, account, connected, disconnect } = useWallet();

  const navItems = [
    { path: '/tribe', label: 'MY TRIBE' },
    { path: '/mint', label: 'MINT GORILLA' },
    { path: '/evolve', label: 'EVOLVE' },
    { path: '/leaderboard', label: 'LEADERBOARD' },
  ];

  const handleWalletClick = () => {
    if (connected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <Box bg="blackAlpha.900" py={4}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Link 
            as={RouterLink} 
            to="/"
            fontSize="2xl"
            fontWeight="bold"
            color="#CCFF00"
            _hover={{ textDecoration: 'none' }}
          >
            TRIBE
          </Link>

          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                color={location.pathname === item.path ? '#CCFF00' : 'white'}
                _hover={{ color: '#CCFF00' }}
                transition="colors 0.2s"
              >
                {item.label}
              </Link>
            ))}
          </HStack>

          <HStack spacing={4}>
            <Button
              leftIcon={<Icon as={Wallet} />}
              onClick={handleWalletClick}
              colorScheme={connected ? 'green' : 'gray'}
              variant="outline"
            >
              {connected ? 'Connected' : 'Connect Wallet'}
            </Button>
            {isMobile && (
              <Button
                p={2}
                variant="ghost"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
              >
                <Icon as={Menu} boxSize={6} />
              </Button>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}