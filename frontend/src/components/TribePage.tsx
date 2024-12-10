import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export default function TribePage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading color="white">My Tribe</Heading>
        <Text color="gray.300">
          Manage your tribe of up to 5 gorillas. Optimize their composition for maximum score potential.
        </Text>
        {/* Tribe management interface will be implemented here */}
      </VStack>
    </Container>
  );
} 