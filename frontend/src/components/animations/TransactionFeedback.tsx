import React from 'react';
import { HStack, Text, Icon } from '@chakra-ui/react';
import { TreePine, Leaf, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { TribalContainer } from '../TribalComponents';

interface TransactionFeedbackProps {
  status: 'pending' | 'success' | 'error' | null;
}

const TransactionFeedback: React.FC<TransactionFeedbackProps> = ({ status }) => {
  if (!status) return null;

  const config = {
    pending: {
      color: '#E5FF44',
      icon: TreePine,
      text: 'Transaction in progress...'
    },
    success: {
      color: '#2A4C3B',
      icon: Leaf,
      text: 'Transaction successful!'
    },
    error: {
      color: '#FF4444',
      icon: Flame,
      text: 'Transaction failed'
    }
  };

  const currentConfig = config[status];

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <TribalContainer
        position="fixed"
        bottom="4"
        right="4"
        minW="300px"
        variant="dark"
        showVines={false}
      >
        <HStack spacing={4}>
          <motion.div
            animate={{ 
              rotate: status === 'pending' ? 360 : 0,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
          >
            <Icon 
              as={currentConfig.icon} 
              w={6} 
              h={6} 
              color={currentConfig.color} 
            />
          </motion.div>
          <Text color={currentConfig.color}>
            {currentConfig.text}
          </Text>
        </HStack>
      </TribalContainer>
    </motion.div>
  );
};

export default TransactionFeedback;
