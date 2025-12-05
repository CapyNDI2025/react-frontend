import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sparkles, Float } from '@react-three/drei';
import { useChatStore } from '../../lib/store/chatStore';

const ThreeAtmAsteroid = () => {
  const group = useRef();
  const [active, setActive] = useState(false);
  
  const addMessage = useChatStore(state => state.addMessage);
  const setEmotion = useChatStore(state => state.setEmotion);

  const nextPass = useRef(Math.random() * 5 + 5); 

  useFrame((state, delta) => {
    if (!active) {
      nextPass.current -= delta;
      if (nextPass.current <= 0) {
        setActive(true);
      }
    } else {
      if (!group.current) return;

      group.current.position.x += delta * 3;
      
      group.current.rotation.x += delta * 0.5;
      group.current.rotation.y += delta * 0.3;

      if (group.current.position.x > 15) {
        setActive(false);
        nextPass.current = Math.random() * 30 + 15;
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
  
  const initialPos = [-15, 2, -5];

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
      <Float speed={5} rotationIntensity={2} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial 
            color="#8B7355" 
            roughness={0.6}
            metalness={0.4}
            distort={0.3}
            speed={2}
            radius={1}
          />
        </mesh>

        <mesh position={[0.7, 0.3, 0.3]} scale={0.25}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#5C4033" />
        </mesh>
        <mesh position={[-0.6, -0.4, 0.5]} scale={0.2}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#5C4033" />
        </mesh>
        <mesh position={[0.2, 0.8, -0.3]} scale={0.15}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#5C4033" />
        </mesh>

        <mesh position={[0, 0.8, 0]} rotation={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.04, 0.04, 2.2]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
        </mesh>

        <group position={[0.5, 1.5, 0]} rotation={[0, 0, -0.2]}>
          <mesh position={[-0.34, 0, 0]}>
            <boxGeometry args={[0.33, 0.6, 0.05]} />
            <meshStandardMaterial color="#0055A4" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.33, 0.6, 0.05]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0.34, 0, 0]}>
            <boxGeometry args={[0.33, 0.6, 0.05]} />
            <meshStandardMaterial color="#EF4135" />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

export default ThreeAtmAsteroid;