import React from 'react';

/**
 * DocumentCard - Composant de vignette pour afficher un document
 * 
 * @param {Object} props
 * @param {Object} props.document - Les données du document
 * @param {boolean} props.isSelected - Indique si le document est sélectionné
 * @param {Function} props.onClick - Fonction appelée lors du clic
 * @param {number} props.styleIndex - Index pour varier le style visuel
 */
const DocumentCard = ({ document, isSelected, onClick, styleIndex = 0 }) => {
  return (
    <div
      className={`document-card document-card--style-${styleIndex % 5} ${isSelected ? 'document-card--selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      aria-pressed={isSelected}
    >
      {document.icon && (
        <div className="document-card__icon">
          {document.icon}
        </div>
      )}
      <h3 className="document-card__title">{document.title}</h3>
      {document.summary && (
        <p className="document-card__summary">{document.summary}</p>
      )}
    </div>
  );
};

export default DocumentCard;
