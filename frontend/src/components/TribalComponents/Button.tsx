import React from 'react';
import { Button as ChakraButton, ButtonProps, Icon, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(229, 255, 68, 0.3); }
  50% { box-shadow: 0 0 15px rgba(229, 255, 68, 0.5); }
  100% { box-shadow: 0 0 5px rgba(229, 255, 68, 0.3); }
`;

const rippleEffect = keyframes`
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
`;

export interface TribalButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ElementType;
  glowOnHover?: boolean;
}

const MotionButton = motion(ChakraButton);

export const TribalButton: React.FC<TribalButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  glowOnHover = true,
  ...props
}) => {
  const variants = {
    primary: {
      bg: 'rgba(42, 76, 59, 0.3)',
      borderColor: 'rgba(229, 255, 68, 0.3)',
      color: 'white',
      _hover: {
        bg: 'rgba(42, 76, 59, 0.5)',
        borderColor: 'rgba(229, 255, 68, 0.5)',
        _before: {
          transform: "translateX(100%)",
        },
        animation: glowOnHover ? `${glowPulse} 2s infinite` : 'none',
      },
    },
    secondary: {
      bg: 'rgba(107, 75, 255, 0.2)',
      borderColor: 'rgba(107, 75, 255, 0.3)',
      color: 'white',
      _hover: {
        bg: 'rgba(107, 75, 255, 0.3)',
        borderColor: 'rgba(107, 75, 255, 0.5)',
        _before: {
          transform: "translateX(100%)",
        },
        animation: glowOnHover ? `${glowPulse} 2s infinite` : 'none',
      },
    },
    danger: {
      bg: 'rgba(255, 68, 68, 0.2)',
      borderColor: 'rgba(255, 68, 68, 0.3)',
      color: 'white',
      _hover: {
        bg: 'rgba(255, 68, 68, 0.3)',
        borderColor: 'rgba(255, 68, 68, 0.5)',
        _before: {
          transform: "translateX(100%)",
        },
        animation: glowOnHover ? `${glowPulse} 2s infinite` : 'none',
      },
    },
  };

  return (
    <MotionButton
      position="relative"
      overflow="hidden"
      borderRadius="xl"
      border="1px solid"
      transition="all 0.3s ease"
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(229, 255, 68, 0.2), transparent)",
        transform: "translateX(-100%)",
        transition: "transform 0.5s ease",
      }}
      _active={{
        _after: {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "rgba(229, 255, 68, 0.3)",
          transform: "translate(-50%, -50%)",
          animation: `${rippleEffect} 0.8s ease-out`,
        },
      }}
      leftIcon={icon && <Icon as={icon} className="button-icon" />}
      {...variants[variant]}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export default TribalButton; 