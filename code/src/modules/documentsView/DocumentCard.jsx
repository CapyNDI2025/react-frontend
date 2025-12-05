import React from 'react';

/**
 * DocumentCard - Composant de vignette pour afficher un document
 * 
 * @param {Object} props
 * @param {Object} props.document - Les données du document
 * @param {boolean} props.isSelected - Indique si le document est sélectionné
 * @param {Function} props.onClick - Fonction appelée lors du clic
 * @param {number} props.styleIndex - Index pour varier le style visuel
 * @param {Function} props.onDragStart - Fonction appelée au début du drag
 * @param {Function} props.onDragEnd - Fonction appelée à la fin du drag
 * @param {boolean} props.isDragging - Indique si ce document est en cours de drag
 * @param {Object} props.position - Position personnalisée {x, y} en pourcentage
 */
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
  // Générer le style inline pour la position personnalisée
  const customStyle = position ? {
    left: `${position.x}%`,
    top: `${position.y}%`,
    right: 'auto',
    bottom: 'auto'
  } : undefined;

  return (
    <div
      className={`document-card document-card--style-${styleIndex % 5} ${isSelected ? 'document-card--selected' : ''} ${isDragging ? 'document-card--dragging' : ''} ${position ? 'document-card--custom-position' : ''}`}
      style={customStyle}
      onClick={onClick}
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
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
