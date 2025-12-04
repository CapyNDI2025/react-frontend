import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useChatStore } from '../../lib/store/chatStore';
import * as THREE from 'three';

const ThreeAtmAsteroid = () => {
  const group = useRef();
  const [active, setActive] = useState(false);
  
  // Store actions
  const addMessage = useChatStore(state => state.addMessage);
  const setEmotion = useChatStore(state => state.setEmotion);

  // Random start time: Start between 5s and 10s for faster testing
  const nextPass = useRef(Math.random() * 5 + 5); 

  useFrame((state, delta) => {
    // Timer logic
    if (!active) {
      nextPass.current -= delta;
      if (nextPass.current <= 0) {
        setActive(true);
      }
    } else {
      if (!group.current) return;

      // Move asteroid
      group.current.position.x += delta * 3; // Slightly slower to be easier to click
      
      // Rotate asteroid
      group.current.rotation.x += delta * 0.5;
      group.current.rotation.y += delta * 0.3;

      // Check if out of bounds (Right side)
      if (group.current.position.x > 15) {
        setActive(false);
        nextPass.current = Math.random() * 30 + 15; // Next pass in 15-45s
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setEmotion('france');
    addMessage({
      role: 'assistant',
      content: "🇫🇷 COCORICO ! 🇫🇷\n\nEnchanté ! Je suis Jean-Michel Abysse, une IA fièrement développée avec amour (et du code). J'ai une passion secrète pour la France : ses paysages, sa gastronomie, et bien sûr, son esprit révolutionnaire ! 🥖🍷🧀\n\nVive la République, vive le Code et vive la France !"
    });
  };

  // We render the group always but hide it or move it when inactive?
  // Better to conditionally render or just move it far away.
  // If we conditionally render the group, the ref might be lost.
  // Let's just position it far away when inactive.
  
  const initialPos = [-15, 2, -5]; // Start left, slightly up, background

  if (!active) return null;

  return (
    <group 
      ref={group} 
      position={initialPos} 
      onClick={handleClick} 
      scale={0.6}
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'default' }}
    >
      {/* Asteroid Body */}
      <mesh>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#666" roughness={0.9} />
      </mesh>

      {/* Flag Pole */}
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 2]} />
        <meshStandardMaterial color="#888" metalness={0.8} />
      </mesh>

      {/* Flag (Blue White Red) */}
      <group position={[0.5, 1.5, 0]} rotation={[0, 0, -0.2]}>
        {/* Blue */}
        <mesh position={[-0.34, 0, 0]}>
          <boxGeometry args={[0.33, 0.6, 0.02]} />
          <meshStandardMaterial color="#0055A4" />
        </mesh>
        {/* White */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.33, 0.6, 0.02]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        {/* Red */}
        <mesh position={[0.34, 0, 0]}>
          <boxGeometry args={[0.33, 0.6, 0.02]} />
          <meshStandardMaterial color="#EF4135" />
        </mesh>
      </group>
    </group>
  );
};

export default ThreeAtmAsteroid;