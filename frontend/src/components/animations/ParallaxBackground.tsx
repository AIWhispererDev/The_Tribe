import React, { useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { jungleGradient } from '../../styles/animations';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ children }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Box
      position="relative"
      minH="100vh"
      overflow="hidden"
      bg="#0A0D11"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgGradient: 'linear(to-b, rgba(42, 76, 59, 0.2), rgba(10, 13, 17, 0.8))',
        animation: `${jungleGradient} 15s ease infinite`,
        backgroundSize: '200% 200%',
        zIndex: 0,
      }}
    >
      {/* Vine Silhouettes */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.1}
        backgroundImage="url('/vine-silhouette.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        zIndex={1}
      />

      {/* Particle Effects */}
      <Particles
        id="jungle-particles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 50 },
            color: { value: "#4CAF50" },
            shape: { type: "circle" },
            opacity: {
              value: 0.3,
              random: true,
            },
            size: {
              value: 3,
              random: true,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "out" }
            }
          }
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 2
        }}
      />

      {/* Light Rays */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity={0.1}
        background="radial-gradient(circle at 50% -20%, rgba(255,255,255,0.3) 0%, transparent 70%)"
        zIndex={3}
      />

      {/* Content Container */}
      <Box position="relative" zIndex={4}>
        {children}
      </Box>
    </Box>
  );
};

export default ParallaxBackground;
