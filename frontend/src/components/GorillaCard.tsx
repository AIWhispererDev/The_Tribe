import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GorillaCardProps {
  gorilla: {
    id: string;
    name: string;
    strength: number;
    intelligence: number;
    socialSkills: number;
    agility: number;
    endurance: number;
    leadership: number;
    stage: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
  } | null;
  onMint: () => void;
  onEvolve: (id: string) => void;
  onBurn: (id: string) => void;
  score: number;
  isRecommendedBurn: boolean;
}

const rarityColors = {
  common: '#FDE68A',
  rare: '#93C5FD',
  epic: '#C084FC',
  legendary: '#FCD34D',
};

const GorillaCard: React.FC<GorillaCardProps> = ({ gorilla, onMint, onEvolve, onBurn, score, isRecommendedBurn }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!gorilla) {
    return (
      <div style={{ 
        width: '220px', 
        height: '300px', 
        backgroundColor: '#2D3748', 
        borderRadius: '10px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '1rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          width: '100%', 
          height: '70%', 
          backgroundColor: '#4A5568', 
          borderRadius: '8px', 
          marginBottom: '1rem' 
        }} />
        <button 
          onClick={onMint} 
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#3182CE', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
        >
          Mint
        </button>
      </div>
    );
  }

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const cardFront = (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: rarityColors[gorilla.rarity],
      borderRadius: '10px',
      padding: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '8px', padding: '8px', marginBottom: '8px' }}>
        <h3 style={{ margin: 0, color: '#1F2937', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{gorilla.name}</h3>
        <span style={{ fontSize: '0.8rem', color: '#4B5563' }}>Stage: {gorilla.stage}</span>
      </div>
      <img 
        src={`/gorilla_${gorilla.stage}.jpg`}
        alt={gorilla.name}
        style={{ 
          width: '100%', 
          height: '160px', 
          objectFit: 'cover', 
          borderRadius: '8px', 
          marginBottom: '8px',
        }}
      />
      <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '8px', padding: '8px' }}>
        <p style={{ margin: 0, color: '#1F2937', fontSize: '0.9rem' }}>
          Power: {gorilla.strength + gorilla.intelligence + gorilla.socialSkills + gorilla.agility + gorilla.endurance + gorilla.leadership}
        </p>
        <p style={{ margin: '4px 0 0 0', fontSize: '0.7rem', color: '#4B5563' }}>Score: {score.toFixed(2)}</p>
        <p style={{ margin: '4px 0 0 0', fontSize: '0.7rem', color: '#4B5563' }}>Flip card to see stats</p>
      </div>
    </div>
  );

  const cardBack = (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: rarityColors[gorilla.rarity],
      borderRadius: '10px',
      padding: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      transform: 'rotateY(180deg)'
    }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#1F2937', fontSize: '1rem' }}>{gorilla.name}</h3>
      <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '8px', padding: '8px', marginBottom: '8px', fontSize: '0.8rem' }}>
        <p style={{ margin: '2px 0', color: '#1F2937' }}>Strength: {gorilla.strength}</p>
        <p style={{ margin: '2px 0', color: '#1F2937' }}>Intelligence: {gorilla.intelligence}</p>
        <p style={{ margin: '2px 0', color: '#1F2937' }}>Social Skills: {gorilla.socialSkills}</p>
        <p style={{ margin: '2px 0', color: '#1F2937' }}>Agility: {gorilla.agility}</p>
        <p style={{ margin: '2px 0', color: '#1F2937' }}>Endurance: {gorilla.endurance}</p>
        <p style={{ margin: '2px 0', color: '#1F2937' }}>Leadership: {gorilla.leadership}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
        {gorilla.stage < 3 && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEvolve(gorilla.id);
            }} 
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#3182CE', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}
          >
            Evolve
          </button>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onBurn(gorilla.id);
          }} 
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#E53E3E', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
        >
          Burn
        </button>
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: '220px',
        height: '300px',
        perspective: '1000px',
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={handleClick}
    >
      {isRecommendedBurn && (
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          backgroundColor: '#E53E3E',
          color: 'white',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.8rem',
          zIndex: 10
        }}>
          !
        </div>
      )}
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s'
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {cardFront}
        {cardBack}
      </motion.div>
    </div>
  );
};

export default GorillaCard;