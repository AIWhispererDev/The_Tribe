import React from 'react';
import { Text } from '@chakra-ui/react';

interface TribeStatsProps {
  tribeScore: number;
}

const TribeStats: React.FC<TribeStatsProps> = ({ tribeScore }) => (
  <Text fontSize="2xl">Tribe Score: {tribeScore}</Text>
);

export default TribeStats;