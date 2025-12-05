import React, { Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import ThreeAtmAvatar from '../components/atoms/ThreeAtmAvatar';
import ThreeAtmAsteroid from '../components/atoms/ThreeAtmAsteroid';
import OrgChatInterface from '../components/organisms/OrgChatInterface';
import OrgDebateInterface from '../components/organisms/OrgDebateInterface';
import { useChatStore } from '../lib/store/chatStore';
import { AudioProvider } from '../contexts/AudioContext';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #111;
  overflow: hidden;
`;

const CameraLogger = () => {
  const { camera, size } = useThree();
  
  useEffect(() => {
    const offset = size.width * 0.25;
    camera.setViewOffset(size.width, size.height, offset, 0, size.width, size.height);
    camera.updateProjectionMatrix();

    return () => {
      camera.clearViewOffset();
    };
  }, [camera, size]);

  return null;
};

const PagChatBot = () => {
  const isDebateMode = useChatStore((state) => state.isDebateMode);

  useEffect(() => {
    console.log(
      "%cArrêtez de me déshabiller du regard. C'est gênant. - Jean-Michel.",
      "color: #ff4444; font-size: 16px; font-weight: bold; background: #222; padding: 8px; border-radius: 4px;"
    );
  }, []);

  return (
    <AudioProvider>
      <PageContainer>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          {!isDebateMode && <CameraLogger />}
          <color attach="background" args={['#1a1a2e']} />
          
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Stars radius={100} depth={50} count={5000} factor={6} saturation={0} fade speed={3} />
            
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            
            {isDebateMode ? (
              <>
                <ThreeAtmAvatar position={[-2.5, -0.5, 0]} personalityOverride="abysse" />
                <ThreeAtmAvatar position={[2.5, -0.5, 0]} personalityOverride="nullpointer" />
              </>
            ) : (
              <ThreeAtmAvatar position={[0, -0.5, 0]} />
            )}
            
            <ThreeAtmAsteroid />
            
          </Suspense>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            minPolarAngle={Math.PI / 2.5} 
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>

        {isDebateMode ? <OrgDebateInterface /> : <OrgChatInterface />}
      </PageContainer>
    </AudioProvider>
  );
};

export default PagChatBot;
