export const fr = {
  nav: {
    docs: "Documentation",
    examples: "Exemples",
  },
  sidebar: {
    header: "Documentation",
    pays: "Pays",
    regions: "Régions",
    departments: "Départements",
    telecom: "Télécom",
    search: "Recherche",
    calculs: "Calculs",
    tri: "Tri & Filtres",
  },
  footer: {
    copyright: "Galsenify v1.2.0 - MIT Licence",
  },
  codeBlock: {
    copy: "Copier",
    copied: "Copié !",
  },
  home: {
    badgeNew: "Nouveau",
    badgeAvailable: "disponible sur NPM",
    taglinePre: "Une bibliothèque complète de données sénégalaises.",
    ctaDocs: "Lire la documentation",
    ctaExamples: "Voir les exemples",
    statsRegions: "Régions",
    statsDepts: "Départements",
    statsOps: "Opérateurs",
    installTitle: "Installation",
    quickstartTitle: "Démarrage rapide",
    exploreTitle: "Explorer la documentation",
    cardDesc: {
      pays: "2 méthodes - données du Sénégal et langues nationales",
      regions: "6 méthodes - liste, codes, population, superficie",
      departments: "4 méthodes - liste, arrondissements, stats",
      telecom: "4 méthodes - opérateurs, recherche par préfixe/numéro",
      search: "2 méthodes - recherche textuelle et par code",
      calculs: "5 méthodes - population totale, densité, superficie",
      tri: "7 méthodes - tri, filtres, aléatoire",
    },
  },
  examples: {
    title: "Exemples interactifs",
    intro: "Testez les méthodes de galsenify directement dans le navigateur.",
    liveDemo: "Démo live",
    table: {
      title: "Tableau des régions",
      desc: "Affiche toutes les régions avec leurs données via galsenify.rg()",
      headers: ["Région", "Code", "Population", "Superficie (km²)"],
    },
    select: {
      title: "Liste déroulante",
      desc: "Sélectionnez une région pour voir sa population et superficie",
      labelPop: "Population",
      labelArea: "Superficie",
    },
    radio: {
      title: "Départements par région",
      desc: "Choisissez une région et voyez ses départements",
      depsOf: "Départements de",
    },
    search: {
      title: "Recherche",
      desc: "Recherche en temps réel dans les données géographiques",
      placeholder: "Rechercher une région ou un département...",
      noResult: "Aucun résultat pour",
    },
    telecom: {
      title: "Identification opérateur",
      desc: "Identifiez l'opérateur d'un numéro de téléphone sénégalais",
      placeholder: "ex: 771234567",
      btn: "Identifier",
      operateur: "Opérateur",
      notFound: "Aucun opérateur trouvé pour ce numéro.",
    },
    random: {
      title: "Région aléatoire",
      desc: "Tirez une région au hasard avec galsenify.randomRegion()",
      btn: "Tirer une région aléatoire",
      labelRegion: "Région",
      labelCode: "Code",
      labelPop: "Population",
      labelArea: "Superficie",
    },
  },
  docs: {
    regions: {
      title: "Régions",
      intro: "6 méthodes pour accéder aux données des 14 régions du Sénégal.",
      methods: [
        "Retourne un tableau de tous les objets Region avec leurs propriétés complètes (nom, code, population, superficie, départements).",
        "Retourne un tableau de noms de toutes les régions du Sénégal.",
        "Retourne un tableau des codes officiels de toutes les régions.",
        "Retourne la liste des départements d'une région donnée.",
        "Retourne la population d'une région donnée.",
        "Retourne la superficie (en km²) d'une région donnée.",
      ],
    },
    departments: {
      title: "Départements",
      intro:
        "4 méthodes pour accéder aux données des 46 départements du Sénégal.",
      methods: [
        "Retourne un tableau de tous les départements du Sénégal (46 départements).",
        "Retourne la liste des arrondissements d'un département donné.",
        "Retourne la population d'un département donné.",
        "Retourne la superficie (en km²) d'un département donné.",
      ],
    },
    pays: {
      title: "Pays",
      intro: "2 méthodes pour accéder aux données générales du Sénégal.",
      methods: [
        "Retourne l'objet complet représentant le Sénégal avec toutes ses métadonnées.",
        "Retourne un tableau des langues nationales reconnues au Sénégal.",
      ],
    },
    telecom: {
      title: "Télécom",
      intro:
        "4 méthodes pour accéder aux données des opérateurs télécom du Sénégal.",
      methods: [
        "Retourne la liste complète des opérateurs télécom au Sénégal (objets avec nom, type, préfixes).",
        "Retourne uniquement les opérateurs mobiles (filtre les opérateurs fixes).",
        "Trouve l'opérateur correspondant à un préfixe donné (2 chiffres).",
        "Identifie l'opérateur d'un numéro de téléphone sénégalais complet.",
      ],
    },
    search: {
      title: "Recherche",
      intro:
        "2 méthodes pour rechercher dans les données géographiques du Sénégal.",
      methods: [
        "Recherche dans les données (régions et départements) selon une chaîne de caractères. Retourne un tableau de SearchResult avec les champs type, nom et data. La recherche est insensible à la casse.",
        "Trouve une région par son code officiel à deux lettres (insensible à la casse).",
      ],
    },
    calculs: {
      title: "Calculs",
      intro: "5 méthodes pour calculer des statistiques démographiques.",
      methods: [
        "Retourne la population totale du Sénégal (somme de toutes les régions).",
        "Retourne la superficie totale du Sénégal en km² (somme de toutes les régions).",
        "Calcule la densité de population (habitants/km²) d'une région donnée.",
        "Calcule la densité de population (habitants/km²) d'un département donné.",
        "Calcule la densité nationale du Sénégal (population totale / superficie totale).",
      ],
    },
    tri: {
      title: "Tri & Filtres",
      intro:
        "7 méthodes pour trier, filtrer et sélectionner aléatoirement des données.",
      methods: [
        "Retourne les régions triées par population. Par défaut décroissant ('desc').",
        "Retourne les régions triées par superficie. Par défaut décroissant ('desc').",
        "Retourne les régions triées par densité de population. Par défaut décroissant ('desc').",
        "Retourne les départements triés par population.",
        "Retourne les départements (objets complets) d'une région identifiée par son code.",
        "Retourne un objet Region choisi aléatoirement parmi les 14 régions.",
        "Retourne un département choisi aléatoirement parmi les 46 départements.",
      ],
    },
  },
} satisfies Record<string, unknown>;

export type Translations = typeof fr;
