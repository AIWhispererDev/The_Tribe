// Keyframe animations
import { keyframes as chakraKeyframes } from '@chakra-ui/react';

export const floatAnimation = chakraKeyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const twinkleAnimation = chakraKeyframes`
  0% { opacity: 0.2; }
  50% { opacity: 0.8; }
  100% { opacity: 0.2; }
`;

export const jungleGradient = chakraKeyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export const lightRay = chakraKeyframes`
  0% { transform: rotate(0deg) translate(-50%, -50%) scale(1); opacity: 0.3; }
  50% { transform: rotate(180deg) translate(-50%, -50%) scale(1.2); opacity: 0.5; }
  100% { transform: rotate(360deg) translate(-50%, -50%) scale(1); opacity: 0.3; }
`;

export const drumBeat = chakraKeyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

export const tribalPattern = chakraKeyframes`
  0% { transform: translateX(-100%) rotate(0deg); opacity: 0; }
  100% { transform: translateX(100%) rotate(360deg); opacity: 0.3; }
`;
