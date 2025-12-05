import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stars, Sparkles } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { 
  RiRobot2Line, 
  RiLeafLine, 
  RiBarChartBoxLine, 
  RiGamepadLine, 
  RiQuestionnaireLine, 
  RiBookOpenLine, 
  RiInformationLine,
  RiSparklingLine,
  RiTeamLine,
  RiSwordLine
} from 'react-icons/ri'

// ============ 3D COMPONENTS ============

function ParticleField() {
  const count = 500
  const mesh = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30
      const y = (Math.random() - 0.5) * 30
      const z = (Math.random() - 0.5) * 30
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
      mesh.current.rotation.x = state.clock.elapsedTime * 0.03
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05
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
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function AnimatedSphere({ position, color, speed = 1 }) {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2 * speed
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial color={color} speed={2} distort={0.4} radius={1} transparent opacity={0.3} />
      </mesh>
    </Float>
  )
}

function AnimatedTorus({ position, color }) {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.5
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <MeshWobbleMaterial color={color} speed={1} factor={0.3} transparent opacity={0.2} wireframe />
      </mesh>
    </Float>
  )
}

function GridLines() {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = -5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })
  return (
    <mesh ref={mesh} rotation={[Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial color="#4444ff" wireframe transparent opacity={0.1} />
    </mesh>
  )
}

function Scene3D() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 5, 30]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#6666ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff66ff" />
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
      <Sparkles count={100} scale={20} size={2} speed={0.3} color="#ffffff" />
      <ParticleField />
      <AnimatedSphere position={[-6, 3, -5]} color="#6666ff" speed={0.8} />
      <AnimatedSphere position={[7, -2, -8]} color="#ff66ff" speed={1.2} />
      <AnimatedSphere position={[0, 4, -10]} color="#66ffff" speed={1} />
      <AnimatedTorus position={[-8, -3, -6]} color="#ffffff" />
      <AnimatedTorus position={[8, 4, -7]} color="#6666ff" />
      <GridLines />
    </>
  )
}

// ============ STYLED COMPONENTS ============

const HomeContainer = styled.div`
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

// Grid moderne avec bento box style
const BentoGrid = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 16px;
  padding: 16px;
  z-index: 1;
`

// Bloc de base avec glassmorphism
const GlassBlock = styled(motion.div)`
  background: rgba(10, 10, 20, 0.15);
  backdrop-filter: blur(2px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(100, 100, 255, 0.5) 0%, transparent 50%, rgba(255, 100, 255, 0.5) 100%);
    border-radius: 22px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: rgba(10, 10, 20, 0.25);
  }
  
  &:hover::after {
    opacity: 1;
  }
`

const BlockLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
`

const BlockTitle = styled(motion.h2)`
  font-size: ${props => props.$large ? '3.5rem' : '1.4rem'};
  font-weight: ${props => props.$large ? '900' : '700'};
  color: #ffffff;
  margin: 0;
  text-align: center;
  letter-spacing: ${props => props.$large ? '4px' : '1px'};
  text-transform: uppercase;
`

const BlockSubtitle = styled(motion.p)`
  font-size: ${props => props.$large ? '1rem' : '0.8rem'};
  color: rgba(255, 255, 255, 0.5);
  margin-top: ${props => props.$large ? '12px' : '8px'};
  text-align: center;
  letter-spacing: 0.5px;
  font-weight: 300;
`

const IconWrapper = styled(motion.div)`
  font-size: ${props => props.$large ? '4rem' : '2.2rem'};
  margin-bottom: ${props => props.$large ? '20px' : '12px'};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`

// Blocs avec accents colorés subtils
const HeroBlock = styled(GlassBlock)`
  grid-column: 1 / 4;
  grid-row: 1 / 3;
  
  &::after {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.5) 0%, transparent 50%, rgba(255, 180, 0, 0.5) 100%);
  }
  
  &:hover {
    border-color: rgba(255, 215, 0, 0.6);
    box-shadow: 0 20px 60px rgba(255, 215, 0, 0.3), inset 0 0 30px rgba(255, 215, 0, 0.1);
  }
`

const ChatbotBlock = styled(GlassBlock)`
  grid-column: 5 / 7;
  grid-row: 3 / 5;
  
  &::after {
    background: linear-gradient(135deg, rgba(0, 200, 255, 0.5) 0%, transparent 50%, rgba(0, 150, 255, 0.5) 100%);
  }
  
  &:hover {
    border-color: rgba(0, 200, 255, 0.6);
    box-shadow: 0 20px 60px rgba(0, 200, 255, 0.3), inset 0 0 30px rgba(0, 200, 255, 0.1);
  }
