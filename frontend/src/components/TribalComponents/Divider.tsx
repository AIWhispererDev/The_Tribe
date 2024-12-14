import React from 'react';
import { Box, BoxProps, keyframes } from '@chakra-ui/react';

const pulsate = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

// SVG for tribal pattern
const tribalDividerSVG = `
<svg width="100" height="10" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
  <pattern id="tribal-divider" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
    <path d="M0 5 L5 0 L10 5 L15 0 L20 5" stroke="rgba(229, 255, 68, 0.3)" fill="none" strokeWidth="1"/>
    <path d="M0 10 L5 5 L10 10 L15 5 L20 10" stroke="rgba(229, 255, 68, 0.2)" fill="none" strokeWidth="1"/>
  </pattern>
  <rect x="0" y="0" width="100" height="10" fill="url(#tribal-divider)"/>
</svg>
`;

const tribalDividerUrl = `data:image/svg+xml;base64,${btoa(tribalDividerSVG)}`;

export interface TribalDividerProps extends BoxProps {
  variant?: 'default' | 'glowing' | 'minimal';
  showPattern?: boolean;
}

export const TribalDivider: React.FC<TribalDividerProps> = ({
  variant = 'default',
  showPattern = true,
  ...props
}) => {
  const variants = {
    default: {
      bg: 'linear-gradient(90deg, transparent, rgba(229, 255, 68, 0.3), transparent)',
      height: '1px',
    },
    glowing: {
      bg: 'linear-gradient(90deg, transparent, rgba(229, 255, 68, 0.5), transparent)',
      height: '2px',
      boxShadow: '0 0 10px rgba(229, 255, 68, 0.3)',
    },
    minimal: {
      bg: 'linear-gradient(90deg, transparent, rgba(229, 255, 68, 0.15), transparent)',
      height: '1px',
    },
  };

  return (
    <Box
      w="full"
      my={8}
      position="relative"
      {...variants[variant]}
      {...props}
    >
      {/* Center Dot */}
      <Box
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        width="10px"
        height="10px"
        borderRadius="full"
        bg="#E5FF44"
        boxShadow="0 0 10px #E5FF44"
        animation={`${pulsate} 2s infinite ease-in-out`}
      />

      {/* Tribal Pattern */}
      {showPattern && (
        <>
          <Box
            position="absolute"
            left={0}
            top="-4px"
            width="40%"
            height="10px"
            backgroundImage={`url(${tribalDividerUrl})`}
            backgroundSize="contain"
            opacity={0.5}
          />
          <Box
            position="absolute"
            right={0}
            top="-4px"
            width="40%"
            height="10px"
            backgroundImage={`url(${tribalDividerUrl})`}
            backgroundSize="contain"
            opacity={0.5}
            transform="scaleX(-1)"
          />
        </>
      )}
    </Box>
  );
};

export default TribalDivider; 