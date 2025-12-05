import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { RiBookOpenLine, RiRefreshLine, RiForbidLine } from 'react-icons/ri';
import DocumentCard from './DocumentCard';
import DocumentContent from './DocumentContent';
import { documentsData } from './documentsData';

// ============ ANIMATIONS ============
const contentFadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const noDrop = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

const selectedGlow = keyframes`
  0%, 100% { outline-color: rgba(74, 144, 226, 0.6); }
  50% { outline-color: rgba(74, 144, 226, 0.9); }
`;

// ============ STYLED COMPONENTS ============
const ViewContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  padding: 1rem;
  perspective: 1500px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
`;

const Container = styled.div`
  max-width: 1600px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  width: 100%;
  max-width: 1200px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #ecf0f1;
  margin: 0 0 0.25rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #bdc3c7;
  margin: 0;
`;

const ResetButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #2980b9, #21618c);
    transform: translateY(-2px);
  }
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  flex: 1;
  position: relative;
`;

const Table = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #8B4513, #A0522D);
  border-radius: 20px;
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.4),
    inset 0 2px 10px rgba(255, 255, 255, 0.1),
    inset 0 -5px 15px rgba(0, 0, 0, 0.3);
  transform: rotateX(20deg);
  transform-style: preserve-3d;
  padding: 2rem;
  border: 8px solid #654321;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.03) 2px,
      rgba(0, 0, 0, 0.03) 4px
    );
    border-radius: 12px;
    pointer-events: none;
  }
`;

const CardsGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform-style: preserve-3d;
  pointer-events: none;

  & > * {
    pointer-events: all;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 560px;
  transform-style: preserve-3d;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }

  ${props => props.$noDrop && `
    animation: ${noDrop} 0.3s ease-in-out;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) translateZ(30px);
      background: rgba(231, 76, 60, 0.95);
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      pointer-events: none;
      z-index: 100;
    }
  `}
`;

const Content = styled.main`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  min-height: 450px;
  max-height: 550px;
  overflow-y: auto;
  animation: ${contentFadeIn} 0.4s ease-out;
  border: 3px solid #95a5a6;
  transform: translateZ(20px);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(149, 165, 166, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #95a5a6, #7f8c8d);
    border-radius: 10px;
  }
`;

// Export des styled components pour les sous-composants
export { selectedGlow };

/**
 * DocumentsTableView - Composant principal pour afficher les documents
 */
const DocumentsTableView = () => {
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [documentPositions, setDocumentPositions] = useState({});
  const [scrollPositions, setScrollPositions] = useState({});
  const [draggedDocumentId, setDraggedDocumentId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDraggingOverContent, setIsDraggingOverContent] = useState(false);
  const [tempDragPosition, setTempDragPosition] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const contentWrapperRef = useRef(null);
  const tableRef = useRef(null);

  const selectedDocument = documentsData.find(
    doc => doc.id === selectedDocumentId
  );

  const handleDocumentSelect = (documentId) => {
    if (selectedDocumentId && contentWrapperRef.current) {
      const scrollElement = contentWrapperRef.current.querySelector('main');
      if (scrollElement) {
        setScrollPositions(prev => ({
          ...prev,
          [selectedDocumentId]: scrollElement.scrollTop
        }));
      }
    }
    setSelectedDocumentId(documentId);
  };

  useEffect(() => {
    if (selectedDocumentId && contentWrapperRef.current) {
      const scrollElement = contentWrapperRef.current.querySelector('main');
      if (scrollElement) {
        scrollElement.scrollTop = scrollPositions[selectedDocumentId] || 0;
      }
    }
  }, [selectedDocumentId, scrollPositions]);

  const handleResetPositions = () => {
    setDocumentPositions({});
    setSelectedDocumentId(null);
    setTempDragPosition(null);
    setDraggedDocumentId(null);
    setResetKey(prev => prev + 1);
  };

  const handleDragStart = (documentId, e) => {
    setDraggedDocumentId(documentId);
    const rect = e.target.getBoundingClientRect();
    setDragOffset({ x: rect.width / 2, y: rect.height / 2 });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (draggedDocumentId && tableRef.current) {
      const tableRect = tableRef.current.getBoundingClientRect();
      const x = ((e.clientX - dragOffset.x - tableRect.left) / tableRect.width) * 100;
      const y = ((e.clientY - dragOffset.y - tableRect.top) / tableRect.height) * 100;
      const clampedX = Math.max(3, Math.min(82, x));
      const clampedY = Math.max(3, Math.min(77, y));

      let isInContentZone = false;
      if (contentWrapperRef.current) {
        const contentRect = contentWrapperRef.current.getBoundingClientRect();
        isInContentZone = 
          e.clientX >= contentRect.left && e.clientX <= contentRect.right &&
          e.clientY >= contentRect.top && e.clientY <= contentRect.bottom;
      }

      if (!isInContentZone) {
        setTempDragPosition({ x: clampedX, y: clampedY });
      }
      setIsDraggingOverContent(isInContentZone);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedDocumentId && tempDragPosition) {
      if (contentWrapperRef.current) {
        const contentRect = contentWrapperRef.current.getBoundingClientRect();
        const isInContentZone = 
          e.clientX >= contentRect.left && e.clientX <= contentRect.right &&
          e.clientY >= contentRect.top && e.clientY <= contentRect.bottom;

        if (!isInContentZone) {
          setDocumentPositions(prev => ({
            ...prev,
            [draggedDocumentId]: tempDragPosition
          }));
        }
      }
    }
    setDraggedDocumentId(null);
    setIsDraggingOverContent(false);
    setTempDragPosition(null);
  };

  const handleDragEnd = () => {
    setDraggedDocumentId(null);
    setIsDraggingOverContent(false);
    setTempDragPosition(null);
  };

  return (
    <ViewContainer>
      <Container>
        <Header>
          <HeaderContent>
            <div>
              <Title>
                <RiBookOpenLine />
                Salle d'archives NIRD
              </Title>
              <Subtitle>
                {documentsData.length} document{documentsData.length > 1 ? 's' : ''} disponible{documentsData.length > 1 ? 's' : ''}
              </Subtitle>
            </div>
            <ResetButton onClick={handleResetPositions}>
              <RiRefreshLine />
              Réorganiser
            </ResetButton>
          </HeaderContent>
        </Header>

        <TableContainer>
          <Table
            ref={tableRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <CardsGrid>
              {documentsData.map((document, index) => (
                <DocumentCard
                  key={`${document.id}-${resetKey}`}
                  document={document}
                  isSelected={selectedDocumentId === document.id}
                  onClick={() => handleDocumentSelect(document.id)}
                  styleIndex={index}
                  onDragStart={(e) => handleDragStart(document.id, e)}
                  onDragEnd={handleDragEnd}
                  isDragging={draggedDocumentId === document.id}
                  position={
                    draggedDocumentId === document.id && tempDragPosition
                      ? tempDragPosition
                      : documentPositions[document.id]
                  }
                />
              ))}
            </CardsGrid>

            <ContentWrapper ref={contentWrapperRef} $noDrop={isDraggingOverContent}>
              <Content>
                <DocumentContent document={selectedDocument} />
              </Content>
            </ContentWrapper>
          </Table>
        </TableContainer>
      </Container>
    </ViewContainer>
  );
};

export default DocumentsTableView;
