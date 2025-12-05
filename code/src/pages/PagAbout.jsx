import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars, Sparkles, Text3D, Center } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { 
  RiArrowLeftLine,
  RiTeamLine,
  RiCodeSSlashLine,
  RiMoonClearLine,
  RiShieldCheckLine,
  RiLeafLine,
  RiLightbulbLine,
  RiGitBranchLine,
  RiHeartLine,
  RiMapPinLine,
  RiGraduationCapLine
} from 'react-icons/ri'

// ============ 3D COMPONENTS ============

function ParticleField() {
  const count = 400
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
      <pointsMaterial size={0.04} color="#66ffaa" transparent opacity={0.5} sizeAttenuation />
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
        <dodecahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial 
          color={color} 
          speed={1.5} 
          distort={0.3} 
          radius={1} 
          transparent 
          opacity={0.25}
        />
      </mesh>
    </Float>
  )
}

function GridFloor() {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.z = (state.clock.elapsedTime * 0.5) % 2
    }
  })
  return (
    <mesh ref={mesh} rotation={[Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
      <planeGeometry args={[60, 60, 30, 30]} />
      <meshBasicMaterial color="#22aa66" wireframe transparent opacity={0.08} />
    </mesh>
  )
}

function Scene3D() {
  return (
    <>
      <color attach="background" args={['#030808']} />
      <fog attach="fog" args={['#030808', 8, 35]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#66ffaa" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00aaff" />
      <pointLight position={[0, 5, 5]} intensity={0.2} color="#ffffff" />
      <Stars radius={60} depth={60} count={1500} factor={3} saturation={0.3} fade speed={0.3} />
      <Sparkles count={80} scale={25} size={1.5} speed={0.2} color="#66ffaa" />
      <ParticleField />
      <FloatingOrb position={[-8, 4, -10]} color="#66ffaa" scale={1.5} />
      <FloatingOrb position={[10, -3, -12]} color="#00aaff" scale={1.2} />
      <FloatingOrb position={[0, 6, -15]} color="#ffffff" scale={1} />
      <FloatingOrb position={[-5, -5, -8]} color="#aaffaa" scale={0.8} />
      <FloatingOrb position={[7, 2, -6]} color="#44ddaa" scale={0.6} />
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
  50% { transform: translateY(-10px); }
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
    background: rgba(102, 255, 170, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(102, 255, 170, 0.5);
    }
  }
`

const BackButton = styled(motion(Link))`
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(10, 20, 15, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(102, 255, 170, 0.3);
  border-radius: 50px;
  color: #66ffaa;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(102, 255, 170, 0.15);
    border-color: rgba(102, 255, 170, 0.6);
    box-shadow: 0 0 30px rgba(102, 255, 170, 0.2);
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
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-bottom: 16px;
  background: linear-gradient(
    135deg, 
    #ffffff 0%, 
    #66ffaa 25%, 
    #ffffff 50%, 
    #00aaff 75%, 
    #ffffff 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite;
`

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 8px;
`

const EventBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  background: linear-gradient(135deg, rgba(102, 255, 170, 0.15) 0%, rgba(0, 170, 255, 0.15) 100%);
  border: 1px solid rgba(102, 255, 170, 0.4);
  border-radius: 50px;
  margin-top: 24px;
  
  svg {
    color: #66ffaa;
    font-size: 1.3rem;
  }
  
  span {
    color: #ffffff;
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 1px;
  }
`

const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`

const GlassCard = styled(motion.div)`
  background: rgba(10, 20, 15, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(102, 255, 170, 0.2);
  padding: 32px;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: rgba(102, 255, 170, 0.4);
    box-shadow: 0 20px 60px rgba(102, 255, 170, 0.15);
    transform: translateY(-5px);
    transition: all 0.4s ease;
  }
`

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: ${props => props.$bg || 'linear-gradient(135deg, rgba(102, 255, 170, 0.2), rgba(0, 170, 255, 0.2))'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.$delay || '0s'};
  
  svg {
    font-size: 1.8rem;
    color: ${props => props.$color || '#66ffaa'};
  }
`

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
`

const CardText = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.7;
  font-weight: 300;
`

const TeamSection = styled(motion.div)`
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
`

const TeamCard = styled(motion.div)`
  background: rgba(10, 20, 15, 0.5);
  backdrop-filter: blur(15px);
  border-radius: 28px;
  border: 1px solid rgba(102, 255, 170, 0.25);
  padding: 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(102, 255, 170, 0.05) 0%, transparent 60%);
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const TeamTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  
  svg {
    color: #66ffaa;
  }
`

const TeamSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
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
  gap: 48px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`

const StatItem = styled(motion.div)`
  text-align: center;
`

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #66ffaa, #00aaff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 8px;
`

const LocationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: rgba(102, 255, 170, 0.1);
  border: 1px solid rgba(102, 255, 170, 0.3);
  border-radius: 50px;
  color: #66ffaa;
  font-size: 0.95rem;
  font-weight: 500;
  
  svg {
    font-size: 1.1rem;
  }
`

const MissionSection = styled(motion.div)`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px 60px;
  text-align: center;
`

const MissionQuote = styled(motion.blockquote)`
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
  line-height: 1.8;
  position: relative;
  padding: 32px;
  background: rgba(10, 20, 15, 0.3);
  border-radius: 20px;
  border-left: 4px solid #66ffaa;
  
  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 4rem;
    color: rgba(102, 255, 170, 0.3);
    font-family: Georgia, serif;
  }
`

const FooterText = styled(motion.p)`
  margin-top: 32px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  letter-spacing: 1px;
  
  span {
    color: #66ffaa;
    font-weight: 600;
  }
`

// ============ ANIMATION VARIANTS ============

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
}

// ============ MAIN COMPONENT ============

const PagAbout = () => {
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
            À Propos
          </MainTitle>
          <Subtitle variants={itemVariants}>
            Nuit de l'Info 2025 — Numérique Inclusif, Responsable & Durable
          </Subtitle>
          <motion.div variants={itemVariants}>
            <EventBadge>
              <RiMoonClearLine />
              <span>NDI 2025</span>
            </EventBadge>
          </motion.div>
        </HeroSection>

        <TeamSection variants={itemVariants}>
          <TeamCard>
            <TeamTitle>
              <RiTeamLine /> Notre Équipe
            </TeamTitle>
            <TeamSubtitle>
              Unis par la passion du code <RiHeartLine />
            </TeamSubtitle>
            
            <TeamStats>
              <StatItem
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                <StatNumber>10</StatNumber>
                <StatLabel>Développeurs</StatLabel>
              </StatItem>
              <StatItem
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
              >
                <StatNumber>1</StatNumber>
                <StatLabel>Nuit</StatLabel>
              </StatItem>
              <StatItem
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
              >
                <StatNumber>∞</StatNumber>
                <StatLabel>Motivation</StatLabel>
              </StatItem>
            </TeamStats>
            
            <LocationBadge>
              <RiMapPinLine />
              Sète, France
            </LocationBadge>
            <div style={{ marginTop: '12px' }}>
              <LocationBadge style={{ background: 'rgba(0, 170, 255, 0.1)', borderColor: 'rgba(0, 170, 255, 0.3)', color: '#00aaff' }}>
                <RiGraduationCapLine />
                BUT Informatique
              </LocationBadge>
            </div>
          </TeamCard>
        </TeamSection>

        <CardsGrid variants={containerVariants}>
          <GlassCard 
            variants={cardVariants}
            $gradient="linear-gradient(90deg, #66ffaa, #44ddaa)"
          >
            <CardIcon $bg="linear-gradient(135deg, rgba(102, 255, 170, 0.25), rgba(68, 221, 170, 0.25))" $color="#66ffaa" $delay="0s">
              <RiLeafLine />
            </CardIcon>
            <CardTitle>La Démarche NIRD</CardTitle>
            <CardText>
              Numérique Inclusif, Responsable et Durable. Une approche qui redonne 
              le pouvoir aux établissements scolaires face aux géants du numérique, 
              en favorisant l'autonomie technologique et les solutions éthiques.
            </CardText>
          </GlassCard>

          <GlassCard 
            variants={cardVariants}
            $gradient="linear-gradient(90deg, #00aaff, #0088dd)"
          >
            <CardIcon $bg="linear-gradient(135deg, rgba(0, 170, 255, 0.25), rgba(0, 136, 221, 0.25))" $color="#00aaff" $delay="0.5s">
              <RiShieldCheckLine />
            </CardIcon>
            <CardTitle>Résistance Numérique</CardTitle>
            <CardText>
              Face à l'obsolescence programmée et aux écosystèmes fermés des Big Tech, 
              nous proposons des alternatives libres, durables et respectueuses de 
              la souveraineté numérique européenne.
            </CardText>
          </GlassCard>

          <GlassCard 
            variants={cardVariants}
            $gradient="linear-gradient(90deg, #ffaa66, #ff8844)"
          >
            <CardIcon $bg="linear-gradient(135deg, rgba(255, 170, 102, 0.25), rgba(255, 136, 68, 0.25))" $color="#ffaa66" $delay="1s">
              <RiLightbulbLine />
            </CardIcon>
            <CardTitle>Notre Mission</CardTitle>
            <CardText>
              Créer une plateforme ludique et engageante pour aider élèves, 
              enseignants et familles à comprendre comment réduire les dépendances 
              numériques de manière progressive et motivante.
            </CardText>
          </GlassCard>

          <GlassCard 
            variants={cardVariants}
            $gradient="linear-gradient(90deg, #aa66ff, #8844ff)"
          >
            <CardIcon $bg="linear-gradient(135deg, rgba(170, 102, 255, 0.25), rgba(136, 68, 255, 0.25))" $color="#aa66ff" $delay="1.5s">
              <RiCodeSSlashLine />
            </CardIcon>
            <CardTitle>Technologies</CardTitle>
            <CardText>
              React, Three.js, Framer Motion, Godot Engine... Nous utilisons des 
              technologies modernes et open-source pour créer une expérience 
              immersive et interactive.
            </CardText>
          </GlassCard>
        </CardsGrid>

        <MissionSection variants={itemVariants}>
          <MissionQuote>
            À l'image du célèbre village d'Astérix qui résiste à l'Empire romain, 
            l'École peut devenir un village résistant, ingénieux, autonome et créatif 
            face au Goliath numérique des Big Tech.
          </MissionQuote>
          <FooterText>
            Créé avec <span>♥</span> lors de la <span>Nuit de l'Info 2025</span>
          </FooterText>
        </MissionSection>
      </ContentOverlay>
    </PageContainer>
  )
}

export default PagAbout
