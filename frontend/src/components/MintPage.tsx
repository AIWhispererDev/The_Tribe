import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export default function MintPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading color="white">Mint New Gorilla</Heading>
        <Text color="gray.300">
          Mint new gorillas for 1 APT each. Each gorilla is randomly generated with unique attributes and starts at stage 0.
        </Text>
        {/* Minting interface will be implemented here */}
      </VStack>
    </Container>
  );
} 