import React from 'react';
import PropTypes from 'prop-types';

/**
 * DocumentContent - Composant pour afficher le contenu complet d'un document
 * 
 * @param {Object} props
 * @param {Object} props.document - Le document à afficher
 */
const DocumentContent = ({ document }) => {
  if (!document) {
    return (
      <div className="document-content document-content--empty">
        <div className="document-content__placeholder">
          <span className="document-content__placeholder-icon">📄</span>
          <p className="document-content__placeholder-text">
            Sélectionnez un document pour afficher son contenu
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="document-content">
      <div className="document-content__header">
        {document.icon && (
          <span className="document-content__icon">{document.icon}</span>
        )}
        <h1 className="document-content__title">{document.title}</h1>
      </div>
      <div 
        className="document-content__body"
        dangerouslySetInnerHTML={{ __html: document.content }}
      />
    </div>
  );
};

DocumentContent.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    content: PropTypes.string.isRequired,
  }),
};

DocumentContent.defaultProps = {
  document: null,
};

export default DocumentContent;
