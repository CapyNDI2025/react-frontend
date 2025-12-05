import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars, Sparkles } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { 
  RiArrowLeftLine,
  RiTeamLine,
  RiCodeSSlashLine,
  RiCopyrightLine,
  RiOpenSourceLine,
  RiBox3Line,
  RiPaletteLine,
  RiGamepadLine,
  RiHeartLine,
  RiMapPinLine,
  RiGraduationCapLine,
  RiShieldCheckLine,
  RiGithubLine,
  RiCheckboxCircleLine
} from 'react-icons/ri'

// ============ 3D COMPONENTS ============

function ParticleField() {
  const count = 350
  const mesh = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40
      const y = (Math.random() - 0.5) * 40
      const z = (Math.random() - 0.5) * 40
      temp.push({ x, y, z })
    }
    return temp
  }, [])

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.x
      positions[i * 3 + 1] = particle.y
      positions[i * 3 + 2] = particle.z
    })
    return positions
  }, [particles])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ffaa66" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function FloatingOrb({ position, color, scale = 1 }) {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.3
      mesh.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial 
          color={color} 
          speed={1.5} 
          distort={0.25} 
          radius={1} 
          transparent 
          opacity={0.2}
        />
      </mesh>
    </Float>
  )
}

function GridFloor() {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.z = (state.clock.elapsedTime * 0.3) % 2
    }
  })
  return (
    <mesh ref={mesh} rotation={[Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
      <planeGeometry args={[60, 60, 30, 30]} />
      <meshBasicMaterial color="#ff8844" wireframe transparent opacity={0.06} />
    </mesh>
  )
}

function Scene3D() {
  return (
    <>
      <color attach="background" args={['#080605']} />
      <fog attach="fog" args={['#080605', 8, 35]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#ffaa66" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff6644" />
      <pointLight position={[0, 5, 5]} intensity={0.2} color="#ffffff" />
      <Stars radius={60} depth={60} count={1200} factor={3} saturation={0.2} fade speed={0.3} />
      <Sparkles count={60} scale={25} size={1.5} speed={0.2} color="#ffcc88" />
      <ParticleField />
      <FloatingOrb position={[-8, 4, -10]} color="#ffaa66" scale={1.5} />
      <FloatingOrb position={[10, -3, -12]} color="#ff6644" scale={1.2} />
      <FloatingOrb position={[0, 6, -15]} color="#ffddaa" scale={1} />
      <FloatingOrb position={[-5, -5, -8]} color="#ffcc88" scale={0.8} />
      <FloatingOrb position={[7, 2, -6]} color="#ff8855" scale={0.6} />
      <GridFloor />
    </>
  )
}

// ============ STYLED COMPONENTS ============

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`

const PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`

const ContentOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 170, 102, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(255, 170, 102, 0.5);
    }
  }
`

const MotionLink = motion.create(Link)

const BackButton = styled(MotionLink)`
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(20, 15, 10, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 170, 102, 0.3);
  border-radius: 50px;
  color: #ffaa66;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 170, 102, 0.15);
    border-color: rgba(255, 170, 102, 0.6);
    box-shadow: 0 0 30px rgba(255, 170, 102, 0.2);
    transform: translateX(-5px);
  }
  
  svg {
    font-size: 1.2rem;
  }
`

const HeroSection = styled(motion.div)`
  text-align: center;
  padding: 80px 20px 40px;
  max-width: 900px;
  margin: 0 auto;
`

const MainTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-bottom: 16px;
  background: linear-gradient(
    135deg, 
    #ffffff 0%, 
    #ffaa66 25%, 
    #ffffff 50%, 
    #ff6644 75%, 
    #ffffff 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite;
`

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  letter-spacing: 2px;
`

const MainContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`

const SectionGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const GlassCard = styled(motion.div)`
  background: rgba(20, 15, 10, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(255, 170, 102, 0.2);
  padding: 32px;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: rgba(255, 170, 102, 0.4);
    box-shadow: 0 20px 60px rgba(255, 170, 102, 0.1);
    transition: all 0.4s ease;
  }
`

const LargeCard = styled(GlassCard)`
  grid-column: 1 / -1;
`

const CardIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${props => props.$bg || 'linear-gradient(135deg, rgba(255, 170, 102, 0.2), rgba(255, 102, 68, 0.2))'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.$delay || '0s'};
  
  svg {
    font-size: 1.6rem;
    color: ${props => props.$color || '#ffaa66'};
  }
`

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const CardText = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.8;
  font-weight: 300;
`

const TeamSection = styled(motion.div)`
  margin: 20px 0 30px;
`

const TeamCard = styled(GlassCard)`
  text-align: center;
  padding: 40px;
`

const TeamTitle = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2rem);
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  
  svg {
    color: #ffaa66;
  }
