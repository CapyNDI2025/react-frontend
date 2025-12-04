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
    // Reduced bobbing amplitude to be less distracting
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    
    // Adjusted rotation tracking:
    // The planet is visually on the left (approx x = -0.5 in normalized screen space).
    // We adjust the target so it looks "at" the mouse relative to its own position.
    // Also reduced the intensity of the tracking.
    const targetRotation = (state.mouse.x + 0.25) * 0.1; 
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotation, 0.05);

    // Status-based animations
    switch (status) {
      case 'thinking':
        ring.current.rotation.z += delta * 4; // Slower thinking spin
        ring.current.rotation.x += delta * 1.5;
        head.current.distort = THREE.MathUtils.lerp(head.current.distort, 0.6, 0.1); // Less distortion
        head.current.speed = 4;
        break;
      case 'speaking':
        const scale = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.02; // Subtler pulse
        head.current.scale.set(scale, scale, scale);
        ring.current.rotation.z += delta * 0.5;
        head.current.distort = THREE.MathUtils.lerp(head.current.distort, 0.3, 0.1);
        head.current.speed = 2;
        break;
      case 'error':
        group.current.position.x = Math.sin(state.clock.elapsedTime * 20) * 0.05;
        break;
      default: // idle
        ring.current.rotation.z += delta * 0.1;
        head.current.distort = THREE.MathUtils.lerp(head.current.distort, 0.1, 0.1); // Minimal distortion in idle
        head.current.speed = 0.5; // Slower distortion speed
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
      case 'france': return '#0055A4';    // French Blue
      default: return '#4B0082';          // Indigo (Neutral)
    }
  };

  // --- EXPRESSIONS ---
  const expressions = useMemo(() => {
    const isAngry = emotion === 'angry';
    const isSad = emotion === 'sad';
    const isHappy = emotion === 'happy';
    const isSurprised = emotion === 'surprised';

    // Calculate Mouth Shape & Rotation
    let mouthArc = Math.PI * 0.5;       // Default: Small smile
    let mouthRotation = Math.PI * 1.25; // Centered at bottom

    if (isSurprised) {
      mouthArc = Math.PI * 2;
      mouthRotation = 0;
    } else if (isHappy) {
      mouthArc = Math.PI;
      mouthRotation = Math.PI;
    } else if (isSad || isAngry) {
      mouthArc = Math.PI * 0.8;
      mouthRotation = Math.PI * 0.1;    // Centered frown
    }

    return {
      eyeRotation: isAngry ? 0.4 : (isSad ? -0.2 : 0),
      mouthArc,
      mouthRotation,
      mouthY: isSurprised ? -0.2 : -0.15,
      showTears: isSad,
      showEyebrows: isAngry
    };
  }, [emotion]);

  // --- TEXTURES ---
  const flagTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Vertical stripes for France (Blue-White-Red)
    // Adjusted widths to make the White stripe look like a "ring" or line
    // Blue (Left) - Wider
    ctx.fillStyle = '#0055A4';
    ctx.fillRect(0, 0, 54, 64);
    // White (Middle) - Thinner (Strip/Ring)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(54, 0, 20, 64);
    // Red (Right) - Wider
    ctx.fillStyle = '#EF4135';
    ctx.fillRect(74, 0, 54, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    // Fix texture wrapping and offset to center the White stripe
    texture.wrapS = THREE.RepeatWrapping;
    texture.offset.x = 0.25; // Shift rotation to center the White stripe (Blue-White-Red)
    
    return texture;
  }, []);

  return (
    <group ref={group} {...props}>
      {/* Planet Core */}
      <Sphere ref={head} args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial 
          key={emotion} // Force material recreation to handle texture map addition/removal
          color={emotion === 'france' ? '#ffffff' : getPrimaryColor()} 
          map={emotion === 'france' ? flagTexture : undefined}
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
