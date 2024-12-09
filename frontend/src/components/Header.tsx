import React from 'react';
import { Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import WalletConnector from './WalletConnector';

const Header: React.FC = () => {
  return (
    <Flex align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="rgba(0,0,0,0.5)">
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'tighter'} color="white">
          CryptoGorilla Game
        </Heading>
      </Flex>
      <Spacer />
      <Text color="white" mr={4}>Complete weekly quests and earn</Text>
      <WalletConnector />
    </Flex>
  );
};

export default Header;