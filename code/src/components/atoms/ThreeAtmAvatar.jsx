import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, MeshDistortMaterial, Sparkles, Box, Cylinder } from '@react-three/drei';
import { useChatStore } from '../../lib/store/chatStore';
import * as THREE from 'three';

const ThreeAtmAvatar = ({ personalityOverride, ...props }) => {
  const avatarRef = useRef();
  const visageRef = useRef();
  const matiereRef = useRef();
  const haloRef = useRef();
  const boucheRef = useRef();
  
  const statusStore = useChatStore((state) => state.status);
  const emotionStore = useChatStore((state) => state.emotion);
  const emotionsMap = useChatStore((state) => state.emotions);
  const currentPersonalityStore = useChatStore((state) => state.currentPersonality);

  const personnaliteActive = personalityOverride || currentPersonalityStore;
  const estActif = personalityOverride ? (personalityOverride === currentPersonalityStore) : true;
  
  const statut = estActif ? statusStore : 'idle';
  
  const emotion = emotionsMap && emotionsMap[personnaliteActive] 
    ? emotionsMap[personnaliteActive] 
    : (estActif ? emotionStore : 'neutral');

  useFrame((state, delta) => {
    if (!avatarRef.current) return;
    const temps = state.clock.elapsedTime;

    if (personnaliteActive === 'nullpointer') {
        avatarRef.current.position.y = Math.sin(temps * 0.5) * 0.05;

        if (emotion === 'angry') {
            avatarRef.current.position.x = (Math.random() - 0.5) * 0.15;
            avatarRef.current.position.y += (Math.random() - 0.5) * 0.15;
            avatarRef.current.rotation.z = (Math.random() - 0.5) * 0.1;
        } else if (emotion === 'sad') {
            avatarRef.current.rotation.x = THREE.MathUtils.lerp(avatarRef.current.rotation.x, 0.4, 0.05);
            avatarRef.current.rotation.y = THREE.MathUtils.lerp(avatarRef.current.rotation.y, 0, 0.05);
        } else if (emotion === 'surprised') {
            if (Math.random() > 0.9) {
                avatarRef.current.rotation.y += Math.PI;
            }
        } else {
            avatarRef.current.rotation.x = THREE.MathUtils.lerp(avatarRef.current.rotation.x, 0, 0.05);
            const rotationCible = (state.mouse.x) * 0.05;
            avatarRef.current.rotation.y = THREE.MathUtils.lerp(avatarRef.current.rotation.y, rotationCible, 0.02);
        }

        if (statut === 'thinking') {
            avatarRef.current.position.y = 0;
            avatarRef.current.position.x = (Math.random() - 0.5) * 0.05;
        }

        if (boucheRef.current) {
            if (statut === 'speaking') {
                const ouvert = Math.sin(temps * 15) > 0;
                const echelleCible = ouvert ? 1.5 : 0.5;
                boucheRef.current.scale.y = THREE.MathUtils.lerp(boucheRef.current.scale.y, echelleCible, 0.5);
            } else {
                boucheRef.current.scale.y = THREE.MathUtils.lerp(boucheRef.current.scale.y, 1, 0.2);
            }
        }
        
        return;
    }

    avatarRef.current.position.y = Math.sin(temps) * 0.05;
    
    const rotationCible = (state.mouse.x + 0.25) * 0.1; 
    avatarRef.current.rotation.y = THREE.MathUtils.lerp(avatarRef.current.rotation.y, rotationCible, 0.05);

    if (statut === 'speaking' && boucheRef.current) {
      const onde = Math.sin(temps * 20) * 0.5 + Math.sin(temps * 10) * 0.3 + Math.random() * 0.2;
      const ouverture = 1 + Math.max(0, onde * 1.5);
      boucheRef.current.scale.y = THREE.MathUtils.lerp(boucheRef.current.scale.y, ouverture, 0.3);
      boucheRef.current.scale.x = THREE.MathUtils.lerp(boucheRef.current.scale.x, 1 - (ouverture - 1) * 0.1, 0.3);
    } else if (boucheRef.current) {
      boucheRef.current.scale.y = THREE.MathUtils.lerp(boucheRef.current.scale.y, 1, 0.2);
      boucheRef.current.scale.x = THREE.MathUtils.lerp(boucheRef.current.scale.x, 1, 0.2);
    }

    switch (statut) {
      case 'thinking':
        haloRef.current.rotation.z += delta * 4;
        haloRef.current.rotation.x += delta * 1.5;
        break;
      case 'speaking':
        const echelle = 1 + Math.sin(temps * 10) * 0.02;
        visageRef.current.scale.set(echelle, echelle, echelle);
        haloRef.current.rotation.z += delta * 0.5;
        break;
      case 'error':
        avatarRef.current.position.x = Math.sin(temps * 20) * 0.05;
        break;
      default:
        haloRef.current.rotation.z += delta * 0.1;
        break;
    }
  });

  const obtenirCouleurPrincipale = () => {
    if (personnaliteActive === 'nullpointer') {
      if (statut === 'thinking') return '#00FF41';
      if (statut === 'error') return '#FF00FF';
      return '#0D0208';
    }

    if (statut === 'thinking') return '#FF8C00';
    if (statut === 'error') return '#FF0000';

    switch (emotion) {
      case 'happy': return '#FFD700';
      case 'sad': return '#1E90FF';
      case 'angry': return '#8B0000';
      case 'surprised': return '#FF69B4';
      case 'france': return '#0055A4';
      default: return '#4B0082';
    }
  };

  const expressions = useMemo(() => {
    const estEnColere = emotion === 'angry';
    const estTriste = emotion === 'sad';
    const estHeureux = emotion === 'happy';
    const estSurpris = emotion === 'surprised';

    let arcBouche = Math.PI * 0.5;
    let rotationBouche = Math.PI * 1.25;

    if (estSurpris) {
      arcBouche = Math.PI * 2;
      rotationBouche = 0;
    } else if (estHeureux) {
      arcBouche = Math.PI;
      rotationBouche = Math.PI;
    } else if (estTriste || estEnColere) {
      arcBouche = Math.PI * 0.8;
      rotationBouche = Math.PI * 0.1;
    }

    return {
      rotationYeux: estEnColere ? 0.4 : (estTriste ? -0.2 : 0),
      arcBouche,
      rotationBouche,
      positionYBouche: estSurpris ? -0.2 : -0.15,
      afficherLarmes: estTriste,
      afficherSourcils: estEnColere
    };
  }, [emotion]);

  const textureSocrates = useMemo(() => {
    const toile = document.createElement('canvas');
    toile.width = 512;
    toile.height = 256;
    const contexte = toile.getContext('2d');

    contexte.fillStyle = '#f0f0f0';
    contexte.fillRect(256, 0, 256, 256);
    contexte.strokeStyle = '#d0d0d0';
    contexte.lineWidth = 2;
    for (let i = 0; i < 20; i++) {
      contexte.beginPath();
      contexte.moveTo(256 + Math.random() * 256, Math.random() * 256);
      contexte.bezierCurveTo(
        256 + Math.random() * 256, Math.random() * 256,
        256 + Math.random() * 256, Math.random() * 256,
        256 + Math.random() * 256, Math.random() * 256
      );
      contexte.stroke();
    }

    const taille = 32;
    for (let y = 0; y < 256; y += taille) {
      for (let x = 0; x < 256; x += taille) {
        contexte.fillStyle = ((x / taille + y / taille) % 2 === 0) ? '#ff00ff' : '#000000';
        contexte.fillRect(x, y, taille, taille);
      }
    }

    const texture = new THREE.CanvasTexture(toile);
    texture.wrapS = THREE.RepeatWrapping;
    texture.offset.x = 0.25; 
    return texture;
  }, []);

  const textureDrapeau = useMemo(() => {
    const toile = document.createElement('canvas');
    toile.width = 128;
    toile.height = 64;
    const contexte = toile.getContext('2d');
    
    contexte.fillStyle = '#0055A4';
    contexte.fillRect(0, 0, 54, 64);
    contexte.fillStyle = '#FFFFFF';
    contexte.fillRect(54, 0, 20, 64);
    contexte.fillStyle = '#EF4135';
    contexte.fillRect(74, 0, 54, 64);
    
    const texture = new THREE.CanvasTexture(toile);
    texture.wrapS = THREE.RepeatWrapping;
    texture.offset.x = 0.25;
    
    return texture;
  }, []);

  const obtenirTexture = () => {
    if (personnaliteActive === 'nullpointer') return textureSocrates;
    if (emotion === 'france') return textureDrapeau;
    return undefined;
  };

  const parametresMatiere = useMemo(() => {
    if (personnaliteActive === 'nullpointer') {
      if (statut === 'thinking') {
        return { distorsion: 0.6, vitesse: 0, rugosite: 0.5, metal: 0.1 };
      }
      return { distorsion: 0, vitesse: 0, rugosite: 0.5, metal: 0.1 };
    }
    
    let distorsion = 0.3;
    let vitesse = 1.5;
    
    if (emotion === 'france') {
        distorsion = 0.3;
    }
    
    if (statut === 'thinking') {
        distorsion = 0.4;
        vitesse = 4;
    } else if (statut === 'speaking') {
        distorsion = 0.2;
        vitesse = 2;
    } else if (statut === 'idle') {
        distorsion = 0.1;
        vitesse = 0.5;
    }

    return { distorsion, vitesse, rugosite: 0.2, metal: 0.8 };
  }, [personnaliteActive, statut, emotion]);

  return (
    <group {...props}>
      <group ref={avatarRef}>
      <Sphere ref={visageRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial 
          ref={matiereRef} 
          key={`${personnaliteActive}-${emotion === 'france' ? 'fr' : 'std'}`}
          color={emotion === 'france' || personnaliteActive === 'nullpointer' ? '#ffffff' : obtenirCouleurPrincipale()} 
          map={obtenirTexture()}
          roughness={parametresMatiere.rugosite} 
          metalness={parametresMatiere.metal}
          distort={parametresMatiere.distorsion}
          speed={parametresMatiere.vitesse}
          wireframe={false}
        />
      </Sphere>

      <group position={[0, 0, 1.02]}>
        
        <group position={[0, 0.15, 0]}>
          {personnaliteActive === 'nullpointer' ? (
            <group position={[0, 0, 0.1]}>
              <Box args={[0.9, 0.15, 0.05]} position={[0, 0, 0]}>
                <meshStandardMaterial color="black" roughness={0.2} />
              </Box>
              <Box args={[0.05, 0.05, 0.06]} position={[-0.2, 0.03, 0]}>
                <meshStandardMaterial color="white" />
              </Box>
              <Box args={[0.05, 0.05, 0.06]} position={[0.2, 0.03, 0]}>
                <meshStandardMaterial color="white" />
              </Box>
              <Box args={[0.05, 0.05, 0.06]} position={[-0.3, -0.02, 0]}>
                <meshStandardMaterial color="white" />
              </Box>
            </group>
          ) : (
            <>
              <Sphere args={[0.12, 32, 32]} position={[-0.35, 0, 0]}>
                <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.8} />
              </Sphere>
              <Sphere args={[0.12, 32, 32]} position={[0.35, 0, 0]}>
                <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.8} />
              </Sphere>
            </>
          )}

          {expressions.afficherSourcils && personnaliteActive !== 'nullpointer' && (
            <>
              <Box args={[0.3, 0.05, 0.05]} position={[-0.35, 0.2, 0.05]} rotation={[0, 0, -0.4]}>
                <meshStandardMaterial color="black" />
              </Box>
              <Box args={[0.3, 0.05, 0.05]} position={[0.35, 0.2, 0.05]} rotation={[0, 0, 0.4]}>
                <meshStandardMaterial color="black" />
              </Box>
            </>
          )}

          {expressions.afficherLarmes && (
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

        <Torus 
          ref={boucheRef}
          key={emotion}
          args={[0.2, 0.04, 16, 32, expressions.arcBouche]} 
          position={[0, expressions.positionYBouche, 0]} 
          rotation={[0, 0, expressions.rotationBouche]}
        >
           <meshStandardMaterial color="white" />
        </Torus>
      </group>

      <Sparkles count={50} scale={3} size={2} speed={0.4} opacity={0.5} color={obtenirCouleurPrincipale()} />

      <Torus ref={haloRef} args={[1.6, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color={obtenirCouleurPrincipale()} 
          emissive={obtenirCouleurPrincipale()}
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </Torus>
      </group>
    </group>
  );
};

export default ThreeAtmAvatar;
