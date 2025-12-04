import React, { Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import ThreeAtmAvatar from '../components/atoms/ThreeAtmAvatar';
import ThreeAtmAsteroid from '../components/atoms/ThreeAtmAsteroid';
import OrgChatInterface from '../components/organisms/OrgChatInterface';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #111;
  overflow: hidden;
`;

// Component to shift the camera view so the center (0,0,0) appears on the left
const CameraLogger = () => {
  const { camera, size } = useThree();
  
  useEffect(() => {
    // Shift the view to the right, so the object appears on the left
    // We want the center to be at roughly 25% of the screen width instead of 50%
    // So we shift the window by -25% of the width?
    // setViewOffset(fullWidth, fullHeight, x, y, width, height)
    // A negative x offset shifts the view window left, moving the object right.
    // A positive x offset shifts the view window right, moving the object left.
    
    const offset = size.width * 0.25; // Shift by 25%
    camera.setViewOffset(size.width, size.height, offset, 0, size.width, size.height);
    camera.updateProjectionMatrix();

    return () => {
      camera.clearViewOffset();
    };
  }, [camera, size]);

  return null;
};

const PagChatBot = () => {
  return (
    <PageContainer>
      {/* 3D Background Layer */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <CameraLogger />
        <color attach="background" args={['#1a1a2e']} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Stars radius={100} depth={50} count={5000} factor={6} saturation={0} fade speed={3} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          
          {/* Planet centered at X=0 for correct rotation, but visually shifted by CameraLogger */}
          <ThreeAtmAvatar position={[0, -0.5, 0]} />
          
          {/* Easter Egg Asteroid */}
          <ThreeAtmAsteroid />
          
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

      {/* UI Overlay Layer */}
      <OrgChatInterface />
    </PageContainer>
  );
};

export default PagChatBot;
