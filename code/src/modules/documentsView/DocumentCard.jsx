import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { 
  RiComputerLine, 
  RiStackLine, 
  RiShieldLine, 
  RiGraduationCapLine, 
  RiSeedlingLine 
} from 'react-icons/ri';

// Map des icônes par nom
const iconMap = {
  computer: RiComputerLine,
  software: RiStackLine,
  shield: RiShieldLine,
  graduation: RiGraduationCapLine,
  seedling: RiSeedlingLine,
};

const selectedGlow = keyframes`
  0%, 100% { outline-color: rgba(74, 144, 226, 0.6); }
  50% { outline-color: rgba(74, 144, 226, 0.9); }
`;

// Styles de base pour différents types de documents
const documentStyles = [
  // Style 0 - Rapport officiel
  css`
    background: linear-gradient(145deg, #ffffff, #f5f5f5);
    border: 2px solid #2c3e50;
    border-radius: 4px;
    top: 5%;
    left: 5%;
    transform: translateZ(5px) rotate(-5deg);
    width: 140px;
    height: 180px;
    &:hover { box-shadow: 0 12px 35px rgba(44, 62, 80, 0.5); }
  `,
  // Style 1 - Note autocollante
  css`
    background: linear-gradient(135deg, #fff9c4, #fff59d);
    border: none;
    border-radius: 2px;
    top: 3%;
    right: 8%;
    transform: translateZ(8px) rotate(8deg);
    width: 150px;
    height: 150px;
    &:hover { box-shadow: 0 12px 35px rgba(255, 235, 59, 0.6); }
  `,
  // Style 2 - Carte plastifiée
  css`
    background: linear-gradient(145deg, #e3f2fd, #bbdefb);
    border: 3px solid #1976d2;
    border-radius: 12px;
    bottom: 5%;
    left: 3%;
    transform: translateZ(10px) rotate(-3deg);
    width: 200px;
    height: 130px;
    &:hover { box-shadow: 0 12px 35px rgba(25, 118, 210, 0.6); }
  `,
  // Style 3 - Papier ancien
  css`
    background: linear-gradient(to bottom, #f4e7d7 0%, #e8d4b8 100%);
    border: 1px solid #8b7355;
    border-radius: 2px;
    top: 30%;
    right: 2%;
    transform: translateZ(12px) rotate(-6deg);
    width: 150px;
    height: 200px;
    &:hover { box-shadow: 0 12px 35px rgba(184, 134, 11, 0.5); }
  `,
  // Style 4 - Brochure moderne
  css`
    background: linear-gradient(to right, #2e7d32 0%, #2e7d32 30%, #f1f8e9 30%, #f1f8e9 100%);
    border: none;
    border-radius: 4px;
    bottom: 3%;
    right: 5%;
    transform: translateZ(15px) rotate(4deg);
    width: 180px;
    height: 120px;
    &:hover { box-shadow: 0 12px 35px rgba(56, 142, 60, 0.6); }
  `,
];

const Card = styled.div`
  position: absolute;
  cursor: grab;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  ${props => documentStyles[props.$styleIndex % 5]}

  ${props => props.$customPosition && css`
    left: ${props.$customPosition.x}%;
    top: ${props.$customPosition.y}%;
    right: auto;
    bottom: auto;
  `}

  ${props => props.$isSelected && css`
    filter: brightness(1.05);
    z-index: 10;
    outline: 3px solid rgba(74, 144, 226, 0.8);
    outline-offset: 2px;
    animation: ${selectedGlow} 2s ease-in-out infinite;
  `}

  ${props => props.$isDragging && css`
    opacity: 0.7;
    cursor: grabbing !important;
    z-index: 100;
    filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
    transition: none !important;
  `}

  &:hover {
    z-index: 30;
    cursor: pointer;
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
  }

  &:active {
    cursor: grabbing;
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const CardTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const DocumentCard = ({ 
  document, 
  isSelected, 
  onClick, 
  styleIndex = 0,
  onDragStart,
  onDragEnd,
  isDragging = false,
  position
}) => {
  const IconComponent = document.iconName ? iconMap[document.iconName] : null;

  return (
    <Card
      $styleIndex={styleIndex}
      $isSelected={isSelected}
      $isDragging={isDragging}
      $customPosition={position}
      onClick={onClick}
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
    >
      {IconComponent && <CardIcon><IconComponent /></CardIcon>}
      <CardTitle>{document.title}</CardTitle>
    </Card>
  );
};

export default DocumentCard;
