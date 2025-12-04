/**
 * Configuration des documents à afficher dans DocumentsTableView
 * 
 * Chaque document doit contenir :
 * - id : identifiant unique
 * - title : titre du document
 * - summary : résumé court (optionnel)
 * - content : contenu complet en HTML ou texte
 * - icon : icône ou emoji (optionnel)
 */

export const documentsData = [
  {
    id: 1,
    title: "Introduction au Projet",
    summary: "Vue d'ensemble du projet et ses objectifs",
    icon: "📘",
    content: `
      <h2>Introduction au Projet</h2>
      <p>
        Bienvenue dans notre projet de visualisation de documents interactifs. 
        Cette application a été conçue pour offrir une expérience utilisateur 
        moderne et intuitive lors de la consultation de documentation.
      </p>
      <h3>Objectifs Principaux</h3>
      <ul>
        <li>Faciliter l'accès rapide à l'information</li>
        <li>Offrir une navigation fluide et agréable</li>
        <li>Maintenir une architecture modulaire et extensible</li>
        <li>Garantir une expérience responsive sur tous les appareils</li>
      </ul>
      <h3>Technologies Utilisées</h3>
      <p>
        Le projet s'appuie sur les technologies modernes du web :
        React pour l'interface utilisateur, avec une architecture basée 
        sur des composants réutilisables et maintenables.
      </p>
      <p>
        L'approche modulaire permet d'intégrer facilement de nouvelles 
        fonctionnalités sans impacter le reste de l'application.
      </p>
    `
  },
  {
    id: 2,
    title: "Architecture Technique",
    summary: "Structure et organisation du code",
    icon: "🏗️",
    content: `
      <h2>Architecture Technique</h2>
      <p>
        L'architecture de ce module suit les meilleures pratiques de 
        développement React et vise à maximiser la réutilisabilité et 
        la maintenabilité du code.
      </p>
      <h3>Structure du Module</h3>
      <p>
        Le module documentsView est organisé de manière autonome :
      </p>
      <ul>
        <li><strong>documentsData.js</strong> : Configuration centralisée des documents</li>
        <li><strong>DocumentCard.jsx</strong> : Composant de vignette individuelle</li>
        <li><strong>DocumentContent.jsx</strong> : Zone d'affichage du contenu</li>
        <li><strong>DocumentsTableView.jsx</strong> : Composant principal orchestrateur</li>
        <li><strong>styles.css</strong> : Styles isolés et spécifiques au module</li>
      </ul>
      <h3>Principes de Conception</h3>
      <p>
        <strong>Séparation des responsabilités :</strong> Chaque composant a un rôle 
        bien défini et peut évoluer indépendamment.
      </p>
      <p>
        <strong>Indépendance contextuelle :</strong> Le module ne dépend pas du 
        contexte global de l'application, permettant sa réutilisation dans 
        différents projets.
      </p>
      <p>
        <strong>Extensibilité :</strong> La structure permet d'ajouter facilement 
        des fonctionnalités comme la recherche, le filtrage par catégories, 
        ou différents modes d'affichage.
      </p>
    `
  },
  {
    id: 3,
    title: "Guide d'Utilisation",
    summary: "Comment utiliser et configurer le module",
    icon: "📖",
    content: `
      <h2>Guide d'Utilisation</h2>
      <p>
        Ce guide vous explique comment intégrer et utiliser le module 
        DocumentsTableView dans votre application.
      </p>
      <h3>Intégration de Base</h3>
      <p>
        Pour utiliser le module, importez simplement le composant principal :
      </p>
      <pre><code>import DocumentsTableView from './modules/documentsView/DocumentsTableView';

function App() {
  return (
    &lt;div&gt;
      &lt;DocumentsTableView /&gt;
    &lt;/div&gt;
  );
}</code></pre>
      <h3>Ajout de Nouveaux Documents</h3>
      <p>
        Pour ajouter un document, éditez le fichier <code>documentsData.js</code> 
        et ajoutez un nouvel objet dans le tableau :
      </p>
      <pre><code>{
  id: 4,
  title: "Nouveau Document",
  summary: "Description courte",
  icon: "🎯",
  content: \`&lt;h2&gt;Titre&lt;/h2&gt;&lt;p&gt;Contenu...&lt;/p&gt;\`
}</code></pre>
      <h3>Personnalisation</h3>
      <p>
        Les styles sont centralisés dans <code>styles.css</code>. Vous pouvez 
        modifier les couleurs, espacements et animations selon vos besoins.
      </p>
      <h3>Responsive Design</h3>
      <p>
        Le module s'adapte automatiquement à la taille de l'écran :
      </p>
      <ul>
        <li>Sur grand écran : vignettes sur les côtés, contenu au centre</li>
        <li>Sur tablette : disposition optimisée</li>
        <li>Sur mobile : vignettes en grille, contenu en dessous</li>
      </ul>
    `
  },
  {
    id: 4,
    title: "Fonctionnalités Avancées",
    summary: "Extensions et améliorations possibles",
    icon: "⚡",
    content: `
      <h2>Fonctionnalités Avancées</h2>
      <p>
        Le module a été conçu avec l'extensibilité à l'esprit. Voici quelques 
        améliorations possibles pour enrichir l'expérience utilisateur.
      </p>
      <h3>Recherche et Filtrage</h3>
      <p>
        Une barre de recherche pourrait être ajoutée pour filtrer les documents 
        en temps réel selon le titre ou le contenu. Cette fonctionnalité peut 
        être implémentée en ajoutant un état de recherche et en filtrant le 
        tableau de documents.
      </p>
      <h3>Catégories et Tags</h3>
      <p>
        L'ajout de catégories permettrait d'organiser les documents par thème :
      </p>
      <ul>
        <li>Ajouter un champ <code>category</code> dans documentsData</li>
        <li>Créer un système de filtrage par catégorie</li>
        <li>Afficher des badges colorés pour chaque catégorie</li>
      </ul>
      <h3>Modes d'Affichage</h3>
      <p>
        Plusieurs modes de visualisation pourraient coexister :
      </p>
      <ul>
        <li><strong>Mode Table</strong> : disposition actuelle</li>
        <li><strong>Mode Grille</strong> : cartes en grille uniforme</li>
        <li><strong>Mode Liste</strong> : affichage compact en liste</li>
        <li><strong>Mode Timeline</strong> : organisation chronologique</li>
      </ul>
      <h3>Animations et Interactions</h3>
      <p>
        Des animations supplémentaires peuvent améliorer l'expérience :
      </p>
      <ul>
        <li>Transition 3D lors de la sélection d'un document</li>
        <li>Effet de parallaxe sur les cartes</li>
        <li>Animation de chargement pour le contenu</li>
        <li>Gestes tactiles pour la navigation mobile</li>
      </ul>
      <h3>Persistance de la Sélection</h3>
      <p>
        Sauvegarder le document sélectionné dans le localStorage permet 
        de retrouver l'état lors du retour sur la page.
      </p>
    `
  },
  {
    id: 5,
    title: "Performance et Optimisation",
    summary: "Bonnes pratiques et optimisations",
    icon: "🚀",
    content: `
      <h2>Performance et Optimisation</h2>
      <p>
        Pour garantir une expérience fluide, plusieurs optimisations ont été 
        mises en place et d'autres peuvent être envisagées.
      </p>
      <h3>Optimisations Actuelles</h3>
      <p>
        <strong>Lazy Loading :</strong> Le contenu des documents n'est rendu 
        que lorsqu'il est sélectionné, évitant de charger tout le HTML en mémoire.
      </p>
      <p>
        <strong>CSS Isolé :</strong> Les styles du module sont séparés pour 
        éviter les conflits et améliorer la maintenabilité.
      </p>
      <h3>Optimisations Recommandées</h3>
      <p>
        <strong>Memoization :</strong> Utiliser <code>React.memo</code> sur 
        les composants DocumentCard pour éviter les re-rendus inutiles.
      </p>
      <pre><code>export default React.memo(DocumentCard);</code></pre>
      <p>
        <strong>Virtualisation :</strong> Pour un grand nombre de documents 
        (plus de 50), implémenter une liste virtualisée avec react-window.
      </p>
      <p>
        <strong>Code Splitting :</strong> Charger le module de manière asynchrone 
        avec React.lazy pour réduire le bundle initial.
      </p>
      <pre><code>const DocumentsTableView = React.lazy(() => 
  import('./modules/documentsView/DocumentsTableView')
);</code></pre>
      <h3>Gestion de la Mémoire</h3>
      <p>
        Pour les contenus très volumineux :
      </p>
      <ul>
        <li>Limiter le nombre de documents affichés simultanément</li>
        <li>Implémenter une pagination ou un chargement infini</li>
        <li>Optimiser les images avec lazy loading natif</li>
        <li>Utiliser des formats d'image modernes (WebP, AVIF)</li>
      </ul>
      <h3>Accessibilité</h3>
      <p>
        Les bonnes pratiques d'accessibilité améliorent aussi les performances :
      </p>
      <ul>
        <li>Utiliser des balises sémantiques appropriées</li>
        <li>Assurer la navigation au clavier</li>
        <li>Fournir des attributs ARIA pour les lecteurs d'écran</li>
        <li>Maintenir un bon contraste de couleurs</li>
      </ul>
    `
  },
  {
    id: 6,
    title: "Maintenance et Évolution",
    summary: "Maintenir et faire évoluer le module",
    icon: "🔧",
    content: `
      <h2>Maintenance et Évolution</h2>
      <p>
        Un code bien structuré facilite grandement la maintenance et l'évolution 
        du projet dans le temps.
      </p>
      <h3>Conventions de Code</h3>
      <p>
        Le projet suit des conventions strictes pour assurer la cohérence :
      </p>
      <ul>
        <li>Nommage en camelCase pour les variables et fonctions</li>
        <li>Nommage en PascalCase pour les composants React</li>
        <li>Fichiers de composants en .jsx</li>
        <li>Un composant par fichier</li>
        <li>Import/export explicites</li>
      </ul>
      <h3>Documentation du Code</h3>
      <p>
        Chaque fichier important doit contenir :
      </p>
      <ul>
        <li>Un commentaire d'en-tête décrivant son rôle</li>
        <li>Des JSDoc pour les fonctions complexes</li>
        <li>Des commentaires explicatifs pour la logique non-évidente</li>
      </ul>
      <h3>Tests</h3>
      <p>
        Pour garantir la stabilité, envisager d'ajouter :
      </p>
      <ul>
        <li><strong>Tests unitaires :</strong> Avec Jest et React Testing Library</li>
        <li><strong>Tests d'intégration :</strong> Pour vérifier les interactions</li>
        <li><strong>Tests visuels :</strong> Avec Storybook ou Chromatic</li>
      </ul>
      <h3>Versioning</h3>
      <p>
        Utiliser Git de manière structurée :
      </p>
      <ul>
        <li>Commits atomiques et descriptifs</li>
        <li>Messages de commit suivant Conventional Commits</li>
        <li>Branches feature pour chaque nouvelle fonctionnalité</li>
        <li>Pull requests avec review de code</li>
      </ul>
      <h3>Dépendances</h3>
      <p>
        Maintenir les dépendances à jour :
      </p>
      <ul>
        <li>Vérifier régulièrement les mises à jour de sécurité</li>
        <li>Tester les breaking changes avant de migrer</li>
        <li>Documenter les raisons des choix de versions</li>
      </ul>
      <h3>Refactoring</h3>
      <p>
        Prévoir des sessions de refactoring régulières pour :
      </p>
      <ul>
        <li>Éliminer le code dupliqué</li>
        <li>Améliorer la lisibilité</li>
        <li>Optimiser les performances</li>
        <li>Simplifier la complexité</li>
      </ul>
    `
  }
];

export default documentsData;
