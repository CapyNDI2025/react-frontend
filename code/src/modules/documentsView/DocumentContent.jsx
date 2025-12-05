import React from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  RiFileTextLine, 
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

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const iconRotate = keyframes`
  from { transform: rotate(-180deg) scale(0); opacity: 0; }
  to { transform: rotate(0) scale(1); opacity: 1; }
`;

const ContentContainer = styled.div`
  animation: ${slideIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
`;

const Placeholder = styled.div`
  text-align: center;
  color: #a0aec0;
`;

const PlaceholderIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
  display: flex;
  justify-content: center;
`;

const PlaceholderText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #e2e8f0;
`;

const Icon = styled.span`
  font-size: 2.5rem;
  animation: ${iconRotate} 0.6s ease-out;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  line-height: 1.2;
`;

const Body = styled.div`
  color: #4a5568;
  line-height: 1.7;
  font-size: 0.9rem;

  h2 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #2d3748;
    margin: 1.5rem 0 0.75rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
    margin: 1rem 0 0.5rem 0;
  }

  p {
    margin: 0 0 0.75rem 0;
    text-align: justify;
  }

  ul, ol {
    margin: 0.75rem 0;
    padding-left: 1.25rem;
  }

  li {
    margin: 0.4rem 0;
  }

  strong {
    color: #2d3748;
    font-weight: 600;
  }

  code {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 0.15rem 0.3rem;
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
    color: #667eea;
  }

  a {
    color: #3182ce;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DocumentContent = ({ document }) => {
  if (!document) {
    return (
      <EmptyContainer>
        <Placeholder>
          <PlaceholderIcon>
            <RiFileTextLine />
          </PlaceholderIcon>
          <PlaceholderText>
            Sélectionnez un document pour afficher son contenu
          </PlaceholderText>
        </Placeholder>
      </EmptyContainer>
    );
  }

  const IconComponent = document.iconName ? iconMap[document.iconName] : null;

  return (
    <ContentContainer>
      <Header>
        {IconComponent && <Icon><IconComponent /></Icon>}
        <Title>{document.title}</Title>
      </Header>
      <Body dangerouslySetInnerHTML={{ __html: document.content }} />
    </ContentContainer>
  );
};

export default DocumentContent;
