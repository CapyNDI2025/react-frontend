import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, MeshDistortMaterial, Sparkles, Box } from '@react-three/drei';
import { useChatStore } from '../../lib/store/chatStore';
import * as THREE from 'three';

const ThreeAtmAvatar = (props) => {
  const group = useRef();
  const head = useRef();
  const ring = useRef();
  
  // Connect to Zustand store
  const status = useChatStore((state) => state.status);
  const emotion = useChatStore((state) => state.emotion);

  // Animation Logic
  useFrame((state, delta) => {
    if (!group.current) return;

    // Idle Animation
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.mouse.x * 0.2, 0.1);

    // Status-based animations
    switch (status) {
      case 'thinking':
        ring.current.rotation.z += delta * 8;
        ring.current.rotation.x += delta * 3;
        head.current.distort = THREE.MathUtils.lerp(head.current.distort, 0.8, 0.1);
        head.current.speed = 8;
        break;
      case 'speaking':
        const scale = 1 + Math.sin(state.clock.elapsedTime * 15) * 0.05;
        head.current.scale.set(scale, scale, scale);
        ring.current.rotation.z += delta * 0.5;
        head.current.distort = THREE.MathUtils.lerp(head.current.distort, 0.3, 0.1);
        head.current.speed = 2;
        break;
      case 'error':
        group.current.position.x = Math.sin(state.clock.elapsedTime * 30) * 0.1;
        break;
      default: // idle
        ring.current.rotation.z += delta * 0.2;
        head.current.distort = THREE.MathUtils.lerp(head.current.distort, 0.1, 0.1);
        head.current.speed = 1;
        break;
    }
  });

  // --- COLORS ---
  const getPrimaryColor = () => {
    if (status === 'thinking') return '#FF8C00'; // Dark Orange / Gold for thinking
    if (status === 'error') return '#FF0000';

    switch (emotion) {
      case 'happy': return '#FFD700';     // Gold
      case 'sad': return '#1E90FF';       // Dodger Blue
      case 'angry': return '#8B0000';     // Dark Red
      case 'surprised': return '#FF69B4'; // Hot Pink
      default: return '#4B0082';          // Indigo (Neutral)
    }
  };

  // --- EXPRESSIONS ---
  const expressions = useMemo(() => {
    const isAngry = emotion === 'angry';
    const isSad = emotion === 'sad';
    const isHappy = emotion === 'happy';
    const isSurprised = emotion === 'surprised';

    return {
      eyeRotation: isAngry ? 0.4 : (isSad ? -0.2 : 0),
      mouthArc: isSurprised ? Math.PI * 2 : (isHappy ? Math.PI : (isSad || isAngry ? Math.PI * 0.8 : Math.PI * 0.5)),
      mouthRotation: isSad || isAngry ? 0 : 3.14, // 0 = frown (down), 3.14 = smile (up)
      mouthY: isSurprised ? -0.2 : -0.15,
      showTears: isSad,
      showEyebrows: isAngry
    };
  }, [emotion]);

  return (
    <group ref={group} {...props}>
      {/* Planet Core */}
      <Sphere ref={head} args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial 
          color={getPrimaryColor()} 
          roughness={0.2} 
          metalness={0.8}
          distort={0.3}
          speed={1.5}
        />
      </Sphere>

      {/* FACE GROUP */}
      <group position={[0, 0, 0.95]}>
        
        {/* Eyes Container */}
        <group position={[0, 0.15, 0]}>
          {/* Left Eye */}
          <Sphere args={[0.12, 32, 32]} position={[-0.35, 0, 0]}>
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.8} />
          </Sphere>
          {/* Right Eye */}
          <Sphere args={[0.12, 32, 32]} position={[0.35, 0, 0]}>
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.8} />
          </Sphere>

          {/* Eyebrows (Angry) */}
          {expressions.showEyebrows && (
            <>
              <Box args={[0.3, 0.05, 0.05]} position={[-0.35, 0.2, 0.05]} rotation={[0, 0, -0.4]}>
                <meshStandardMaterial color="black" />
              </Box>
              <Box args={[0.3, 0.05, 0.05]} position={[0.35, 0.2, 0.05]} rotation={[0, 0, 0.4]}>
                <meshStandardMaterial color="black" />
              </Box>
            </>
          )}

          {/* Tears (Sad) */}
          {expressions.showTears && (
            <>
              <Sphere args={[0.05, 16, 16]} position={[-0.35, -0.2, 0.1]}>
                <meshPhysicalMaterial color="#00FFFF" transmission={0.9} roughness={0} />
              </Sphere>
              <Sphere args={[0.05, 16, 16]} position={[0.35, -0.2, 0.1]}>
                <meshPhysicalMaterial color="#00FFFF" transmission={0.9} roughness={0} />
              </Sphere>
            </>
          )}
        </group>

        {/* Mouth */}
        <Torus 
          key={emotion} // Force re-render when emotion changes to ensure geometry updates correctly
          args={[0.2, 0.04, 16, 32, expressions.mouthArc]} 
          position={[0, expressions.mouthY, 0]} 
          rotation={[0, 0, expressions.mouthRotation]}
        >
           <meshStandardMaterial color="white" />
        </Torus>
      </group>

      {/* Energy Particles */}
      <Sparkles count={50} scale={3} size={2} speed={0.4} opacity={0.5} color={getPrimaryColor()} />

      {/* Halo Ring */}
      <Torus ref={ring} args={[1.6, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color={getPrimaryColor()} 
          emissive={getPrimaryColor()}
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </Torus>
    </group>
  );
};

export default ThreeAtmAvatar;
