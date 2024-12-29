import React from 'react';
import { Box } from '@chakra-ui/react';

const ConnectingLine: React.FC = () => (
  <Box
    position="absolute"
    height="2px"
    width="100%"
    left="50%"
    top="50%"
    transform="translateY(-50%)"
    zIndex={0}
    sx={{
      background: 'linear-gradient(90deg, rgba(107, 75, 255, 0.3), rgba(107, 75, 255, 0.1))',
      _before: {
        content: '""',
        position: 'absolute',
        width: '10px',
        height: '10px',
        borderRadius: 'full',
        background: 'linear-gradient(45deg, rgba(107, 75, 255, 0.8), rgba(107, 75, 255, 0.4))',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        boxShadow: '0 0 10px rgba(107, 75, 255, 0.3)',
        zIndex: 0
      }
    }}
  />
);

export default ConnectingLine;
