import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, ContactShadows } from '@react-three/drei';
import ThreeAtmAvatar from '../components/atoms/ThreeAtmAvatar';
import OrgChatInterface from '../components/organisms/OrgChatInterface';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #111;
  overflow: hidden;
`;

const PagChatBot = () => {
  return (
    <PageContainer>
      {/* 3D Background Layer */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#1a1a2e']} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          
          <ThreeAtmAvatar position={[0, -0.5, 0]} />
          
          <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
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
