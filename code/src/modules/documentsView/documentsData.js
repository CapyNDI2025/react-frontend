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
    title: "Matériel & équipements",
    summary: "Réemploi et prolongement de la durée de vie du matériel",
    icon: "💻",
    content: `
      <h2>Matériel & équipements</h2>
      
      <h3>Introduction</h3>
      <p>
        Le matériel informatique des établissements scolaires est souvent remplacé avant la fin 
        de sa durée de vie réelle, entraînant des coûts importants et une accumulation de déchets 
        électroniques. Cette situation est due à l'obsolescence programmée, aux mises à jour 
        logicielles incompatibles et à la dépendance aux constructeurs et éditeurs propriétaires.
      </p>

      <h3>Problématique</h3>
      <p>
        Les ordinateurs et tablettes deviennent rapidement obsolètes avec les nouvelles versions 
        de Windows, ce qui contraint les établissements à renouveler leur parc informatique 
        régulièrement. Cette situation entraîne des dépenses importantes et génère des déchets 
        électroniques.
      </p>

      <h3>Exemples</h3>
      <ul>
        <li>
          <a href="https://www.youtube.com/watch?v=76T8oubek-c" target="_blank" rel="noopener">
            France Info, septembre 2025 – L'État obligé de jeter des milliers d'ordinateurs
          </a>
        </li>
        <li>
          <a href="https://video.echirolles.fr/w/hVykGUtRZqRen6eiutqRvQ" target="_blank" rel="noopener">
            France 3 Alpes, octobre 2025 – Windows 11 et logiciels libres
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=S6GLqkhykmA" target="_blank" rel="noopener">
            Back Market – L'ordinateur obsolète
          </a>
        </li>
      </ul>

      <h3>Solutions</h3>
      <ul>
        <li>Réemploi et reconditionnement du matériel existant</li>
        <li>Standardisation du parc informatique</li>
        <li>Maintenance proactive et préventive</li>
        <li>Sensibilisation à l'impact écologique</li>
      </ul>

      <h3>Conclusion</h3>
      <p>
        Prolonger la vie du matériel réduit les coûts, l'empreinte écologique et renforce 
        l'autonomie pédagogique des établissements.
      </p>
    `
  },
  {
    id: 2,
    title: "Logiciels & licences",
    summary: "Éviter le verrouillage éducatif et promouvoir le libre",
    icon: "🔓",
    content: `
      <h2>Logiciels & licences</h2>

      <h3>Introduction</h3>
      <p>
        L'accès gratuit à certains logiciels pendant la scolarité peut cacher un piège : 
        l'effet de verrouillage éducatif. Après les études, ces logiciels deviennent payants 
        et imposent une dépendance aux éditeurs.
      </p>

      <h3>Problématique</h3>
      <p>
        Les établissements dépendent souvent de Microsoft 365 ou Adobe Creative Cloud. 
        Les habitudes prises pendant la scolarité limitent la possibilité d'adopter des 
        solutions libres et autonomes.
      </p>

      <h3>Exemples</h3>
      <ul>
        <li>
          Microsoft 365 Education et Adobe Creative Cloud gratuits pendant les études 
          deviennent payants après
        </li>
        <li>
          Open-Sankoré et LibreOffice offrent des alternatives libres et durables
        </li>
        <li>
          <a href="https://www.radiofrance.fr/franceinter/podcasts/le-grand-reportage-de-france-inter/le-grand-reportage-du-mardi-14-octobre-2025-4136495" target="_blank" rel="noopener">
            France Inter, octobre 2025 – Mises à jour et obsolescence
          </a>
        </li>
      </ul>

      <h3>Solutions</h3>
      <ul>
        <li>Promouvoir les logiciels libres (LibreOffice, GIMP, Blender)</li>
        <li>Former les utilisateurs à plusieurs outils équivalents</li>
        <li>Mutualiser ressources et tutoriels</li>
        <li>Sensibiliser aux abonnements payants après les études</li>
      </ul>

      <h3>Conclusion</h3>
      <p>
        Former aux logiciels libres dès la scolarité garantit l'autonomie numérique 
        et évite la dépendance aux éditeurs propriétaires.
      </p>
    `
  },
  {
    id: 3,
    title: "Données & vie privée",
    summary: "Souveraineté numérique et protection des données",
    icon: "🔒",
    content: `
      <h2>Données & vie privée</h2>

      <h3>Introduction</h3>
      <p>
        Les services propriétaires collectent souvent des données personnelles et les 
        hébergent hors UE, fragilisant la souveraineté numérique des établissements.
      </p>

      <h3>Problématique</h3>
      <p>
        Le stockage externe des données peut rendre les établissements vulnérables en 
        cas de changement de conditions d'utilisation ou de fermeture de services. 
        La dépendance à des plateformes tierces limite le contrôle sur les informations 
        sensibles.
      </p>

      <h3>Exemples</h3>
      <ul>
        <li>
          Google Workspace et Microsoft 365 Education hébergent souvent les données hors UE
        </li>
        <li>
          Des établissements migrés vers des solutions open-source hébergées localement 
          gardent un contrôle total sur leurs données
        </li>
      </ul>

      <h3>Solutions</h3>
      <ul>
        <li>Hébergement local ou européen des données</li>
        <li>Portabilité des fichiers (formats ouverts)</li>
        <li>Chartes d'usage et sensibilisation RGPD</li>
        <li>Adoption de logiciels libres respectueux de la vie privée</li>
      </ul>

      <h3>Sources</h3>
      <ul>
        <li>
          <a href="https://www.cnil.fr/fr/les-membres-du-collectif-educnum?utm_source=chatgpt.com" target="_blank" rel="noopener">
            CNIL – Protection des données dans les écoles
          </a>
        </li>
        <li>
          <a href="https://interoperable-europe.ec.europa.eu/collection/open-source-observatory-osor/news/open-source-and-data-protection-education-france?utm_source=chatgpt.com" target="_blank" rel="noopener">
            OSOR – Open source & data protection
          </a>
        </li>
      </ul>
    `
  },
  {
    id: 4,
    title: "Accompagnement & formation",
    summary: "Former pour une transition numérique réussie",
    icon: "🎓",
    content: `
      <h2>Accompagnement & formation</h2>

      <h3>Introduction</h3>
      <p>
        Former élèves et enseignants est essentiel pour réussir la transition vers 
        un numérique autonome et durable. Sans accompagnement, les établissements 
        restent dépendants des solutions propriétaires.
      </p>

      <h3>Problématique</h3>
      <p>
        L'absence de formation entraîne une dépendance continue aux logiciels propriétaires 
        et prestataires externes. Les enseignants et élèves reproduisent les pratiques 
        apprises sans connaître les alternatives.
      </p>

      <h3>Exemples</h3>
      <ul>
        <li>
          <a href="https://luttes.frama.io/pour/le-logiciel-libre/news/2025/07/13/quelques-liens-sur-le-logiciel-libre-dans-l-education-et-la-fonction-publique.html?utm_source=chatgpt.com" target="_blank" rel="noopener">
            Framasoft et Éducnum – Ressources pédagogiques
          </a>
        </li>
        <li>
          Socles numériques alternatifs dans certains lycées
        </li>
        <li>
          <a href="https://arxiv.org/abs/2012.07744?utm_source=chatgpt.com" target="_blank" rel="noopener">
            Green IT – Sobriété numérique
          </a>
        </li>
      </ul>

      <h3>Solutions</h3>
      <ul>
        <li>Guides complets pour l'utilisation de logiciels libres</li>
        <li>Boîte à outils pédagogique avec tutoriels</li>
        <li>Communauté d'échanges et partage de bonnes pratiques</li>
        <li>Accompagnement personnalisé selon les besoins</li>
      </ul>

      <h3>Conclusion</h3>
      <p>
        Une formation adaptée permet aux acteurs éducatifs de s'approprier les outils 
        libres et de devenir autonomes dans leurs pratiques numériques.
      </p>
    `
  },
  {
    id: 5,
    title: "La démarche NIRD",
    summary: "Numérique Inclusif, Responsable et Durable",
    icon: "🌱",
    content: `
      <h2>La démarche NIRD</h2>

      <h3>Introduction</h3>
      <p>
        La démarche NIRD est née au lycée Carnot de Bruay-la-Buissière. Elle vise à 
        transformer les pratiques numériques dans les écoles pour qu'elles deviennent 
        plus autonomes, durables et responsables.
      </p>

      <h3>Acteurs impliqués</h3>
      <p>
        Élèves, enseignants, directions, techniciens, associations, collectivités 
        et services académiques travaillent ensemble pour porter cette transformation.
      </p>

      <h3>Activités</h3>
      <ul>
        <li>Sensibilisation à la sobriété numérique</li>
        <li>Réemploi et reconditionnement du matériel</li>
        <li>
          Promotion de Linux 
          (<a href="https://tube-numerique-educatif.apps.education.fr/w/3LXem3XK4asbwZa5R1qGkW" target="_blank" rel="noopener">Vidéo 5 min</a>)
        </li>
        <li>Mutualisation des ressources via la Forge des communs</li>
        <li>Accompagnement dans une transition écoresponsable</li>
        <li>
          Co-construction de solutions locales et ouvertes 
          (<a href="https://tube-numerique-educatif.apps.education.fr/w/pZCnzPKTYX2iF38Qh4ZGmq" target="_blank" rel="noopener">Vidéo 4 min</a>)
        </li>
      </ul>

      <h3>Piliers de NIRD</h3>
      <ul>
        <li><strong>Inclusion :</strong> Rendre le numérique accessible à tous</li>
        <li><strong>Responsabilité :</strong> Maîtriser les impacts environnementaux et sociaux</li>
        <li><strong>Durabilité :</strong> Construire des solutions pérennes</li>
      </ul>

      <h3>Sources</h3>
      <ul>
        <li>
          <a href="https://nird.forge.apps.education.fr/" target="_blank" rel="noopener">
            Site officiel NIRD
          </a>
        </li>
        <li>
          <a href="https://www.cafepedagogique.net/2025/04/27/bruay-labuissiere-voyage-au-centre-du-libre-educatif/" target="_blank" rel="noopener">
            Café pédagogique – Lycée Carnot
          </a>
        </li>
      </ul>

      <h3>Conclusion</h3>
      <p>
        NIRD propose un modèle réplicable pour tout établissement souhaitant reprendre 
        la main sur son numérique, en alliant écologie, économie et pédagogie.
      </p>
    `
  }
];

export default documentsData;
