import React from 'react';
import PropTypes from 'prop-types';

/**
 * DocumentCard - Composant de vignette pour afficher un document
 * 
 * @param {Object} props
 * @param {Object} props.document - Les données du document
 * @param {boolean} props.isSelected - Indique si le document est sélectionné
 * @param {Function} props.onClick - Fonction appelée lors du clic
 */
const DocumentCard = ({ document, isSelected, onClick }) => {
  return (
    <div
      className={`document-card ${isSelected ? 'document-card--selected' : ''}`}
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

DocumentCard.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DocumentCard;
