import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export default function LeaderboardPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading color="white">Tribe Leaderboard</Heading>
        <Text color="gray.300">
          Compete with other players based on tribe scores. Rankings are determined by total stats, stage distribution, and rarity distribution.
        </Text>
        {/* Leaderboard interface will be implemented here */}
      </VStack>
    </Container>
  );
} 