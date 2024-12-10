import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export default function EvolvePage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading color="white">Evolve Gorillas</Heading>
        <Text color="gray.300">
          Evolve your gorillas for 0.5 APT each. Evolution increases stage and attributes, enhancing your tribe's overall score.
        </Text>
        {/* Evolution interface will be implemented here */}
      </VStack>
    </Container>
  );
} 