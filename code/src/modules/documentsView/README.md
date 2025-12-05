# Module DocumentsTableView

## 📋 Description

Module indépendant et réutilisable pour afficher des documents sous forme de cartes interactives avec visualisation du contenu.

## 🎯 Fonctionnalités

- **Interface "table"** : Affichage des documents sous forme de cartes cliquables
- **Affichage du contenu** : Zone centrale dédiée pour le contenu complet
- **Style de sélection** : Indication visuelle du document actif
- **Animations fluides** : Transitions douces et animations d'apparition
- **Responsive** : Adaptation automatique à tous les écrans
- **Autonome** : Fonctionne sans dépendances du contexte global

## 📁 Structure

```
modules/documentsView/
├── DocumentsTableView.jsx    # Composant principal
├── DocumentCard.jsx           # Carte de document
├── DocumentContent.jsx        # Zone de contenu
├── documentsData.js           # Configuration des documents
├── styles.css                 # Styles du module
└── README.md                  # Documentation
```

## 🚀 Utilisation

### Installation

```jsx
import DocumentsTableView from './modules/documentsView/DocumentsTableView';

function App() {
  return (
    <div>
      <DocumentsTableView />
    </div>
  );
}
```

### Ajout de documents

Éditez le fichier `documentsData.js` :

```javascript
export const documentsData = [
  {
    id: 1,
    title: "Mon Document",
    summary: "Résumé court",
    icon: "📄",
    content: `<h2>Contenu</h2><p>Texte...</p>`
  },
  // Ajoutez vos documents ici
];
```

## 🎨 Personnalisation

### Styles

Les styles sont centralisés dans `styles.css`. Vous pouvez modifier :
- Les couleurs (dégradés, bordures)
- Les espacements
- Les animations
- Le layout responsive

### Exemples de personnalisation

```css
/* Changer le dégradé de fond */
.documents-table-view {
  background: linear-gradient(135deg, #your-color 0%, #your-color-2 100%);
}

/* Modifier la largeur des cartes */
.documents-table-view__container {
  grid-template-columns: 400px 1fr; /* Au lieu de 350px */
}
```

## 📱 Responsive

Le module s'adapte automatiquement :

- **Desktop (> 1024px)** : Cartes à gauche (sticky), contenu à droite
- **Tablet (768px - 1024px)** : Layout optimisé
- **Mobile (< 768px)** : Cartes en grille au-dessus, contenu en dessous

## ♿ Accessibilité

- Navigation au clavier (Tab, Enter, Space)
- Attributs ARIA appropriés
- Respect des préférences de mouvement réduit
- Contraste de couleurs suffisant

## 🔧 Extensions possibles

### Recherche
Ajouter une barre de recherche pour filtrer les documents.

### Catégories
Implémenter un système de tags/catégories dans `documentsData.js`.

### Modes d'affichage
Créer des vues alternatives (grille, liste, timeline).

### Persistance
Sauvegarder la sélection dans le localStorage.

## 📦 Dépendances

- React (avec hooks)
- PropTypes

## 🤝 Contribution

Pour ajouter des fonctionnalités :

1. Créer une branche feature
2. Implémenter les changements
3. Tester sur différents écrans
4. Faire un commit avec un message descriptif

## 📝 Licence

Ce module fait partie du projet react-frontend.