`

const TeamSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  svg {
    color: #ff6b6b;
  }
`

const TeamStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`

const StatItem = styled(motion.div)`
  text-align: center;
`

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ffaa66, #ff6644);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 6px;
`

const BadgeRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${props => props.$bg || 'rgba(255, 170, 102, 0.1)'};
  border: 1px solid ${props => props.$border || 'rgba(255, 170, 102, 0.3)'};
  border-radius: 50px;
  color: ${props => props.$color || '#ffaa66'};
  font-size: 0.9rem;
  font-weight: 500;
  
  svg {
    font-size: 1.1rem;
  }
`

const LicenseBox = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-top: 16px;
  border-left: 3px solid #ffaa66;
`

const LicenseTitle = styled.h4`
  color: #ffaa66;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const LicenseText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  line-height: 1.7;
  font-family: 'Monaco', 'Consolas', monospace;
`

const CheckList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
`

const CheckItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin-bottom: 12px;
  line-height: 1.6;
  
  svg {
    color: #66ff99;
    font-size: 1.2rem;
    flex-shrink: 0;
    margin-top: 2px;
  }
`

const FooterSection = styled(motion.div)`
  text-align: center;
  padding: 30px 20px 60px;
`

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  letter-spacing: 1px;
  
  span {
    color: #ffaa66;
    font-weight: 600;
  }
`

const GithubLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 12px 24px;
  background: rgba(255, 170, 102, 0.1);
  border: 1px solid rgba(255, 170, 102, 0.3);
  border-radius: 50px;
  color: #ffaa66;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 170, 102, 0.2);
    border-color: rgba(255, 170, 102, 0.5);
    transform: translateY(-2px);
  }
  
  svg {
    font-size: 1.3rem;
  }
`

// ============ ANIMATION VARIANTS ============

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
}

// ============ MAIN COMPONENT ============