`

const NirdBlock = styled(GlassBlock)`
  grid-column: 4 / 6;
  grid-row: 1 / 2;
  
  &::after {
    background: linear-gradient(135deg, rgba(100, 255, 150, 0.5) 0%, transparent 50%, rgba(50, 200, 100, 0.5) 100%);
  }
  
  &:hover {
    border-color: rgba(100, 255, 150, 0.6);
    box-shadow: 0 20px 60px rgba(100, 255, 150, 0.3), inset 0 0 30px rgba(100, 255, 150, 0.1);
  }
`

const DependenciesBlock = styled(GlassBlock)`
  grid-column: 6 / 7;
  grid-row: 1 / 2;
  
  &::after {
    background: linear-gradient(135deg, rgba(255, 150, 100, 0.5) 0%, transparent 50%, rgba(255, 100, 50, 0.5) 100%);
  }
  
  &:hover {
    border-color: rgba(255, 150, 100, 0.6);
    box-shadow: 0 20px 60px rgba(255, 150, 100, 0.3), inset 0 0 30px rgba(255, 150, 100, 0.1);
  }
`

const Experience3DBlock = styled(GlassBlock)`
  grid-column: 1 / 3;
  grid-row: 3 / 5;
  
  &::after {
    background: linear-gradient(135deg, rgba(200, 100, 255, 0.5) 0%, transparent 50%, rgba(150, 50, 255, 0.5) 100%);
  }
  
  &:hover {
    border-color: rgba(200, 100, 255, 0.6);
    box-shadow: 0 20px 60px rgba(200, 100, 255, 0.3), inset 0 0 30px rgba(200, 100, 255, 0.1);
  }
`

const MiniGameBlock = styled(GlassBlock)`
  grid-column: 4 / 5;
  grid-row: 2 / 3;
  
  &::after {
    background: linear-gradient(135deg, rgba(255, 100, 100, 0.5) 0%, transparent 50%, rgba(255, 50, 50, 0.5) 100%);
  }
  
  &:hover {
    border-color: rgba(255, 100, 100, 0.6);
    box-shadow: 0 20px 60px rgba(255, 100, 100, 0.3), inset 0 0 30px rgba(255, 100, 100, 0.1);
  }
`

const CreditsBlock = styled(GlassBlock)`
  grid-column: 5 / 7;
  grid-row: 2 / 3;
  
  &::after {
    background: linear-gradient(135deg, rgba(255, 200, 150, 0.5) 0%, transparent 50%, rgba(255, 150, 100, 0.5) 100%);
  }
  
  &:hover {
    border-color: rgba(255, 200, 150, 0.6);
    box-shadow: 0 20px 60px rgba(255, 200, 150, 0.3), inset 0 0 30px rgba(255, 200, 150, 0.1);
  }
`

const QuizBlock = styled(GlassBlock)`
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  
  &::after {
    background: linear-gradient(135deg, rgba(255, 200, 100, 0.5) 0%, transparent 50%, rgba(255, 150, 50, 0.5) 100%);
  }
  
  &:hover {
    border-color: rgba(255, 200, 100, 0.6);
    box-shadow: 0 20px 60px rgba(255, 200, 100, 0.3), inset 0 0 30px rgba(255, 200, 100, 0.1);
  }
`

const ResourcesBlock = styled(GlassBlock)`
  grid-column: 4 / 5;
  grid-row: 3 / 4;
  
  &::after {
    background: linear-gradient(135deg, rgba(100, 150, 255, 0.5) 0%, transparent 50%, rgba(50, 100, 255, 0.5) 100%);
  }
  
  &:hover {
    border-color: rgba(100, 150, 255, 0.6);
    box-shadow: 0 20px 60px rgba(100, 150, 255, 0.3), inset 0 0 30px rgba(100, 150, 255, 0.1);
  }
`

const AboutBlock = styled(GlassBlock)`
  grid-column: 3 / 5;
  grid-row: 4 / 5;
  
  &::after {
    background: linear-gradient(135deg, rgba(255, 150, 200, 0.5) 0%, transparent 50%, rgba(255, 100, 150, 0.5) 100%);
  }
  
  &:hover {
    border-color: rgba(255, 150, 200, 0.6);
    box-shadow: 0 20px 60px rgba(255, 150, 200, 0.3), inset 0 0 30px rgba(255, 150, 200, 0.1);
  }
