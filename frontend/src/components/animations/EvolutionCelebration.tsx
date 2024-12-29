import React, { useCallback } from 'react';
import { Box, Text, VStack, Icon } from '@chakra-ui/react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { tribalPattern, drumBeat } from '../../styles/animations';

const EvolutionCelebration: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        position="fixed"
        inset={0}
        zIndex={50}
        overflow="hidden"
        bg="rgba(10, 13, 17, 0.9)"
      >
        {/* Tribal Patterns */}
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            position="absolute"
            top={`${20 * i}%`}
            left={0}
            width="100%"
            height="20px"
            opacity={0}
            background="url('/tribal-pattern.png')"
            backgroundSize="contain"
            animation={`${tribalPattern} ${3 + i * 0.5}s infinite linear`}
          />
        ))}

        {/* Central Animation */}
        <VStack
          spacing={8}
          justify="center"
          align="center"
          h="full"
          position="relative"
        >
          {/* Drum Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Box
              w="200px"
              h="200px"
              borderRadius="full"
              border="4px solid"
              borderColor="#E5FF44"
              position="relative"
              animation={`${drumBeat} 1s infinite`}
              _before={{
                content: '""',
                position: "absolute",
                inset: "-20px",
                border: "2px solid",
                borderColor: "rgba(229, 255, 68, 0.3)",
                borderRadius: "full",
              }}
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Icon 
                  as={Star} 
                  w={20} 
                  h={20} 
                  color="#E5FF44"
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                />
              </motion.div>
            </Box>
          </motion.div>

          {/* Text Animation */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Text
              fontSize="4xl"
              fontWeight="bold"
              bgGradient="linear(to-r, #E5FF44, #6B4BFF)"
              bgClip="text"
              textAlign="center"
              textShadow="0 0 20px rgba(229, 255, 68, 0.3)"
            >
              Evolution Complete!
            </Text>
          </motion.div>

          {/* Nature Particles */}
          <Particles
            id="evolution-particles"
            init={particlesInit}
            options={{
              particles: {
                number: { value: 100 },
                color: { value: "#E5FF44" },
                shape: { type: "circle" },
                opacity: {
                  value: 0.5,
                  random: true,
                  animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                  }
                },
                size: {
                  value: 3,
                  random: true,
                  animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 0.5,
                  }
                },
                move: {
                  enable: true,
                  speed: 3,
                  direction: "top",
                  random: true,
                  straight: false,
                  outModes: { default: "out" }
                }
              }
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%"
            }}
          />
        </VStack>
      </Box>
    </motion.div>
  );
};

export default EvolutionCelebration;
