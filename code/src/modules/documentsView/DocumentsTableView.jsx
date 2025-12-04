import React, { useState } from 'react';
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

  // Trouver le document sélectionné
  const selectedDocument = documentsData.find(
    doc => doc.id === selectedDocumentId
  );

  // Gérer la sélection d'un document
  const handleDocumentSelect = (documentId) => {
    setSelectedDocumentId(documentId);
  };

  return (
    <div className="documents-table-view">
      <div className="documents-table-view__container">
        
        {/* En-tête */}
        <div className="documents-table-view__cards-header">
          <h2 className="documents-table-view__cards-title">
            📚 Salle d'archives NIRD
          </h2>
          <p className="documents-table-view__cards-subtitle">
            {documentsData.length} document{documentsData.length > 1 ? 's' : ''} disponible{documentsData.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Table 3D avec documents */}
        <div className="documents-table-view__table-container">
          <div className="documents-table-view__table">
            <div className="documents-table-view__cards-grid">
              {documentsData.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  isSelected={selectedDocumentId === document.id}
                  onClick={() => handleDocumentSelect(document.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Zone de contenu */}
        <main className="documents-table-view__content">
          <DocumentContent document={selectedDocument} />
        </main>
      </div>
    </div>
  );
};

export default DocumentsTableView;