`

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.3
    }
  }
}

const blockVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
}

const hoverVariants = {
  scale: 1.02,
  y: -5,
  transition: { type: 'spring', stiffness: 400, damping: 20 }
}

const iconHover = {
  scale: 1.2,
  rotate: [0, -10, 10, -10, 0],
  transition: { duration: 0.5 }
}

const PagHome = () => {
  return (
    <HomeContainer>
      <CanvasContainer>
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Scene3D />
        </Canvas>
      </CanvasContainer>

      <BentoGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero NDI 2025 */}
        <HeroBlock variants={blockVariants} whileHover={hoverVariants}>
          <BlockLink to="/">
            <IconWrapper $large whileHover={iconHover}>
              <RiSparklingLine />
            </IconWrapper>
            <BlockTitle $large>NDI 2025</BlockTitle>
            <BlockSubtitle $large>Numérique Durable & Inclusif</BlockSubtitle>
          </BlockLink>
        </HeroBlock>

        {/* NIRD */}
        <NirdBlock variants={blockVariants} whileHover={hoverVariants}>
          <BlockLink to="/nird">
            <IconWrapper whileHover={iconHover}>
              <RiLeafLine />
            </IconWrapper>
            <BlockTitle>NIRD</BlockTitle>
            <BlockSubtitle>Responsable & Durable</BlockSubtitle>
          </BlockLink>
        </NirdBlock>

        {/* Dépendances */}
        <DependenciesBlock variants={blockVariants} whileHover={hoverVariants}>
          <BlockLink to="/dependencies">
            <IconWrapper whileHover={iconHover}>
              <RiBarChartBoxLine />
            </IconWrapper>
            <BlockTitle>Réduire</BlockTitle>
            <BlockSubtitle>Dépendances numériques</BlockSubtitle>
          </BlockLink>
        </DependenciesBlock>

        {/* Mini-jeu */}
        <MiniGameBlock variants={blockVariants} whileHover={hoverVariants}>
          <BlockLink to="/minigame">
            <IconWrapper whileHover={iconHover}>
              <RiSwordLine />
            </IconWrapper>
            <BlockTitle>Mini-jeu</BlockTitle>
            <BlockSubtitle>Jouez !</BlockSubtitle>
          </BlockLink>
        </MiniGameBlock>

        {/* Crédits */}
        <CreditsBlock variants={blockVariants} whileHover={hoverVariants}>
          <BlockLink to="/credits">
            <IconWrapper whileHover={iconHover}>
              <RiTeamLine />
            </IconWrapper>
            <BlockTitle>Crédits</BlockTitle>
            <BlockSubtitle>L'équipe NDI</BlockSubtitle>
          </BlockLink>
        </CreditsBlock>

        {/* Expérience 3D */}
        <Experience3DBlock variants={blockVariants} whileHover={hoverVariants}>
          <BlockLink to="/godot">
            <IconWrapper whileHover={iconHover}>
              <RiGamepadLine />
            </IconWrapper>
            <BlockTitle>Expérience 3D</BlockTitle>
            <BlockSubtitle>Immersion totale</BlockSubtitle>
          </BlockLink>
        </Experience3DBlock>

        {/* Quiz */}
        <QuizBlock variants={blockVariants} whileHover={hoverVariants}>
          <BlockLink to="/quiz">
            <IconWrapper whileHover={iconHover}>
              <RiQuestionnaireLine />
            </IconWrapper>
            <BlockTitle>Quiz</BlockTitle>
            <BlockSubtitle>Testez-vous</BlockSubtitle>
          </BlockLink>
        </QuizBlock>

        {/* Resources */}
        <ResourcesBlock variants={blockVariants} whileHover={hoverVariants}>
          <BlockLink to="/resources">
            <IconWrapper whileHover={iconHover}>
              <RiBookOpenLine />
            </IconWrapper>
            <BlockTitle>Ressources</BlockTitle>
            <BlockSubtitle>Documentation</BlockSubtitle>
          </BlockLink>
        </ResourcesBlock>

        {/* About */}
        <AboutBlock variants={blockVariants} whileHover={hoverVariants}>
          <BlockLink to="/about">
            <IconWrapper whileHover={iconHover}>
              <RiInformationLine />
            </IconWrapper>
            <BlockTitle>About</BlockTitle>
            <BlockSubtitle>En savoir +</BlockSubtitle>
          </BlockLink>
        </AboutBlock>

        {/* Chatbot - grand en bas à droite */}
        <ChatbotBlock variants={blockVariants} whileHover={hoverVariants}>
          <BlockLink to="/chatbot">
            <IconWrapper $large whileHover={iconHover}>
              <RiRobot2Line />
            </IconWrapper>
            <BlockTitle>AI Assistant</BlockTitle>
            <BlockSubtitle>Chatbot intelligent</BlockSubtitle>
          </BlockLink>
        </ChatbotBlock>
      </BentoGrid>
    </HomeContainer>
  )
}

export default PagHome