const PagCredits = () => {
  return (
    <PageContainer>
      <CanvasContainer>
        <Canvas camera={{ position: [0, 0, 12], fov: 55 }}>
          <Scene3D />
        </Canvas>
      </CanvasContainer>

      <BackButton 
        to="/"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <RiArrowLeftLine />
        Retour
      </BackButton>

      <ContentOverlay
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroSection>
          <MainTitle variants={itemVariants}>
            Crédits & Mentions Légales
          </MainTitle>
          <Subtitle variants={itemVariants}>
            Transparence et reconnaissance
          </Subtitle>
        </HeroSection>

        <MainContent>
          {/* Team Section */}
          <TeamSection variants={itemVariants}>
            <TeamCard>
              <TeamTitle>
                <RiTeamLine /> L'Équipe CapyNDI 2025
              </TeamTitle>
              <TeamSubtitle>
                10 étudiants passionnés <RiHeartLine />
              </TeamSubtitle>
              
              <TeamStats>
                <StatItem>
                  <StatNumber>10</StatNumber>
                  <StatLabel>Développeurs</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>1</StatNumber>
                  <StatLabel>Nuit blanche</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>100%</StatNumber>
                  <StatLabel>Fait maison</StatLabel>
                </StatItem>
              </TeamStats>
              
              <BadgeRow>
                <Badge>
                  <RiMapPinLine />
                  Sète, France
                </Badge>
                <Badge $bg="rgba(100, 150, 255, 0.1)" $border="rgba(100, 150, 255, 0.3)" $color="#6699ff">
                  <RiGraduationCapLine />
                  BUT Informatique
                </Badge>
              </BadgeRow>
            </TeamCard>
          </TeamSection>

          {/* Credits Grid */}
          <SectionGrid variants={containerVariants}>
            <GlassCard variants={itemVariants}>
              <CardIcon $bg="linear-gradient(135deg, rgba(200, 100, 255, 0.25), rgba(150, 50, 255, 0.25))" $color="#cc88ff" $delay="0s">
                <RiBox3Line />
              </CardIcon>
              <CardTitle>Visuels 3D — Défi Three.js</CardTitle>
              <CardText>
                Tous les éléments visuels 3D présents sur ce site ont été entièrement 
                conçus et développés par notre équipe dans le cadre du défi Three.js 
                de la Nuit de l'Info 2025.
              </CardText>
              <CheckList>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  Scènes 3D interactives avec Three.js & React Three Fiber
                </CheckItem>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  Particules, shaders et effets visuels custom
                </CheckItem>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  Animations et interactions temps réel
                </CheckItem>
              </CheckList>
            </GlassCard>

            <GlassCard variants={itemVariants}>
              <CardIcon $bg="linear-gradient(135deg, rgba(100, 200, 150, 0.25), rgba(50, 150, 100, 0.25))" $color="#66cc99" $delay="0.5s">
                <RiGamepadLine />
              </CardIcon>
              <CardTitle>Expérience 3D Godot</CardTitle>
              <CardText>
                L'expérience immersive 3D du musée virtuel a été développée 
                avec le moteur Godot Engine, exportée en WebAssembly pour 
                une exécution native dans le navigateur.
              </CardText>
              <CheckList>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  Environnement 3D interactif développé sous Godot 4
                </CheckItem>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  Export WebAssembly pour performance optimale
                </CheckItem>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  Modélisation et level design originaux
                </CheckItem>
              </CheckList>
            </GlassCard>

            <GlassCard variants={itemVariants}>
              <CardIcon $bg="linear-gradient(135deg, rgba(255, 150, 100, 0.25), rgba(255, 100, 50, 0.25))" $color="#ff9966" $delay="1s">
                <RiPaletteLine />
              </CardIcon>
              <CardTitle>Design & Interface</CardTitle>
              <CardText>
                L'interface utilisateur, les animations et le design graphique 
                ont été créés de zéro par notre équipe, sans utilisation de 
                templates ou de designs préexistants.
              </CardText>
              <CheckList>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  UI/UX design original avec glassmorphism
                </CheckItem>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  Animations Framer Motion personnalisées
                </CheckItem>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  Palette de couleurs et identité visuelle uniques
                </CheckItem>
              </CheckList>
            </GlassCard>

            <GlassCard variants={itemVariants}>
              <CardIcon $bg="linear-gradient(135deg, rgba(100, 150, 255, 0.25), rgba(50, 100, 255, 0.25))" $color="#6699ff" $delay="1.5s">
                <RiCodeSSlashLine />
              </CardIcon>
              <CardTitle>Technologies Utilisées</CardTitle>
              <CardText>
                Stack technique moderne et open-source pour une application 
                performante, maintenable et respectueuse des standards web.
              </CardText>
              <CheckList>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  React 18 + Vite pour le frontend
                </CheckItem>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  Three.js / React Three Fiber / Drei
                </CheckItem>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  Styled Components + Framer Motion
                </CheckItem>
              </CheckList>
            </GlassCard>

            {/* Legal Section - Full Width */}
            <LargeCard variants={itemVariants}>
              <CardIcon $bg="linear-gradient(135deg, rgba(255, 200, 100, 0.25), rgba(255, 150, 50, 0.25))" $color="#ffcc66">
                <RiShieldCheckLine />
              </CardIcon>
              <CardTitle>
                <RiCopyrightLine /> Mentions Légales & Propriété Intellectuelle
              </CardTitle>
              <CardText>
                Ce site web a été réalisé dans le cadre de la Nuit de l'Info 2025, 
                un événement étudiant annuel. L'intégralité du contenu, du code source, 
                des visuels 3D, des animations et du design a été créée par l'équipe 
                CapyNDI 2025 composée d'étudiants en BUT Informatique de Sète.
              </CardText>
              
              <LicenseBox>
                <LicenseTitle>
                  <RiOpenSourceLine /> Licence MIT
                </LicenseTitle>
                <LicenseText>
                  Copyright (c) 2025 CapyNDI 2025 - Équipe Nuit de l'Info
                  <br /><br />
                  Permission is hereby granted, free of charge, to any person obtaining a copy
                  of this software and associated documentation files, to deal in the Software
                  without restriction, including without limitation the rights to use, copy,
                  modify, merge, publish, distribute, sublicense, and/or sell copies of the
                  Software, subject to the following conditions:
                  <br /><br />
                  The above copyright notice and this permission notice shall be included in
                  all copies or substantial portions of the Software.
                  <br /><br />
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
                </LicenseText>
              </LicenseBox>
              
              <CheckList style={{ marginTop: '24px' }}>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  <span><strong>Aucun template</strong> — Tout le code et le design sont originaux</span>
                </CheckItem>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  <span><strong>Visuels 3D</strong> — Créés intégralement par l'équipe pour le défi Three.js</span>
                </CheckItem>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  <span><strong>Open Source</strong> — Code disponible sous licence MIT</span>
                </CheckItem>
                <CheckItem>
                  <RiCheckboxCircleLine />
                  <span><strong>Projet éducatif</strong> — Réalisé dans un but pédagogique et non commercial</span>
                </CheckItem>
              </CheckList>
            </LargeCard>
          </SectionGrid>
        </MainContent>

        <FooterSection variants={itemVariants}>
          <FooterText>
            Créé avec <span>♥</span> lors de la <span>Nuit de l'Info 2025</span>
          </FooterText>
          <GithubLink href="https://github.com/CapyNDI2025" target="_blank" rel="noopener noreferrer">
            <RiGithubLine />
            Voir sur GitHub
          </GithubLink>
        </FooterSection>
      </ContentOverlay>
    </PageContainer>
  )
}

export default PagCredits
