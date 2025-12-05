import React, { useState, useRef, useEffect } from 'react';
import DocumentCard from './DocumentCard';
import DocumentContent from './DocumentContent';
import { documentsData } from './documentsData';
import './styles.css';

/**
 * DocumentsTableView - Composant principal pour afficher les documents
 * en mode "table" avec sélection et affichage du contenu
 * 
 * Ce composant est autonome et peut être intégré n'importe où
 */
const DocumentsTableView = () => {
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [documentPositions, setDocumentPositions] = useState({});
  const [scrollPositions, setScrollPositions] = useState({}); // Sauvegarde du scroll par document
  const [draggedDocumentId, setDraggedDocumentId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDraggingOverContent, setIsDraggingOverContent] = useState(false);
  const [tempDragPosition, setTempDragPosition] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const contentWrapperRef = useRef(null);
  const tableRef = useRef(null);

  // Trouver le document sélectionné
  const selectedDocument = documentsData.find(
    doc => doc.id === selectedDocumentId
  );

  // Gérer la sélection d'un document
  const handleDocumentSelect = (documentId) => {
    // Sauvegarder la position de scroll actuelle avant de changer
    if (selectedDocumentId && contentWrapperRef.current) {
      const scrollElement = contentWrapperRef.current.querySelector('.documents-table-view__content');
      if (scrollElement) {
        setScrollPositions(prev => ({
          ...prev,
          [selectedDocumentId]: scrollElement.scrollTop
        }));
      }
    }
    
    setSelectedDocumentId(documentId);
  };

  // Restaurer la position de scroll quand le document change
  useEffect(() => {
    if (selectedDocumentId && contentWrapperRef.current) {
      const scrollElement = contentWrapperRef.current.querySelector('.documents-table-view__content');
      if (scrollElement) {
        const savedPosition = scrollPositions[selectedDocumentId] || 0;
        scrollElement.scrollTop = savedPosition;
      }
    }
  }, [selectedDocumentId, scrollPositions]);

  // Réinitialiser les positions des documents
  const handleResetPositions = () => {
    // Créer un nouvel objet vide pour forcer le re-render
    setDocumentPositions({});
    setSelectedDocumentId(null);
    setTempDragPosition(null);
    setDraggedDocumentId(null);
    // Incrémenter la clé pour forcer la recréation des composants
    setResetKey(prev => prev + 1);
  };

  // Gérer le début du drag
  const handleDragStart = (documentId, e) => {
    setDraggedDocumentId(documentId);
    
    // Calculer l'offset entre la position de la souris et le centre du document
    const rect = e.target.getBoundingClientRect();
    setDragOffset({
      x: rect.width / 2,
      y: rect.height / 2
    });
  };

  // Gérer le drag sur la table
  const handleDragOver = (e) => {
    e.preventDefault();
    
    if (draggedDocumentId && tableRef.current) {
      const tableRect = tableRef.current.getBoundingClientRect();
      
      // Calculer la position en temps réel
      const x = ((e.clientX - dragOffset.x - tableRect.left) / tableRect.width) * 100;
      const y = ((e.clientY - dragOffset.y - tableRect.top) / tableRect.height) * 100;
      
      // Calculer les dimensions du document
      const docWidth = 15;
      const docHeight = 20;
      
      // Limiter les positions aux bords de la table
      let clampedX = Math.max(3, Math.min(97 - docWidth, x));
      let clampedY = Math.max(3, Math.min(97 - docHeight, y));
      
      // Vérifier si la position est dans la zone de contenu (zone interdite)
      let isInContentZone = false;
      if (contentWrapperRef.current) {
        const contentRect = contentWrapperRef.current.getBoundingClientRect();
        const docX = tableRect.left + (clampedX / 100) * tableRect.width;
        const docY = tableRect.top + (clampedY / 100) * tableRect.height;
        
        isInContentZone = 
          docX + (docWidth / 100 * tableRect.width) > contentRect.left &&
          docX < contentRect.right &&
          docY + (docHeight / 100 * tableRect.height) > contentRect.top &&
          docY < contentRect.bottom;
      }
      
      // Si pas dans la zone de contenu, mettre à jour la position temporaire
      if (!isInContentZone) {
        setTempDragPosition({ x: clampedX, y: clampedY });
      }
      
      // Vérifier si on survole la zone de contenu pour l'indicateur visuel
      if (contentWrapperRef.current) {
        const contentRect = contentWrapperRef.current.getBoundingClientRect();
        const isOverContent = 
          e.clientX >= contentRect.left &&
          e.clientX <= contentRect.right &&
          e.clientY >= contentRect.top &&
          e.clientY <= contentRect.bottom;
        
        setIsDraggingOverContent(isOverContent);
      }
    }
  };

  // Gérer le drop sur la table
  const handleDrop = (e) => {
    e.preventDefault();
    
    if (draggedDocumentId && tempDragPosition) {
      // Vérifier si le drop est dans la zone de contenu (zone interdite)
      if (contentWrapperRef.current) {
        const contentRect = contentWrapperRef.current.getBoundingClientRect();
        const isInContentZone = 
          e.clientX >= contentRect.left &&
          e.clientX <= contentRect.right &&
          e.clientY >= contentRect.top &&
          e.clientY <= contentRect.bottom;
        
        // Si dans la zone de contenu, annuler le drop
        if (isInContentZone) {
          setDraggedDocumentId(null);
          setIsDraggingOverContent(false);
          setTempDragPosition(null);
          return;
        }
      }
      
      // Confirmer la position finale
      setDocumentPositions(prev => ({
        ...prev,
        [draggedDocumentId]: tempDragPosition
      }));
    }
    
    setDraggedDocumentId(null);
    setIsDraggingOverContent(false);
    setTempDragPosition(null);
  };

  // Gérer la fin du drag
  const handleDragEnd = () => {
    setDraggedDocumentId(null);
    setIsDraggingOverContent(false);
    setTempDragPosition(null);
  };

  return (
    <div className="documents-table-view">
      <div className="documents-table-view__container">
        
        {/* En-tête */}
        <div className="documents-table-view__cards-header">
          <div className="documents-table-view__header-content">
            <div>
              <h2 className="documents-table-view__cards-title">
                📚 Salle d'archives NIRD
              </h2>
              <p className="documents-table-view__cards-subtitle">
                {documentsData.length} document{documentsData.length > 1 ? 's' : ''} disponible{documentsData.length > 1 ? 's' : ''}
              </p>
            </div>
            <button 
              className="documents-table-view__reset-button"
              onClick={handleResetPositions}
              title="Réinitialiser les positions"
            >
              🔄 Réorganiser
            </button>
          </div>
        </div>

        {/* Table 3D avec documents autour du contenu */}
        <div className="documents-table-view__table-container">
          <div 
            className="documents-table-view__table"
            ref={tableRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            
            {/* Documents autour de la zone centrale */}
            <div className="documents-table-view__cards-grid">
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
            </div>

            {/* Zone de contenu au centre de la table */}
            <div 
              className={`documents-table-view__content-wrapper ${isDraggingOverContent ? 'documents-table-view__content-wrapper--no-drop' : ''}`}
              ref={contentWrapperRef}
            >
              <main className="documents-table-view__content">
                <DocumentContent document={selectedDocument} />
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTableView;
