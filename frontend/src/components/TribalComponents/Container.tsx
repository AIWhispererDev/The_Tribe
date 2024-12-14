import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

// SVG patterns as base64 to avoid external file dependencies
const tribalPatternSVG = `
<svg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
  <pattern id="tribal" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
    <path d="M0 10 L5 5 L10 10 L15 5 L20 10" stroke="rgba(229, 255, 68, 0.3)" fill="none" strokeWidth="1"/>
    <path d="M0 15 L5 10 L10 15 L15 10 L20 15" stroke="rgba(229, 255, 68, 0.2)" fill="none" strokeWidth="1"/>
  </pattern>
  <rect x="0" y="0" width="100" height="20" fill="url(#tribal)"/>
</svg>
`;

const vineSilhouetteSVG = `
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <pattern id="vines" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
    <path d="M10 0 Q30 25 10 50 Q-10 75 10 100" stroke="rgba(42, 76, 59, 0.3)" fill="none" strokeWidth="2"/>
    <path d="M30 0 Q50 25 30 50 Q10 75 30 100" stroke="rgba(42, 76, 59, 0.2)" fill="none" strokeWidth="2"/>
    <path d="M50 0 Q70 25 50 50 Q30 75 50 100" stroke="rgba(42, 76, 59, 0.3)" fill="none" strokeWidth="2"/>
  </pattern>
  <rect x="0" y="0" width="100" height="100" fill="url(#vines)"/>
</svg>
`;

const tribalPatternUrl = `data:image/svg+xml;base64,${btoa(tribalPatternSVG)}`;
const vineSilhouetteUrl = `data:image/svg+xml;base64,${btoa(vineSilhouetteSVG)}`;

export interface TribalContainerProps extends BoxProps {
  variant?: 'default' | 'dark' | 'light';
  showPatterns?: boolean;
  showVines?: boolean;
}

export const TribalContainer: React.FC<TribalContainerProps> = ({
  children,
  variant = 'default',
  showPatterns = true,
  showVines = true,
  ...props
}) => {
  const variants = {
    default: {
      bg: 'linear-gradient(165deg, rgba(42, 76, 59, 0.2), rgba(26, 47, 36, 0.05))',
      borderColor: 'rgba(229, 255, 68, 0.2)',
    },
    dark: {
      bg: 'linear-gradient(165deg, rgba(10, 13, 17, 0.8), rgba(10, 13, 17, 0.6))',
      borderColor: 'rgba(229, 255, 68, 0.1)',
    },
    light: {
      bg: 'linear-gradient(165deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      borderColor: 'rgba(229, 255, 68, 0.3)',
    },
  };

  return (
    <Box
      position="relative"
      borderRadius="2xl"
      overflow="hidden"
      backdropFilter="blur(10px)"
      border="1px solid"
      p={6}
      {...variants[variant]}
      {...props}
    >
      {/* Tribal Pattern Overlay */}
      {showPatterns && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="2px"
          backgroundImage={`url(${tribalPatternUrl})`}
          backgroundSize="contain"
          opacity={0.5}
          _after={{
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            right: 0,
            height: '2px',
            backgroundImage: `url(${tribalPatternUrl})`,
            backgroundSize: 'contain',
            transform: 'rotate(180deg)',
          }}
        />
      )}

      {/* Vine Silhouettes */}
      {showVines && (
        <Box
          position="absolute"
          inset={0}
          backgroundImage={`url(${vineSilhouetteUrl})`}
          backgroundSize="cover"
          opacity={0.1}
          pointerEvents="none"
        />
      )}

      {/* Content */}
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  );
};

export default TribalContainer; 