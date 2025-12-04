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
      <p class="lead">Un enjeu crucial pour la durabilité numérique dans l'éducation</p>
      
      <h3>🔍 Introduction : Le paradoxe de l'obsolescence</h3>
      <p>
        Dans les établissements scolaires français, une tendance inquiétante s'est installée : 
        le matériel informatique est remplacé bien avant la fin de sa durée de vie technique réelle. 
        Un ordinateur conçu pour fonctionner 10 à 15 ans est souvent mis au rebut après seulement 
        3 à 5 ans d'utilisation. Cette situation génère un double problème : des coûts financiers 
        importants pour les collectivités et une accumulation massive de déchets électroniques 
        (e-waste).
      </p>
      <p>
        Les causes de cette obsolescence prématurée sont multiples : l'obsolescence programmée 
        par les constructeurs, les mises à jour logicielles rendant les anciens systèmes incompatibles, 
        et surtout une dépendance aux éditeurs propriétaires qui imposent leurs cycles de renouvellement. 
        Microsoft, par exemple, a annoncé la fin du support de Windows 10 pour octobre 2025, forçant 
        des millions d'ordinateurs parfaitement fonctionnels vers la mise au rebut.
      </p>

      <h3>⚠️ Problématique : Le cercle vicieux du renouvellement</h3>
      <p>
        La problématique est systémique. Chaque nouvelle version de Windows ou macOS exige des 
        configurations matérielles plus puissantes. Les ordinateurs et tablettes des écoles, 
        souvent achetés il y a 3 ou 4 ans, deviennent "obsolètes" non pas parce qu'ils sont 
        cassés, mais parce que les logiciels ne les supportent plus.
      </p>
      <p>
        <strong>Les conséquences sont dramatiques :</strong>
      </p>
      <ul>
        <li><strong>Impact financier :</strong> Un lycée de 1000 élèves doit investir entre 200 000€ 
        et 500 000€ tous les 4-5 ans pour renouveler son parc informatique</li>
        <li><strong>Impact écologique :</strong> La production d'un ordinateur neuf génère 240 kg 
        de CO2 et nécessite 1500 litres d'eau. En France, on estime que 50 000 tonnes de matériel 
        informatique scolaire sont jetées chaque année</li>
        <li><strong>Impact pédagogique :</strong> Les budgets consacrés au matériel sont autant 
        d'argent qui n'est pas investi dans la formation des enseignants ou les ressources éducatives</li>
        <li><strong>Inégalités territoriales :</strong> Les établissements en zone rurale ou défavorisée 
        n'ont pas les moyens de suivre ce rythme et se retrouvent avec du matériel obsolète</li>
      </ul>

      <h3>📰 Exemples concrets et actualités</h3>
      <p>
        L'actualité récente illustre parfaitement cette problématique :
      </p>
      <ul>
        <li>
          <strong>Septembre 2025 - Le scandale des ordinateurs de l'État :</strong>
          <a href="https://www.youtube.com/watch?v=76T8oubek-c" target="_blank" rel="noopener">
            France Info révèle
          </a> que l'État français est contraint de jeter ou de brader des milliers d'ordinateurs 
          parfaitement fonctionnels simplement parce qu'ils ne peuvent pas être mis à jour vers 
          Windows 11. Ces machines, achetées avec l'argent public il y a moins de 5 ans, finissent 
          à la déchetterie.
        </li>
        <li>
          <strong>Octobre 2025 - L'alternative des logiciels libres :</strong>
          <a href="https://video.echirolles.fr/w/hVykGUtRZqRen6eiutqRvQ" target="_blank" rel="noopener">
            France 3 Alpes montre
          </a> comment certaines communes ont choisi Linux pour prolonger la vie de leur matériel. 
          À Échirolles, 300 ordinateurs "obsolètes" ont été sauvés grâce à l'installation d'Ubuntu, 
          économisant 150 000€ à la ville.
        </li>
        <li>
          <strong>Le témoignage de Back Market :</strong>
          <a href="https://www.youtube.com/watch?v=S6GLqkhykmA" target="_blank" rel="noopener">
            Cette vidéo explicative
          </a> démontre comment un ordinateur de 2015 peut parfaitement convenir aux usages 
          bureautiques et pédagogiques d'aujourd'hui, à condition d'utiliser les bons logiciels.
        </li>
      </ul>
      <p>
        <strong>Cas d'école :</strong> Le lycée Victor Hugo à Marseille a calculé qu'en 2023, 
        60% de son parc informatique (240 machines) ne pouvait pas passer à Windows 11. Face à 
        un coût de remplacement estimé à 180 000€, l'établissement a choisi de migrer vers Linux. 
        Résultat : économie totale, matériel prolongé de 5 ans minimum, et élèves formés aux 
        logiciels libres.
      </p>

      <h3>✅ Solutions concrètes pour prolonger la durée de vie</h3>
      
      <h4>1. Réemploi et reconditionnement</h4>
      <p>
        Au lieu de jeter, plusieurs stratégies de réemploi existent :
      </p>
      <ul>
        <li><strong>Mise à niveau ciblée :</strong> Remplacer uniquement les composants défaillants 
        (disque dur par SSD, ajout de RAM) peut redonner 5 ans de vie à un PC pour 50€</li>
        <li><strong>Redistribution interne :</strong> Les machines les plus récentes pour les 
        salles informatiques, les plus anciennes pour les tâches administratives</li>
        <li><strong>Don à des associations :</strong> Des structures comme Emmaüs Connect ou 
        Ateliers Sans Frontières reconditionnent le matériel pour les familles en difficulté</li>
        <li><strong>Ateliers de réparation pédagogiques :</strong> Impliquer les élèves dans 
        le démontage et la réparation développe leurs compétences techniques</li>
      </ul>

      <h4>2. Standardisation du parc informatique</h4>
      <p>
        Adopter une politique d'achat cohérente facilite la maintenance :
      </p>
      <ul>
        <li>Choisir des modèles évolutifs et réparables (certifications iFixit)</li>
        <li>Privilégier les configurations modulaires où chaque composant peut être remplacé</li>
        <li>Négocier des contrats-cadres avec garantie pièces détachées longue durée</li>
        <li>Créer un stock de pièces de rechange communes à toutes les machines</li>
      </ul>

      <h4>3. Migration vers des systèmes d'exploitation libres</h4>
      <p>
        C'est souvent la solution la plus efficace :
      </p>
      <ul>
        <li><strong>Linux (Ubuntu, Debian, Mint) :</strong> Léger, gratuit, sans obsolescence programmée. 
        Une machine de 2010 fonctionne encore parfaitement sous Linux</li>
        <li><strong>Ressources disponibles :</strong> Primtux et AbulÉdu sont des distributions 
        Linux spécialement conçues pour l'éducation française</li>
        <li><strong>Accompagnement :</strong> Des associations comme Framasoft proposent formations 
        et tutoriels gratuits</li>
      </ul>

      <h4>4. Maintenance proactive et préventive</h4>
      <ul>
        <li>Former les enseignants et techniciens aux gestes de maintenance de base</li>
        <li>Installer des outils de monitoring pour détecter les problèmes avant la panne</li>
        <li>Nettoyer régulièrement le matériel (poussière = première cause de surchauffe)</li>
        <li>Créer un calendrier de maintenance préventive (comme pour les véhicules)</li>
      </ul>

      <h4>5. Sensibilisation et formation</h4>
      <ul>
        <li>Intégrer la sobriété numérique dans les programmes (EMC, SNT, NSI)</li>
        <li>Organiser des journées "Repair Café" dans les établissements</li>
        <li>Montrer concrètement l'impact écologique : un ordinateur = 22 kg de ressources minérales</li>
        <li>Valoriser les compétences techniques acquises lors de la réparation</li>
      </ul>

      <h3>🌍 Impact et bénéfices attendus</h3>
      <p>
        Prolonger la vie du matériel de 3 à 8 ans minimum apporte des bénéfices multiples :
      </p>
      <ul>
        <li><strong>Économique :</strong> Réduction de 60% à 80% du budget informatique</li>
        <li><strong>Écologique :</strong> Division par 3 de l'empreinte carbone du numérique scolaire</li>
        <li><strong>Pédagogique :</strong> Développement de l'esprit critique sur la consommation</li>
        <li><strong>Autonomie :</strong> Moins de dépendance aux GAFAM et constructeurs</li>
        <li><strong>Social :</strong> Réduction de la fracture numérique (don du matériel aux familles)</li>
        <li><strong>Compétences :</strong> Formation technique concrète pour les élèves</li>
      </ul>

      <h3>💡 Conclusion : Vers une informatique responsable</h3>
      <p>
        Le matériel informatique n'est pas obsolète quand il cesse de fonctionner, mais quand 
        les logiciels propriétaires décident qu'il l'est. En reprenant le contrôle sur nos choix 
        technologiques, en privilégiant le logiciel libre et la réparabilité, les établissements 
        scolaires peuvent devenir des modèles de sobriété numérique.
      </p>
      <p>
        Cette démarche s'inscrit pleinement dans les objectifs de développement durable de l'ONU 
        (ODD 12 : consommation responsable) et dans la stratégie nationale bas-carbone. C'est 
        aussi une formidable opportunité pédagogique : montrer aux élèves qu'un autre numérique 
        est possible, plus durable, plus éthique, plus libre.
      </p>
      <p>
        <strong>L'obsolescence n'est pas une fatalité, c'est un choix. Faisons le bon.</strong>
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
      <p class="lead">Le piège du "gratuit" éducatif et l'enjeu de la souveraineté numérique</p>

      <h3>🎁 Introduction : Le cadeau empoisonné</h3>
      <p>
        "C'est gratuit pour les étudiants !" Cette promesse alléchante cache une réalité 
        économique bien rodée : le <strong>verrouillage éducatif</strong> (ou <em>educational 
        lock-in</em>). Microsoft, Adobe, Autodesk et d'autres géants du logiciel offrent leurs 
        produits gratuitement ou à prix réduit aux établissements scolaires, non par altruisme, 
        mais comme investissement stratégique.
      </p>
      <p>
        Le mécanisme est simple : habituer les jeunes à leurs outils pendant la formation, 
        pour qu'ils les réclament ensuite dans le monde professionnel. Résultat : après les 
        études, ces mêmes logiciels deviennent payants, souvent très chers, créant une 
        dépendance difficile à rompre.
      </p>
      <blockquote>
        "Give me a child until he is seven and I will show you the man" - proverbe adapté 
        au marketing logiciel : "Formez un élève sur notre logiciel et il l'achètera toute sa vie"
      </blockquote>

      <h3>⚠️ Problématique : La dépendance structurelle</h3>
      
      <h4>1. Le modèle économique de la dépendance</h4>
      <p>
        Les établissements scolaires français dépendent massivement de quelques acteurs :
      </p>
      <ul>
        <li><strong>Microsoft 365 Education :</strong> Utilisé par plus de 85% des établissements 
        français pour la messagerie, le stockage cloud et la bureautique. Gratuit pendant les études, 
        il coûte ensuite 8,80€/mois/utilisateur (105€/an) pour les professionnels</li>
        
        <li><strong>Adobe Creative Cloud :</strong> Standard de facto en design graphique, vidéo et 
        photo. Licence étudiante à 20€/mois pendant les études, puis 60€/mois (720€/an) ensuite</li>
        
        <li><strong>Autodesk (AutoCAD, Revit) :</strong> Incontournable en architecture et CAO. 
        Gratuit pour les étudiants, mais licence professionnelle à 2 300€/an</li>
        
        <li><strong>MATLAB :</strong> Outil de calcul scientifique. Version étudiante à 50€, 
        licence industrielle à 2 150€</li>
      </ul>
      <p>
        <strong>Le calcul est implacable :</strong> Un élève formé sur ces outils pendant 3 à 5 ans 
        développe des automatismes cognitifs difficiles à changer. En entreprise, il demandera 
        naturellement les mêmes logiciels, perpétuant le cycle.
      </p>

      <h4>2. Les habitudes comme prison dorée</h4>
      <p>
        Au-delà du coût, c'est la <strong>perte d'autonomie</strong> qui pose problème :
      </p>
      <ul>
        <li><strong>Formats propriétaires :</strong> Les fichiers .docx, .psd, .dwg créent une 
        dépendance aux logiciels qui les lisent. Impossible d'ouvrir un document Photoshop sans 
        Photoshop (ou presque)</li>
        
        <li><strong>Courbe d'apprentissage :</strong> Après des années sur Word, passer à LibreOffice 
        demande un effort que peu acceptent de fournir. La résistance au changement est humaine</li>
        
        <li><strong>Interopérabilité limitée :</strong> Les éditeurs rendent volontairement difficile 
        l'export vers des formats ouverts, renforçant le verrouillage</li>
        
        <li><strong>Mises à jour forcées :</strong> Les abonnements imposent un rythme de mises à jour 
        incessant, rendant parfois incompatibles les fichiers entre versions</li>
      </ul>

      <h4>3. L'impact sur les budgets publics</h4>
      <p>
        <strong>Exemple concret :</strong> Un lycée de 1200 élèves équipé de Microsoft 365 et Office :
      </p>
      <ul>
        <li>Version éducation gratuite aujourd'hui (grâce au plan numérique)</li>
        <li>Mais serveurs Exchange, SharePoint : 15 000€/an de licences serveur</li>
        <li>Support technique Microsoft : 8 000€/an</li>
        <li>Formation des enseignants : 5 000€/an</li>
        <li><strong>Total : 28 000€/an</strong> pour un service "gratuit"</li>
      </ul>
      <p>
        À l'échelle nationale, les licences Microsoft dans l'éducation représentent des centaines 
        de millions d'euros annuels de dépense publique.
      </p>

      <h3>📰 Exemples et actualités révélatrices</h3>
      
      <h4>Le reportage de France Inter (octobre 2025)</h4>
      <p>
        <a href="https://www.radiofrance.fr/franceinter/podcasts/le-grand-reportage-de-france-inter/le-grand-reportage-du-mardi-14-octobre-2025-4136495" target="_blank" rel="noopener">
          Ce grand reportage
        </a> suit le parcours d'une étudiante en graphisme : formée 3 ans sur la Creative Cloud 
        Adobe, elle découvre à sa sortie d'études que continuer à l'utiliser lui coûterait 720€/an. 
        Freelance débutante, elle ne peut se le permettre, mais ne sait pas utiliser les alternatives 
        libres. Elle se retrouve coincée : pirater (illégal) ou payer (trop cher).
      </p>

      <h4>Le cas OpenSankoré</h4>
      <p>
        OpenSankoré était un logiciel libre de tableau blanc interactif (TBI) développé par l'université 
        de Lausanne et soutenu par le Ministère français. Gratuit, performant, respectueux de la vie 
        privée. Pourtant, il a été abandonné au profit de solutions propriétaires (SMART Notebook, 
        Promethean) car les enseignants étaient déjà formés dessus et les fabricants de TBI imposaient 
        leurs logiciels.
      </p>

      <h4>LibreOffice : l'alternative qui marche</h4>
      <p>
        Des administrations entières ont basculé vers LibreOffice avec succès :
      </p>
      <ul>
        <li><strong>Gendarmerie Nationale :</strong> 72 000 postes migrés depuis 2013, économie de 
        2 millions d'euros par an</li>
        <li><strong>Toulouse Métropole :</strong> Migration complète en 2011, économie estimée à 
        1 million d'euros sur 5 ans</li>
        <li><strong>Municipalité de Munich :</strong> 15 000 postes sous Linux + LibreOffice (puis 
        retour partiel à Windows suite au lobbying Microsoft, puis re-migration vers Linux en 2020)</li>
      </ul>

      <h3>✅ Solutions : Reprendre le contrôle</h3>
      
      <h4>1. Promouvoir les logiciels libres dès la scolarité</h4>
      <p>
        Former sur des alternatives libres garantit l'autonomie future :
      </p>
      <table>
        <tr>
          <th>Propriétaire</th>
          <th>Alternative libre</th>
          <th>Avantages</th>
        </tr>
        <tr>
          <td>Microsoft Office</td>
          <td>LibreOffice / OnlyOffice</td>
          <td>100% gratuit, formats ouverts, compatible Windows/Mac/Linux</td>
        </tr>
        <tr>
          <td>Adobe Photoshop</td>
          <td>GIMP / Krita</td>
          <td>Gratuit, communauté active, extensible</td>
        </tr>
        <tr>
          <td>Adobe Illustrator</td>
          <td>Inkscape</td>
          <td>Gratuit, format SVG standard web</td>
        </tr>
        <tr>
          <td>Adobe Premiere</td>
          <td>Kdenlive / DaVinci Resolve</td>
          <td>Gratuit, performant, professionnel</td>
        </tr>
        <tr>
          <td>Autodesk 3ds Max</td>
          <td>Blender</td>
          <td>Gratuit, utilisé par Hollywood, communauté énorme</td>
        </tr>
        <tr>
          <td>MATLAB</td>
          <td>GNU Octave / Python</td>
          <td>Gratuit, syntaxe compatible, plus de bibliothèques</td>
        </tr>
      </table>

      <h4>2. Former à la polyvalence, pas à un outil unique</h4>
      <p>
        L'erreur pédagogique classique : "Je vais vous apprendre Excel". Mieux vaut : "Je vais 
        vous apprendre les tableurs". Ainsi, les élèves comprennent les concepts (formules, 
        tableaux croisés, graphiques) qui sont transférables sur n'importe quel tableur.
      </p>
      <ul>
        <li>Enseigner les principes, pas les clics</li>
        <li>Montrer plusieurs outils pour une même tâche</li>
        <li>Insister sur les formats ouverts (ODF, SVG, PNG, MP4, etc.)</li>
        <li>Valoriser l'adaptabilité comme compétence clé</li>
      </ul>

      <h4>3. Mutualiser ressources et tutoriels</h4>
      <p>
        Créer une bibliothèque commune :
      </p>
      <ul>
        <li><strong>Framasoft :</strong> Propose des centaines de tutoriels sur les logiciels libres</li>
        <li><strong>La Forge des Communs Numériques Éducatifs :</strong> Plateforme de partage de 
        ressources entre enseignants</li>
        <li><strong>April.org :</strong> Association de promotion du logiciel libre, ressources juridiques 
        et techniques</li>
        <li><strong>Chaînes YouTube éducatives :</strong> De nombreux créateurs produisent des tutoriels 
        GIMP, Blender, LibreOffice en français</li>
      </ul>

      <h4>4. Sensibiliser au coût réel après les études</h4>
      <p>
        Intégrer dans les cours un module "budget numérique professionnel" :
      </p>
      <ul>
        <li>Calculer le coût sur 10 ans d'une suite Adobe vs logiciels libres (7 200€ vs 0€)</li>
        <li>Comprendre la différence entre licence perpétuelle et abonnement</li>
        <li>Analyser les clauses de licences (que peut-on vraiment faire avec un logiciel propriétaire ?)</li>
        <li>Simuler le budget d'un freelance débutant</li>
      </ul>

      <h4>5. Politique d'achat responsable</h4>
      <p>
        Les établissements peuvent agir :
      </p>
      <ul>
        <li>Privilégier les logiciels libres dans les appels d'offres</li>
        <li>Exiger l'interopérabilité et les formats ouverts</li>
        <li>Ne pas accepter de "cadeaux" logiciels qui créent une dépendance</li>
        <li>Former les équipes techniques aux solutions libres</li>
        <li>Participer financièrement aux projets libres utilisés (donation, contrat de support)</li>
      </ul>

      <h3>🌐 Enjeux de souveraineté numérique</h3>
      <p>
        Au-delà de l'aspect économique, c'est une question de souveraineté :
      </p>
      <ul>
        <li><strong>Indépendance technologique :</strong> Ne pas dépendre de décisions prises à 
        Redmond (Microsoft) ou San Francisco (Adobe)</li>
        <li><strong>Sécurité :</strong> Le code source ouvert peut être audité, contrairement au 
        propriétaire (portes dérobées ?)</li>
        <li><strong>Pérennité :</strong> Un logiciel libre ne peut pas "disparaître" ou devenir payant 
        du jour au lendemain</li>
        <li><strong>Éthique :</strong> Les logiciels libres respectent mieux la vie privée et les libertés 
        numériques</li>
      </ul>

      <h3>💡 Conclusion : Former des citoyens numériques libres</h3>
      <p>
        Former aux logiciels libres dès la scolarité, ce n'est pas seulement faire des économies. 
        C'est donner aux élèves les moyens de leur autonomie numérique future. C'est leur apprendre 
        qu'ils ont le choix, que les outils ne sont pas une fatalité, qu'on peut créer, innover et 
        travailler sans dépendre des GAFAM.
      </p>
      <p>
        C'est aussi un acte politique : refuser le verrouillage éducatif, c'est refuser la 
        marchandisation de la connaissance. Les logiciels libres incarnent des valeurs de partage, 
        de coopération et de bien commun que l'école devrait transmettre.
      </p>
      <p>
        <strong>Le gratuit éducatif n'est pas un cadeau, c'est un investissement des éditeurs pour 
        vous vendre demain. Les logiciels libres, eux, vous appartiennent pour toujours.</strong>
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
      <p class="lead">Reprendre le contrôle de nos données éducatives</p>

      <h3>🔐 Introduction : L'or noir du XXIe siècle</h3>
      <p>
        "Les données sont le nouveau pétrole" - cette formule, devenue cliché, n'en reste pas moins 
        vraie. Dans le secteur éducatif, les données personnelles des élèves, enseignants et 
        personnels administratifs représentent une mine d'informations précieuses : habitudes 
        d'apprentissage, résultats scolaires, interactions sociales, localisation, santé mentale...
      </p>
      <p>
        Or, la majorité des établissements français confient ces données à des services propriétaires 
        (Google Workspace, Microsoft 365, Pronote Cloud) souvent hébergés hors d'Europe, fragilisant 
        ainsi leur <strong>souveraineté numérique</strong> et exposant les utilisateurs à des risques 
        juridiques et éthiques.
      </p>

      <h3>⚠️ Problématique : Qui contrôle vos données ?</h3>
      
      <h4>1. L'hébergement hors Union Européenne</h4>
      <p>
        Lorsque vous utilisez Google Workspace for Education ou Microsoft 365 :
      </p>
      <ul>
        <li><strong>Serveurs aux États-Unis :</strong> Vos données sont soumises au Cloud Act américain, 
        qui autorise le gouvernement américain à accéder aux données stockées par des entreprises US, 
        même si elles se trouvent physiquement en Europe</li>
        
        <li><strong>Juridiction floue :</strong> En cas de litige, quelle loi s'applique ? Française ? 
        Européenne (RGPD) ? Américaine ? Les contrats de licence sont souvent opaques sur ce point</li>
        
        <li><strong>Transferts de données :</strong> Google et Microsoft peuvent transférer vos données 
        entre leurs différents data centers mondiaux pour "optimiser les performances". Vous n'avez aucun 
        contrôle sur ces mouvements</li>
        
        <li><strong>Cas d'école (mars 2023) :</strong> Le CEPD (Comité européen de la protection des données) 
        a recommandé l'interdiction de Google Analytics car il transfère des données personnelles vers les 
        USA en violation du RGPD. Pourtant, Google Workspace est toujours massivement utilisé dans les écoles</li>
      </ul>

      <h4>2. La collecte invisible de données</h4>
      <p>
        Les services "gratuits" se payent en données. Voici ce que collectent réellement ces plateformes :
      </p>
      <ul>
        <li><strong>Métadonnées :</strong> Heures de connexion, durée d'utilisation, fréquence, 
        appareil utilisé, localisation IP</li>
        
        <li><strong>Données comportementales :</strong> Quels documents sont ouverts ? combien de temps ? 
        dans quel ordre ? avec qui sont-ils partagés ?</li>
        
        <li><strong>Contenu :</strong> Google scanne le contenu des emails et documents pour "améliorer 
        ses services" (comprendre : ciblage publicitaire et entraînement d'IA)</li>
        
        <li><strong>Données biométriques :</strong> Certains services proposent la reconnaissance faciale 
        pour "simplifier la connexion"</li>
        
        <li><strong>Profilage :</strong> Toutes ces données permettent de créer des profils détaillés des 
        utilisateurs, notamment des mineurs</li>
      </ul>
      <p>
        <strong>Exemple concret :</strong> Une étude de 2022 a montré que Google Classroom envoyait aux 
        serveurs de Google plus de 200 types d'événements différents (ouverture de fichier, clic sur un 
        lien, temps passé sur une page, etc.), créant un tracking quasi-permanent de l'activité scolaire.
      </p>

      <h4>3. Dépendance et vulnérabilité</h4>
      <p>
        Confier ses données à un tiers, c'est prendre des risques :
      </p>
      <ul>
        <li><strong>Changement des conditions d'utilisation :</strong> En 2024, Microsoft a modifié ses 
        CGU pour permettre l'utilisation de données Office 365 pour entraîner ses IA. Les établissements 
        n'ont eu qu'à accepter ou à payer plus cher une version "sans IA"</li>
        
        <li><strong>Fermeture de services :</strong> Google a fermé plus de 200 services depuis sa création 
        (Google Reader, Google+, etc.). Imaginez que Google Classroom ferme demain : que deviennent vos 10 
        ans d'archives pédagogiques ?</li>
        
        <li><strong>Pannes :</strong> En décembre 2020, Google a connu une panne mondiale de 2h. Des milliers 
        d'établissements n'ont pu ni enseigner ni accéder aux devoirs des élèves</li>
        
        <li><strong>Ransomware :</strong> Les attaques sur le cloud se multiplient. En 2023, plusieurs académies 
        ont vu leurs données Office 365 chiffrées par des hackers, avec demande de rançon</li>
        
        <li><strong>Révélations :</strong> Les affaires Snowden (2013), Cambridge Analytica (2018) ont montré 
        que même les géants tech peuvent divulguer ou vendre des données "anonymisées"</li>
      </ul>

      <h3>📰 Exemples et actualités</h3>
      
      <h4>L'avis de la CNIL (janvier 2023)</h4>
      <p>
        La CNIL française a publié un 
        <a href="https://www.cnil.fr/fr/les-membres-du-collectif-educnum" target="_blank" rel="noopener">
          guide sur la protection des données dans les écoles
        </a>. Principaux points :
      </p>
      <ul>
        <li>Les établissements sont responsables des données personnelles qu'ils collectent</li>
        <li>L'utilisation de services cloud américains pose problème au regard du RGPD</li>
        <li>Il faut privilégier des hébergeurs européens ou, mieux, locaux</li>
        <li>Le consentement des parents doit être éclairé (pas juste cocher une case)</li>
        <li>Les données des mineurs doivent bénéficier d'une protection renforcée</li>
      </ul>

      <h4>Le rapport de l'OSOR (Open Source Observatory)</h4>
      <p>
        L'Observatoire européen de l'open source 
        <a href="https://interoperable-europe.ec.europa.eu/collection/open-source-observatory-osor/news/open-source-and-data-protection-education-france" target="_blank" rel="noopener">
          a étudié les liens entre logiciels libres et protection des données
        </a>. Conclusions :
      </p>
      <ul>
        <li>Les logiciels libres permettent un meilleur contrôle des données</li>
        <li>L'hébergement local garantit la souveraineté</li>
        <li>La transparence du code source facilite les audits de sécurité</li>
        <li>Les formats ouverts évitent le verrouillage et permettent la portabilité</li>
      </ul>

      <h4>Le cas allemand : interdiction de Microsoft 365 dans certains Länder</h4>
      <p>
        En 2022, plusieurs États allemands (Bade-Wurtemberg, Hesse) ont interdit l'utilisation de 
        Microsoft 365 et Teams dans les écoles publiques, jugeant qu'ils ne respectaient pas le RGPD. 
        Alternative proposée : migration vers des solutions open-source hébergées localement.
      </p>

      <h4>Les collectivités qui reprennent la main</h4>
      <ul>
        <li><strong>Région Hauts-de-France :</strong> Déploiement de Nextcloud hébergé régionalement pour 
        tous les lycées (100 000 utilisateurs). Coût : 500 000€ initial vs 2M€/an pour Microsoft</li>
        
        <li><strong>Ville de Paris :</strong> Migration progressive vers des outils libres (LibreOffice, 
        Thunderbird) et hébergement dans les data centers municipaux</li>
        
        <li><strong>Académie de Rennes :</strong> Projet "Colibri" - plateforme éducative 100% libre 
        et hébergée localement</li>
      </ul>

      <h3>✅ Solutions : Reprendre le contrôle</h3>
      
      <h4>1. Hébergement local ou européen</h4>
      <p>
        Plusieurs options existent :
      </p>
      <ul>
        <li><strong>Serveurs sur site :</strong> Le lycée héberge son propre serveur. Avantages : contrôle 
        total, conformité RGPD garantie. Inconvénient : nécessite des compétences techniques</li>
        
        <li><strong>Hébergeurs français/européens :</strong> OVH, Scaleway, Infomaniak proposent des 
        solutions cloud RGPD-compliant avec serveurs en Europe</li>
        
        <li><strong>Mutualisation académique :</strong> Les rectorats peuvent mutualiser l'infrastructure 
        (plusieurs établissements sur des serveurs académiques)</li>
        
        <li><strong>Solutions dédiées :</strong> 
          <ul>
            <li>Nextcloud Éducation (stockage, collaboration)</li>
            <li>Moodle (plateforme d'apprentissage)</li>
            <li>BigBlueButton (visioconférence)</li>
            <li>Jitsi Meet (visioconférence)</li>
            <li>Rocket.Chat (messagerie instantanée)</li>
          </ul>
        </li>
      </ul>

      <h4>2. Formats ouverts et portabilité</h4>
      <p>
        Utiliser des formats standards pour garantir la pérennité et l'indépendance :
      </p>
      <ul>
        <li><strong>Documents :</strong> ODF (.odt, .ods) au lieu de .docx, .xlsx</li>
        <li><strong>Images :</strong> PNG, SVG au lieu de .psd</li>
        <li><strong>Emails :</strong> Standard IMAP/SMTP (permet de changer de fournisseur facilement)</li>
        <li><strong>Calendriers :</strong> Format iCal standard</li>
        <li><strong>Données :</strong> CSV, JSON, XML pour l'export</li>
      </ul>
      <p>
        Ainsi, si vous changez de solution, vos données restent accessibles et exploitables.
      </p>

      <h4>3. Chartes d'usage et sensibilisation RGPD</h4>
      <p>
        Former toute la communauté éducative :
      </p>
      <ul>
        <li>Rédiger une charte de protection des données compréhensible</li>
        <li>Nommer un DPO (Délégué à la Protection des Données) dans chaque établissement</li>
        <li>Former les enseignants aux bonnes pratiques (ne pas partager de données sensibles sur des 
        plateformes tierces)</li>
        <li>Sensibiliser les élèves : "vos données vous appartiennent"</li>
        <li>Obtenir des consentements éclairés (pas de cases pré-cochées)</li>
        <li>Organiser des audits réguliers des outils utilisés</li>
      </ul>

      <h4>4. Solutions libres respectueuses de la vie privée</h4>
      <p>
        Tableau comparatif :
      </p>
      <table>
        <tr>
          <th>Service</th>
          <th>Propriétaire</th>
          <th>Alternative libre</th>
          <th>Hébergement</th>
        </tr>
        <tr>
          <td>Stockage cloud</td>
          <td>Google Drive, OneDrive</td>
          <td>Nextcloud, Seafile</td>
          <td>Local ou EU</td>
        </tr>
        <tr>
          <td>Visioconférence</td>
          <td>Google Meet, Teams</td>
          <td>Jitsi, BigBlueButton</td>
          <td>Local ou EU</td>
        </tr>
        <tr>
          <td>Messagerie</td>
          <td>Gmail, Outlook</td>
          <td>Mailcow, Zimbra</td>
          <td>Local ou EU</td>
        </tr>
        <tr>
          <td>Plateforme pédagogique</td>
          <td>Google Classroom</td>
          <td>Moodle, Chamilo</td>
          <td>Local ou EU</td>
        </tr>
        <tr>
          <td>Messagerie instantanée</td>
          <td>WhatsApp, Messenger</td>
          <td>Rocket.Chat, Element (Matrix)</td>
          <td>Local ou EU</td>
        </tr>
      </table>

      <h4>5. Analyse d'impact relative à la protection des données (AIPD)</h4>
      <p>
        Avant d'adopter un nouvel outil numérique, réaliser une AIPD :
      </p>
      <ul>
        <li>Quelles données sont collectées ?</li>
        <li>Où sont-elles hébergées ?</li>
        <li>Qui y a accès ?</li>
        <li>Combien de temps sont-elles conservées ?</li>
        <li>Peuvent-elles être exportées/supprimées facilement ?</li>
        <li>L'éditeur respecte-t-il le RGPD ?</li>
        <li>Existe-t-il une alternative plus respectueuse ?</li>
      </ul>

      <h3>🛡️ Enjeux de souveraineté et sécurité</h3>
      <p>
        Au-delà de la vie privée individuelle, c'est la souveraineté collective qui est en jeu :
      </p>
      <ul>
        <li><strong>Éducation nationale :</strong> Les données scolaires sont un patrimoine national. 
        Les confier à des entreprises étrangères, c'est perdre le contrôle sur l'avenir éducatif</li>
        
        <li><strong>Innovation :</strong> Les données éducatives pourraient servir à améliorer nos 
        propres outils pédagogiques. Actuellement, elles enrichissent les IA de Google et Microsoft</li>
        
        <li><strong>Sécurité :</strong> Un serveur local bien administré peut être plus sûr qu'un cloud 
        américain soumis aux pressions géopolitiques</li>
        
        <li><strong>Éthique :</strong> Enseigner la protection des données en utilisant Google Classroom, 
        c'est contradictoire. Il faut montrer l'exemple</li>
      </ul>

      <h3>💡 Conclusion : Nos données, notre liberté</h3>
      <p>
        Protéger les données dans l'éducation, ce n'est pas de la paranoïa, c'est du bon sens. Les élèves 
        d'aujourd'hui sont les citoyens numériques de demain. Leur apprendre à protéger leur vie privée, 
        à comprendre où vont leurs données, à choisir des outils respectueux, c'est leur donner les clés 
        de leur autonomie numérique.
      </p>
      <p>
        Les solutions existent : logiciels libres, hébergement local, formats ouverts. Ce qui manque souvent, 
        c'est la volonté politique et les moyens humains pour opérer cette transition. Mais l'enjeu en vaut 
        la peine : garantir la souveraineté numérique de notre système éducatif, protéger l'intimité de nos 
        élèves, et montrer qu'un autre numérique est possible.
      </p>
      <p>
        <strong>Vos données vous appartiennent. Ne les donnez pas gratuitement à ceux qui en feront commerce.</strong>
      </p>
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
