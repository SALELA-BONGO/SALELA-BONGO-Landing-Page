"use client";

import Image from "next/image";
import { useState } from "react";
import { storeLanguage, type Language } from "@/lib/legal";
import { useLegalLanguage } from "@/lib/useLegalLanguage";
import styles from "./page.module.css";

/** DarAkili's published listings. One place, because three language blocks and the
 *  download row in the DarAkili section all point at the same two URLs. */
const DARAKILI_STORES = {
  ios: "https://apps.apple.com/app/id6806669532",
  android: "https://play.google.com/store/apps/details?id=com.darakili.android",
};

/** DoubleVoix's published listings — same pattern as DarAkili above. */
const DOUBLEVOIX_STORES = {
  ios: "https://apps.apple.com/us/app/doublevoix/id6812914968",
  android: "https://play.google.com/store/apps/details?id=org.salelabongo.cbd",
};

/** Jeux de Dames — same pattern as above. */
const JEUXDEDAMES_STORES = {
  ios: "https://apps.apple.com/app/id6835309971",
  android: "https://play.google.com/store/apps/details?id=org.salelabongo.jeuxdedames",
};

type Network = "facebook" | "instagram" | "tiktok" | "x" | "youtube" | "threads" | "whatsapp";
type Social = { network: Network; url: string; handle: string };

const NETWORK_LABEL: Record<Network, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  x: "X",
  youtube: "YouTube",
  threads: "Threads",
  whatsapp: "WhatsApp",
};

/** WhatsApp Business account, listed under DarAkili. Number in E.164 for wa.me. */
const WHATSAPP = { username: "@SalelaBongo", display: "+1 309 239 4702", e164: "13092394702" };

/** Every product's official accounts. Kuetu has none yet (Telegram bot only). */
const BRAND_SOCIALS: Record<string, Social[]> = {
  darakili: [
    { network: "facebook", url: "https://www.facebook.com/DarAkiili/", handle: "DarAkiili" },
    { network: "instagram", url: "https://www.instagram.com/darakiili/", handle: "@darakiili" },
    { network: "tiktok", url: "https://www.tiktok.com/@darakiili", handle: "@darakiili" },
    { network: "x", url: "https://x.com/DarAkili", handle: "@DarAkili" },
    { network: "youtube", url: "https://www.youtube.com/@DarAkili", handle: "@DarAkili" },
    { network: "threads", url: "https://www.threads.com/@darakiili", handle: "@darakiili" },
    { network: "whatsapp", url: `https://wa.me/${WHATSAPP.e164}`, handle: `${WHATSAPP.username} · ${WHATSAPP.display}` },
  ],
  doublevoix: [
    { network: "facebook", url: "https://www.facebook.com/DoubleVoixOfficielle", handle: "DoubleVoixOfficielle" },
    { network: "instagram", url: "https://www.instagram.com/doublevoixhq/", handle: "@doublevoixhq" },
    { network: "tiktok", url: "https://www.tiktok.com/@doublevoix4", handle: "@doublevoix4" },
    { network: "x", url: "https://x.com/DoubleVoixHQ", handle: "@DoubleVoixHQ" },
    { network: "youtube", url: "https://www.youtube.com/@DoubleVoixhq", handle: "@DoubleVoixhq" },
    { network: "threads", url: "https://www.threads.com/@doublevoixhq", handle: "@doublevoixhq" },
  ],
  yebela: [
    { network: "facebook", url: "https://www.facebook.com/YebelaStore", handle: "YebelaStore" },
    { network: "instagram", url: "https://instagram.com/yebelastore", handle: "@yebelastore" },
    { network: "tiktok", url: "https://www.tiktok.com/@yebelastore", handle: "@yebelastore" },
    { network: "x", url: "https://x.com/yebelastore", handle: "@yebelastore" },
    { network: "youtube", url: "https://youtube.com/@yebelastore", handle: "@yebelastore" },
    { network: "threads", url: "https://www.threads.com/@yebelastore", handle: "@yebelastore" },
  ],
  jeuxdedames: [
    { network: "facebook", url: "https://www.facebook.com/JeuxDeDamesAfrica", handle: "JeuxDeDamesAfrica" },
    { network: "instagram", url: "https://www.instagram.com/jeuxdedamesafrica", handle: "@jeuxdedamesafrica" },
    { network: "x", url: "https://x.com/JeuxdeDamesAfri", handle: "@JeuxdeDamesAfri" },
    { network: "threads", url: "https://www.threads.com/@JeuxDeDamesAfrica", handle: "@JeuxDeDamesAfrica" },
  ],
};

/** Section copy that is not per-language data. */
const SOCIAL_TITLE: Record<Language, { title: string; sub: string; visit: string; copy: string; copied: string }> = {
  fr: { title: "Suivez chaque plateforme", sub: "Les comptes officiels de chacun de nos produits. Touchez un identifiant pour le sélectionner, ou copiez-le d'un clic.", visit: "Visiter", copy: "Copier", copied: "Copié ✓" },
  en: { title: "Follow each platform", sub: "The official accounts for every one of our products. Select any handle, or copy it in one click.", visit: "Visit", copy: "Copy", copied: "Copied ✓" },
  ln: { title: "Landá plateforme mokomoko", sub: "Ba comptes officiels ya biloko na biso nyonso. Finá kombo mpo na kopona yango, to kopiá yango na mbala moko.", visit: "Kendé na", copy: "Kopiá", copied: "Ekopiami ✓" },
  sw: { title: "Fuata kila jukwaa", sub: "Akaunti rasmi za kila bidhaa yetu. Gusa jina la akaunti kulichagua, au linakili kwa kubofya mara moja.", visit: "Tembelea", copy: "Nakili", copied: "Imenakiliwa ✓" },
};

const STORE_LINES: Record<Language, { apple: string; google: string }> = {
  fr: { apple: "Télécharger sur l'", google: "Disponible sur" },
  en: { apple: "Download on the", google: "Get it on" },
  ln: { apple: "Zwá yango na", google: "Zwá yango na" },
  sw: { apple: "Pakua kwenye", google: "Ipate kwenye" },
};

const BRAND_NAMES: { id: string; name: string }[] = [
  { id: "darakili", name: "DarAkili" },
  { id: "doublevoix", name: "DoubleVoix" },
  { id: "yebela", name: "Yebela Store" },
  { id: "jeuxdedames", name: "Jeux de Dames" },
];

const t = {
  fr: {
    nav: { about: "À propos", apps: "Nos Plateformes", contact: "Contact" },
    hero: {
      badge: "Salela Bongo LLC — « Utilise ton cerveau »",
      headline: "L'Afrique pense. L'Afrique crée. L'Afrique construit.",
      sub: "\"Salela Bongo\" signifie \"Utilise ton cerveau\" en Lingala. Tout comme les salles de sport forgent le corps, nous croyons que le cerveau doit être entraîné. Nous construisons des plateformes numériques par des Africains, pour des Africains — dans les langues de l'Afrique, avec le cœur de l'Afrique.",
      cta: "Découvrir nos plateformes",
      ctaSub: "Nous contacter",
      stats: { platforms: "Plateformes", languages: "Langues", countries: "Pays" },
    },
    mission: {
      title: "Notre Mission",
      quote: "Le monde a des salles de sport pour le corps — nous construisons des gymnases pour l'intelligence africaine.",
      paragraphs: [
        "Salela Bongo LLC est née d'une conviction simple et puissante : l'intelligence africaine mérite des outils à sa hauteur. Notre nom, \"Salela Bongo\", est un appel en Lingala — \"Utilise ton cerveau\" — un cri de ralliement pour chaque Africain et chaque membre de la diaspora qui refuse de rester spectateur dans la révolution numérique.",
        "Nos produits sont plus que du logiciel. Nous forgeons des espaces où l'intelligence africaine peut s'exercer, apprendre, jouer et entreprendre — en français, en anglais, en lingala et en swahili. Comme Masakhane (\"Nous construisons ensemble\"), nous croyons que l'avenir technologique de l'Afrique sera bâti par ceux qui comprennent son contexte, parlent ses langues et portent sa culture dans leur code.",
        "Le sport nourrit le corps. Nous nourrissons l'intelligence. Chaque partie de dames jouée, chaque cours suivi, chaque boutique créée sur nos plateformes est un exercice intellectuel — un pas de plus vers une Afrique qui pense, innove et domine le numérique.",
        "Aujourd'hui, alors que le monde se concentre massivement sur l'entraînement de grands modèles d'intelligence artificielle (IA) et de grands modèles linguistiques (LLM), nous croyons qu'il faut d'abord entraîner le jeune cerveau africain. L'Afrique a la population la plus jeune du monde, avec un âge médian d'environ 19 ans. D'ici 2050, le continent sera le principal moteur de la croissance démographique mondiale, ce qui signifie que l'avenir du monde est intrinsèquement lié au développement intellectuel de la jeunesse africaine. (<a href=\"https://population.un.org/wpp/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: var(--teal); text-decoration: underline;\">Réf : Perspectives de la population mondiale des Nations Unies</a>)",
      ],
    },
    about: {
      title: "Qui sommes-nous",
      desc1: "Salela Bongo LLC est une société de technologie enregistrée aux États-Unis, fondée par des Africains passionnés qui comprennent les réalités, les langues et les aspirations du continent. Nous concevons, publions et exploitons nos propres applications et plateformes numériques pour l'Afrique et sa diaspora.",
      desc2: "Nous ne sommes pas une entreprise qui regarde l'Afrique de loin — nous sommes l'Afrique. Nous parlons ses langues, nous vivons son contexte, et nous construisons nos produits depuis l'intérieur. Chaque produit que nous créons est culturellement ancré, multilingue et pensé pour les réalités africaines.",
      items: [
        { icon: "🧠", label: "Philosophie", value: "Salela Bongo — Utilise ton cerveau" },
        { icon: "🌍", label: "Marchés cibles", value: "Afrique & Diaspora" },
        { icon: "📱", label: "Plateformes", value: "iOS · Android · Web" },
        { icon: "🗣️", label: "Langues", value: "FR · EN · Lingala · Swahili" },
        { icon: "✉️", label: "Contact", value: "contact@salelabongo.org" },
      ],
    },
    apps: {
      title: "Nos Plateformes",
      sub: "Cinq produits — un seul engagement envers l'excellence.",
      list: [
        {
          id: "darakili",
          logo: "/logo-darakili.png",
          name: "DarAkili",
          domain: "darakili.com",
          tag: "Web · iOS · Android · Disponible",
          color: "#10b981",
          desc: "DarAkili — mot-valise Swahili fusionnant Daraja (\"Pont\") et Akili (\"Intelligence\") — soit \"Le Pont de l'Intelligence\". Plateforme d'apprentissage en ligne conçue pour l'Afrique — cours créés par des Africains, classements locaux par ville et pays, paiement mobile money inclus. Les applications iPhone et Android sont désormais publiées : même compte, même progression que sur le web.",
          features: ["Cours gratuits & payants", "Classements locaux", "Parrainage de cours", "Mobile Money", "App iOS & Android"],
          url: "https://darakili.com",
          stores: DARAKILI_STORES,
        },
        {
          id: "doublevoix",
          logo: "/logo-doublevoix.png",
          name: "DoubleVoix",
          domain: "www.doublevoix.com",
          tag: "Web · IA · iOS · Android · Disponible",
          color: "#f97316",
          desc: "Anciennement CBD — Doublage Bilingue Consécutif (cbd.salelabongo.org). Interprétation consécutive pour n'importe quelle vidéo : l'orateur est entendu dans ses propres mots, puis une voix d'interprète rend chaque passage dans votre langue — le rythme d'un interprète en salle, pas un doublage par-dessus. Collez un lien ou téléversez un fichier ; la première minute est offerte.",
          features: ["Anglais, Français, Espagnol, Swahili, Allemand", "Source en Lingala reconnue", "Sous-titres .srt inclus", "Musique de fond retirée", "App iOS & Android"],
          url: "https://www.doublevoix.com",
          stores: DOUBLEVOIX_STORES,
        },
        {
          id: "kuetu",
          logo: "/logo-kuetu.png",
          name: "Kuetu",
          domain: "kuetu.salelabongo.org",
          tag: "Telegram · Web · IA · Pilote",
          color: "#8b5cf6",
          desc: "Plateforme d'annotation de données pour les langues africaines, pilotée entièrement depuis une conversation Telegram : cartes de tâches à boutons, notes vocales, corrections en un geste. Entreprises et laboratoires gèrent projets, jeux de données et exports depuis le portail web ; l'annotateur, lui, n'a besoin que du bot @KuetuBot.",
          features: ["Tout se passe dans Telegram", "Rémunération en mobile money", "Consentement à chaque envoi", "Portail projets & exports"],
          url: "https://kuetu.salelabongo.org",
        },
        {
          id: "yebela",
          logo: "/logo-yebela.png",
          name: "Yebela Store",
          domain: "yebela.store",
          tag: "Web · PWA",
          color: "#f59e0b",
          desc: "Catalogue commercial en ligne permanent pour entrepreneurs africains. Créez votre boutique en 2 minutes, partagez un lien et vendez partout dans le monde.",
          features: ["Boutique en 2 min", "Intégration WhatsApp", "Mobile Money", "PWA sans app store"],
          url: "https://yebela.store",
        },
        {
          id: "jeuxdedames",
          logo: "/logo-jeuxdedames.png",
          logoBg: true,
          name: "Jeux de Dames",
          domain: "jeuxdedames.africa",
          tag: "Web · iOS · Android · Disponible",
          color: "#3b82f6",
          desc: "Plateforme de jeu de dames en ligne avec variantes congolaise, internationale et américaine. Jeux en temps réel, chat, abonnement premium et profils utilisateurs.",
          features: ["Jeu en temps réel", "3 variantes de jeu", "Abonnement Premium", "iOS & Android"],
          url: "https://jeuxdedames.africa",
          stores: JEUXDEDAMES_STORES,
        },
      ],
    },
    darakili: {
      label: "DarAkili · Le Pont de l'Intelligence",
      title: "La Vision derrière DarAkili",
      nameTitle: "La Signification de DarAkili",
      words: [
        { word: "Daraja", meaning: "Pont", detail: "(aussi : Rang, Niveau, Grade, Escaliers)" },
        { word: "Akili", meaning: "Intelligence", detail: "(aussi : Esprit, Intellect, Cerveau)" },
      ],
      portmanteau: "Combiné en un mot-valise, DarAkili porte un sens figuré profond : celui de connecter les idées, de combler les lacunes en matière de connaissances et d'offrir une véritable passerelle vers l'intelligence et la compréhension mutuelle.",
      visionTitle: "Notre Vision : Le Transfert de Connaissances",
      paragraphs: [
        "Pendant des décennies, les services d'envoi de fonds (remittances) ont été le principal pont utilisé par la diaspora africaine pour envoyer de l'argent vers le continent afin de soutenir nos familles et développer nos communautés.",
        "Bien que le capital financier soit important, la véritable richesse réside dans l'intelligence. Aujourd'hui, nous voulons envoyer quelque chose d'encore plus puissant que l'argent. Avec DarAkili, nous introduisons un nouveau type de transfert : <strong>le transfert de connaissances</strong>.",
        "Notre vision est de connecter les Africains du monde entier les uns aux autres — partageant l'intelligence, les compétences et la sagesse à travers les frontières et les langues. Nous croyons que l'intellect africain doit circuler librement à travers le monde. Il est temps d'utiliser nos cerveaux — <em>Salela Bongo</em> — pour partager le savoir, échanger des idées et élever notre intelligence collective.",
      ],
      downloadTitle: "Disponible maintenant sur iPhone et Android",
      downloadText: "L'application DarAkili est publiée sur l'App Store et sur Google Play. Toute la plateforme tient dans le téléphone : suivre un cours hors du navigateur, reprendre une leçon là où le web l'avait laissée, voir son classement par ville et par pays, payer ou parrainer un cours par achat intégré (Apple ou Google), et recevoir une notification quand un cours suivi est mis à jour. Le paiement en mobile money reste disponible sur le web. Un seul compte DarAkili pour le web, iOS et Android.",
      iosLabel: "Télécharger sur l'App Store",
      androidLabel: "Disponible sur Google Play",
    },
    doublevoix: {
      label: "DoubleVoix · doublevoix.com",
      title: "L'idée derrière DoubleVoix",
      renameNote: "Anciennement <strong>CBD — Doublage Bilingue Consécutif</strong>, hébergé sur cbd.salelabongo.org. Le projet porte désormais son propre nom et sa propre adresse : <a href=\"https://www.doublevoix.com\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #b4540a; text-decoration: underline;\">www.doublevoix.com</a>. Deux voix, une seule vidéo.",
      howTitle: "Le rythme d'un interprète, reproduit",
      steps: [
        { n: "1", text: "L'orateur parle — sa voix, ses mots, intacts." },
        { n: "2", text: "Il s'arrête. Un vrai silence : le temps que l'interprète prenne le relais." },
        { n: "3", text: "La voix de l'interprète rend le passage dans votre langue, sur une image figée et un badge de langue." },
        { n: "4", text: "L'orateur reprend. Et ainsi de suite, jusqu'à la fin." },
      ],
      paragraphs: [
        "Dans une église de Kinshasa, à une conférence ou dans une réunion de famille, l'interprète ne parle pas par-dessus l'orateur : il attend son tour. L'orateur livre une pensée, s'arrête, l'interprète la rend dans l'autre langue, puis l'orateur reprend. DoubleVoix reproduit exactement ce rythme, automatiquement, pour n'importe quelle vidéo.",
        "C'est ce qui le sépare du doublage classique. Le doublage remplace la bande sonore et doit faire entrer la traduction dans la durée exacte de l'original : la voix s'accélère, les nuances tombent. DoubleVoix est <strong>additif</strong> — l'original reste intact, la traduction reçoit son propre temps de parole, et la vidéo finale dure environ deux fois plus longtemps. La contrainte de synchronisation disparaît, et la voix de l'interprète respire.",
        "Les silences ne sont pas un détail de montage. Sans eux, la vidéo passe de l'orateur à la traduction comme une coupe sèche ; avec eux, on entend une salle qui attend son interprète.",
        "Pour qui ? Prédications et enseignements, conférences et formations, témoignages, contenus de la diaspora — tout ce qui mérite d'être compris au-delà de la langue dans laquelle il a été dit. Collez un lien (YouTube, Facebook, Instagram, TikTok, X…) ou téléversez un fichier, choisissez la langue, et la première minute revient interprétée, gratuitement.",
        "Cinq langues d'arrivée à ce jour — anglais, français, espagnol, swahili, allemand — et surtout, <strong>le lingala est reconnu en langue source</strong> : précisément le genre de langue que les outils commerciaux ignorent. Chaque traduction peut être relue et corrigée avant que la voix ne soit produite, les sous-titres .srt accompagnent la vidéo finale, et la musique de fond peut être retirée puis restituée pour que seule la parole soit interprétée.",
      ],
      downloadTitle: "Disponible maintenant sur iPhone et Android",
      downloadText: "Les applications natives iOS et Android de DoubleVoix sont publiées : même service, même compte, dans votre poche — coller un lien, suivre l'avancement du traitement, recevoir une notification quand la vidéo est prête, puis la partager.",
      iosLabel: "Télécharger sur l'App Store",
      androidLabel: "Disponible sur Google Play",
      contactLabel: "Contact DoubleVoix",
      contactEmail: "doublevoix@salelabongo.org",
    },
    kuetu: {
      label: "Kuetu · kuetu.salelabongo.org",
      title: "Kuetu — l'IA n'apprendra pas nos langues toute seule",
      paragraphs: [
        "Les grands modèles d'intelligence artificielle parlent mal — ou pas du tout — le lingala, le tshiluba, le kikongo, et restent approximatifs en swahili. Ce n'est pas une question de richesse des langues : c'est que les données annotées qui les décrivent n'existent pas. Or ces données ne peuvent venir que d'une seule source — les personnes qui parlent ces langues tous les jours.",
        "<strong>Kuetu</strong> est la plateforme qui leur confie ce travail, et qui les rémunère pour cela. Entreprises, laboratoires et chercheurs y déposent leurs jeux de données ; des annotateurs africains les étiquettent, les enregistrent, les traduisent et les vérifient ; l'export repart prêt à entraîner un modèle.",
        "La personne la mieux placée pour annoter du lingala n'est pas forcément celle qui est à l'aise avec un tableur ou une interface d'annotation professionnelle. Elle a un téléphone Android d'entrée de gamme, des données mobiles qui coûtent cher, et Telegram déjà installé. C'est donc <strong>dans Telegram</strong> que Kuetu fait passer tout le travail : cartes de tâches à boutons, notes vocales, corrections en un geste. Rien à installer, rien à apprendre, presque rien à consommer en données.",
        "<strong>WhatsApp sert uniquement à recruter, accueillir, prévenir et répondre</strong> — jamais à capturer une réponse, un étiquetage ou un fichier. Les conditions de Meta interdisent d'utiliser les données obtenues via ses API pour entraîner un modèle ou les céder à un tiers ; chez Kuetu ce n'est pas une promesse de page d'accueil mais une règle vérifiée par des tests automatiques, et chaque message WhatsApp renvoie vers le bot Telegram.",
        "L'éthique n'est pas un habillage. Le consentement est redemandé <strong>à chaque envoi</strong>, pas seulement à l'inscription. Depuis la conversation, un annotateur consulte ses gains, conteste une évaluation, change de langue, met son compte en pause, révoque son consentement ou demande la suppression de ses données. Les paiements partent en mobile money, sur le numéro donné dans Telegram — jamais dans WhatsApp.",
      ],
      taskTitle: "Ce qu'on y fait",
      tasks: [
        "Classification de textes",
        "Préférence entre deux réponses",
        "Validation d'enregistrements",
        "Lecture à voix haute",
        "Traduction saisie",
        "Relecture & révision",
      ],
      startTitle: "Comment commencer",
      groups: [
        {
          id: "annotators",
          title: "Annotateurs & relecteurs",
          subtitle: "Bot Telegram : @KuetuBot",
          steps: [
            "Ouvrez <strong>t.me/KuetuBot</strong> dans Telegram et envoyez <strong>/start</strong>.",
            "Choisissez votre langue (English, Français, Kiswahili), acceptez le consentement, indiquez quelques informations de profil, puis partagez votre numéro d'un bouton. Une minute en tout.",
            "Pour recevoir des tâches, il faut le lien d'invitation d'un projet — <strong>t.me/KuetuBot?start=VOTRE-CODE</strong> — envoyé par votre coordinateur : un seul tap vous inscrit au projet.",
            "Envoyez <strong>/task</strong> pour recevoir une carte, répondez d'un bouton ou d'une note vocale, recommencez. Et à tout moment : /earnings (gains), /history (envois), /review et /appeal (contester une évaluation), /language, /pause, /revoke, /deletemydata, /help.",
          ],
          cta: "Ouvrir @KuetuBot",
          ctaUrl: "https://t.me/KuetuBot",
        },
        {
          id: "coordinators",
          title: "Coordinateurs de projet & chercheurs",
          subtitle: "Portail : kuetu.salelabongo.org",
          steps: [
            "Connectez-vous au portail avec votre compte de coordinateur. Pendant la phase pilote, les comptes sont ouverts progressivement, sur invitation.",
            "Créez un projet et déposez vos données, puis définissez le schéma d'étiquettes, les consignes et la rémunération du projet.",
            "Générez les invitations : chaque code est à usage unique, révocable et traçable — ou un code unique partagé pour une diffusion WhatsApp, quand la vitesse prime sur le contrôle.",
            "Suivez la qualité — double annotation, règle des deux voix concordantes sur trois, relecture par des réviseurs, recours de l'annotateur — puis exportez le jeu de données annoté.",
          ],
          cta: "Accéder au portail",
          ctaUrl: "https://kuetu.salelabongo.org",
        },
      ],
      note: "Kuetu est en phase pilote : les annotateurs et les coordinateurs de projet sont admis progressivement, sur invitation. Écrivez à <a href=\"mailto:kuetu@salelabongo.org\" style=\"color: var(--teal-d); text-decoration: underline;\">kuetu@salelabongo.org</a> pour demander un accès.",
    },
    legal: {
      title: "Conformité & Légal",
      sub: "Politiques d'entreprise pour toutes les plateformes Salela Bongo LLC.",
      items: [
        { label: "Politique de confidentialité", url: "/legal/privacy" },
        { label: "Conditions d'utilisation", url: "/legal/terms" },
        { label: "Charte communautaire", url: "/legal/community-guidelines" },
        { label: "Suppression des données", url: "/legal/data-deletion" },
      ],
    },
    contact: {
      title: "Nous contacter",
      sub: "Pour toute question, demande presse ou partenariat de distribution.",
      general: "Demandes générales",
      apps_contact: "Support plateformes",
    },
    footer: "Tous droits réservés",
  },
  en: {
    nav: { about: "About", apps: "Our Platforms", contact: "Contact" },
    hero: {
      badge: "Salela Bongo LLC — \"Use Your Brain\"",
      headline: "Africa Thinks. Africa Creates. Africa Builds.",
      sub: "\"Salela Bongo\" means \"Use Your Brain\" in Lingala. Just as gyms forge the body, we believe the brain must be trained. We build digital platforms by Africans, for Africans — in Africa's languages, with Africa's heart.",
      cta: "Explore our platforms",
      ctaSub: "Get in touch",
      stats: { platforms: "Platforms", languages: "Languages", countries: "Countries" },
    },
    mission: {
      title: "Our Mission",
      quote: "The world has gyms for the body — we are building gyms for the African mind.",
      paragraphs: [
        "Salela Bongo LLC was born from a simple yet powerful conviction: African intelligence deserves tools built to match. Our name, \"Salela Bongo\", is a rallying cry in Lingala — \"Use Your Brain\" — a call to every African and every member of the diaspora who refuses to be a spectator in the digital revolution.",
        "Our products are more than software. We forge spaces where the African mind can exercise, learn, play, and build businesses — in French, English, Lingala, and Swahili. Like Masakhane (\"We build together\"), we believe Africa's technological future will be shaped by those who understand its context, speak its languages, and carry its culture in their code.",
        "Sports nourish the body. We nourish the mind. Every checkers game played, every course completed, every shop created on our platforms is an intellectual workout — one more step toward an Africa that thinks, innovates, and leads in the digital age.",
        "Today, as the world focuses heavily on training big AI models and Large Language Models (LLMs), we believe in training the younger African mind first. Africa has the youngest population in the world, with a median age of approximately 19 years old. By 2050, the continent will be the primary driver of global population growth, meaning the future of the world is inherently tied to the intellectual development of African youth. (<a href=\"https://population.un.org/wpp/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: var(--teal); text-decoration: underline;\">Ref: United Nations World Population Prospects</a>)",
      ],
    },
    about: {
      title: "Who We Are",
      desc1: "Salela Bongo LLC is a US-registered technology company founded by passionate Africans who understand the continent's realities, languages, and aspirations. We design, publish and operate our own apps and digital platforms for Africa and its diaspora.",
      desc2: "We are not a company looking at Africa from afar — we are Africa. We speak its languages, we live its context, and we build our products from the inside. Every product we build is culturally rooted, multilingual, and designed for African realities.",
      items: [
        { icon: "🧠", label: "Philosophy", value: "Salela Bongo — Use Your Brain" },
        { icon: "🌍", label: "Target Markets", value: "Africa & Diaspora" },
        { icon: "📱", label: "Platforms", value: "iOS · Android · Web" },
        { icon: "🗣️", label: "Languages", value: "FR · EN · Lingala · Swahili" },
        { icon: "✉️", label: "Contact", value: "contact@salelabongo.org" },
      ],
    },
    apps: {
      title: "Our Platforms",
      sub: "Five products — one commitment to excellence.",
      list: [
        {
          id: "darakili",
          logo: "/logo-darakili.png",
          name: "DarAkili",
          domain: "darakili.com",
          tag: "Web · iOS · Android · Available now",
          color: "#10b981",
          desc: "DarAkili — a Swahili portmanteau of Daraja (\"Bridge\") and Akili (\"Intelligence\") — meaning \"Bridge of Intelligence\". Online learning platform built for Africa — courses authored by Africans, local leaderboards by city and country, mobile money payments included. The iPhone and Android apps are now published: same account, same progress as on the web.",
          features: ["Free & paid courses", "Local leaderboards", "Course sponsorship", "Mobile Money", "iOS & Android app"],
          url: "https://darakili.com",
          stores: DARAKILI_STORES,
        },
        {
          id: "doublevoix",
          logo: "/logo-doublevoix.png",
          name: "DoubleVoix",
          domain: "www.doublevoix.com",
          tag: "Web · AI · iOS · Android · Available now",
          color: "#f97316",
          desc: "Formerly CBD — Consecutive Bilingual Dubbing (cbd.salelabongo.org). Consecutive interpretation for any video: the speaker is heard in their own words, then an interpreter voices each passage in your language — the rhythm of a live interpreter, not a dub over the top. Paste a link or upload a file; the first minute is free.",
          features: ["English, French, Spanish, Swahili, German", "Understands Lingala source", "Subtitles (.srt) included", "Background music removed", "iOS & Android app"],
          url: "https://www.doublevoix.com",
          stores: DOUBLEVOIX_STORES,
        },
        {
          id: "kuetu",
          logo: "/logo-kuetu.png",
          name: "Kuetu",
          domain: "kuetu.salelabongo.org",
          tag: "Telegram · Web · AI · Pilot",
          color: "#8b5cf6",
          desc: "A data-labelling platform for African languages, run entirely from a Telegram conversation: button-driven task cards, voice notes, one-tap corrections. Companies and labs manage projects, datasets and exports from the web portal; the annotator needs nothing but the @KuetuBot bot.",
          features: ["All of it inside Telegram", "Paid in mobile money", "Consent on every submission", "Project portal & exports"],
          url: "https://kuetu.salelabongo.org",
        },
        {
          id: "yebela",
          logo: "/logo-yebela.png",
          name: "Yebela Store",
          domain: "yebela.store",
          tag: "Web · PWA",
          color: "#f59e0b",
          desc: "Permanent online catalog for African entrepreneurs. Launch your shop in under 2 minutes, share a link, and sell anywhere in the world.",
          features: ["Shop in 2 minutes", "WhatsApp integration", "Mobile Money", "PWA — no app store needed"],
          url: "https://yebela.store",
        },
        {
          id: "jeuxdedames",
          logo: "/logo-jeuxdedames.png",
          logoBg: true,
          name: "Jeux de Dames",
          domain: "jeuxdedames.africa",
          tag: "Web · iOS · Android · Available",
          color: "#3b82f6",
          desc: "Online checkers platform with Congolese, International and American variants. Real-time gameplay, in-game chat, premium subscription and user profiles.",
          features: ["Real-time play", "3 game variants", "Premium subscription", "iOS & Android"],
          url: "https://jeuxdedames.africa",
          stores: JEUXDEDAMES_STORES,
        },
      ],
    },
    darakili: {
      label: "DarAkili · Bridge of Intelligence",
      title: "The Vision Behind DarAkili",
      nameTitle: "The Meaning of DarAkili",
      words: [
        { word: "Daraja", meaning: "Bridge", detail: "(also: Rank, Level, Grade, Stairs)" },
        { word: "Akili", meaning: "Intelligence", detail: "(also: Mind, Intellect, Brain)" },
      ],
      portmanteau: "When combined into DarAkili (a portmanteau blending the two words), it carries the profound figurative meaning of connecting ideas, bridging knowledge gaps, and providing a pathway to intelligence and collective understanding.",
      visionTitle: "Our Vision: The Remittance of Knowledge",
      paragraphs: [
        "For decades, financial remittance services have been the primary bridge connecting the African diaspora to the continent, allowing us to send money back home to support our families and build our communities.",
        "While capital is important, true wealth lies in the mind. Today, we want to send back something even more powerful than money. With DarAkili, we are introducing a new kind of remittance: <strong>the remittance of knowledge</strong>.",
        "Our ultimate vision is to connect Africans across the globe directly to each other — sharing intelligence, skills, and wisdom across borders and languages. We believe that African intellect should flow seamlessly across the world. It is time to use our brains — <em>Salela Bongo</em> — to share knowledge, exchange ideas, and elevate our collective intellect.",
      ],
      downloadTitle: "Available now on iPhone and Android",
      downloadText: "The DarAkili app is published on the App Store and on Google Play. The whole platform fits in the phone: take a course outside the browser, pick a lesson up where the web left it, watch your standing on the city and country leaderboards, pay for or sponsor a course via in-app purchase (Apple or Google), and get a notification when a course you follow is updated. Mobile money payment remains available on the web. One DarAkili account across web, iOS and Android.",
      iosLabel: "Download on the App Store",
      androidLabel: "Get it on Google Play",
    },
    doublevoix: {
      label: "DoubleVoix · doublevoix.com",
      title: "The Idea Behind DoubleVoix",
      renameNote: "Formerly <strong>CBD — Consecutive Bilingual Dubbing</strong>, hosted at cbd.salelabongo.org. The project now carries its own name and its own address: <a href=\"https://www.doublevoix.com\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #b4540a; text-decoration: underline;\">www.doublevoix.com</a>. Two voices, one video.",
      howTitle: "An interpreter's rhythm, reproduced",
      steps: [
        { n: "1", text: "The speaker talks — their voice, their words, untouched." },
        { n: "2", text: "They stop. A real pause: the beat in which an interpreter picks up." },
        { n: "3", text: "The interpreter voice renders that passage in your language, over a treated freeze-frame with a language badge." },
        { n: "4", text: "The speaker resumes. And so on, to the end." },
      ],
      paragraphs: [
        "In a church in Kinshasa, at a conference, or in a family meeting, the interpreter does not talk over the speaker: they wait their turn. The speaker delivers a thought, stops, the interpreter renders it in the other language, then the speaker continues. DoubleVoix reproduces exactly that rhythm, automatically, for any video.",
        "That is what separates it from ordinary dubbing. Dubbing replaces the soundtrack and has to cram the translation into the original's exact duration: the voice speeds up and the nuance falls out. DoubleVoix is <strong>additive</strong> — the original stays, the translation gets its own time slot, and the finished video runs roughly twice as long. The isochrony constraint disappears entirely, and the interpreter voice can breathe.",
        "The pauses are not an editing detail. Without them the video cuts from speaker to translation like a hard edit; with them, you hear a room waiting for its interpreter.",
        "Who is it for? Sermons and teaching, conferences and training, testimonies, diaspora content — anything worth understanding beyond the language it was said in. Paste a link (YouTube, Facebook, Instagram, TikTok, X…) or upload a file, pick a language, and the first minute comes back interpreted, free.",
        "Five target languages so far — English, French, Spanish, Swahili, German — and, more to the point, <strong>Lingala is understood as a source language</strong>: exactly the kind of language commercial tools leave out. Every translation can be reviewed and corrected before any voice is generated, .srt subtitles ship with the finished video, and background music can be stripped and restored so that only the speech is interpreted.",
      ],
      downloadTitle: "Available now on iPhone and Android",
      downloadText: "Native iOS and Android apps for DoubleVoix are published: the same service and the same account, in your pocket — paste a link, follow the processing, get a notification when the video is ready, then share it.",
      iosLabel: "Download on the App Store",
      androidLabel: "Get it on Google Play",
      contactLabel: "DoubleVoix contact",
      contactEmail: "doublevoix@salelabongo.org",
    },
    kuetu: {
      label: "Kuetu · kuetu.salelabongo.org",
      title: "Kuetu — AI Will Not Learn Our Languages By Itself",
      paragraphs: [
        "Large AI models speak Lingala, Tshiluba and Kikongo badly or not at all, and stay approximate in Swahili. That is not a statement about the languages: it is that the labelled data describing them does not exist. And that data can come from exactly one place — the people who speak those languages every day.",
        "<strong>Kuetu</strong> is the platform that puts that work in their hands and pays them for it. Companies, labs and researchers bring their datasets; African annotators label, record, translate and verify them; the export comes back ready to train a model.",
        "The person best placed to annotate Lingala is not necessarily the person at ease with a spreadsheet or a professional annotation UI. They have an entry-level Android phone, mobile data that costs real money, and Telegram already installed. So <strong>inside Telegram</strong> is where Kuetu puts all of the work: button-driven task cards, voice notes, one-tap corrections. Nothing to install, nothing to learn, almost no data to spend.",
        "<strong>WhatsApp is used only to recruit, onboard, notify and support</strong> — never to capture an answer, a label or a file. Meta's terms forbid using data obtained through its APIs to train a model or to pass it to a third party; at Kuetu that is not a homepage promise but a rule enforced by automated tests, and every WhatsApp message deep-links into the Telegram bot.",
        "The ethics are not decoration. Consent is asked again <strong>on every submission</strong>, not only at sign-up. From the chat, an annotator can check earnings, appeal a rating, switch language, pause their account, revoke consent or request deletion of their data. Payments go out in mobile money, to the number given in Telegram — never in WhatsApp.",
      ],
      taskTitle: "What the work looks like",
      tasks: [
        "Text classification",
        "Pairwise preference",
        "Audio validation",
        "Read speech recording",
        "Typed translation",
        "Review & adjudication",
      ],
      startTitle: "How to get started",
      groups: [
        {
          id: "annotators",
          title: "Annotators & reviewers",
          subtitle: "Telegram bot: @KuetuBot",
          steps: [
            "Open <strong>t.me/KuetuBot</strong> in Telegram and send <strong>/start</strong>.",
            "Pick your language (English, Français, Kiswahili), accept the consent screen, give a few profile details, then share your number with one button. About a minute in total.",
            "To receive tasks you need a project's invite link — <strong>t.me/KuetuBot?start=YOUR-CODE</strong> — sent by your coordinator: one tap enrols you in the project.",
            "Send <strong>/task</strong> for a card, answer with a button or a voice note, repeat. And at any time: /earnings, /history, /review and /appeal (to contest a rating), /language, /pause, /revoke, /deletemydata, /help.",
          ],
          cta: "Open @KuetuBot",
          ctaUrl: "https://t.me/KuetuBot",
        },
        {
          id: "coordinators",
          title: "Project coordinators & researchers",
          subtitle: "Portal: kuetu.salelabongo.org",
          steps: [
            "Sign in to the portal with your coordinator account. During the pilot, accounts are opened gradually, by invitation.",
            "Create a project and bring your data in, then define the label schema, the instructions and what the project pays.",
            "Mint the invites: each code is single-use, revocable and individually auditable — or one shared code for a WhatsApp broadcast, when speed matters more than control.",
            "Watch quality — double annotation, the two-matching-votes-out-of-three rule, reviewer adjudication, annotator appeals — then export the labelled dataset.",
          ],
          cta: "Open the portal",
          ctaUrl: "https://kuetu.salelabongo.org",
        },
      ],
      note: "Kuetu is in pilot: annotators and project coordinators are admitted gradually, by invitation. Write to <a href=\"mailto:kuetu@salelabongo.org\" style=\"color: var(--teal-d); text-decoration: underline;\">kuetu@salelabongo.org</a> to request access.",
    },
    legal: {
      title: "Compliance & Legal",
      sub: "Corporate policies for all Salela Bongo LLC platforms.",
      items: [
        { label: "Privacy Policy", url: "/legal/privacy" },
        { label: "Terms of Service", url: "/legal/terms" },
        { label: "Community Guidelines", url: "/legal/community-guidelines" },
        { label: "Data Deletion", url: "/legal/data-deletion" },
      ],
    },
    contact: {
      title: "Contact Us",
      sub: "For questions, press requests, or distribution partnerships.",
      general: "General inquiries",
      apps_contact: "Platform support",
    },
    footer: "All rights reserved",
  },
  ln: {
    nav: { about: "Na tina na biso", apps: "Ba Plateformes na Biso", contact: "Kokutana na biso" },
    hero: {
      badge: "Salela Bongo LLC — « Salelá Bongo na Yo »",
      headline: "Afrika ekanisaka. Afrika ekelaka. Afrika etongaka.",
      sub: "\"Salela Bongo\" elakisi \"Salelá bongo na yo\" na Lingala. Ndenge ba salles ya sport elendisaka nzoto, biso tondimi ete bongo mpe esengeli kolendisama. Totongaka ba plateformes ya numérique oyo esalemi na bana ya Afrika, mpo na bana ya Afrika — na minoko ya Afrika, na motema ya Afrika.",
      cta: "Talá ba plateformes na biso",
      ctaSub: "Kokutana na biso",
      stats: { platforms: "Ba Plateformes", languages: "Minoko", countries: "Bikolo" },
    },
    mission: {
      title: "Mokano na Biso",
      quote: "Mokili ezali na ba salles ya sport mpo na nzoto — biso tozali kotonga bisika ya ngalasisi mpo na mayele ya Afrika.",
      paragraphs: [
        "Salela Bongo LLC ebotamaki na kondima moko ya pete kasi ya nguya: mayele ya Afrika ebongi na bisaleli oyo ekokani na yango. Nkombo na biso, \"Salela Bongo\", ezali mbela na Lingala — \"Salelá bongo na yo\" — libengi mpo na Mwa-Afrika nyonso mpe moto nyonso ya diaspora oyo aboyi kozala kaka motali na mbongwana ya numérique.",
        "Biloko na biso ezali kaka ba logiciels te. Totongaka bisika epai mayele ya Afrika ekoki kosala ngalasisi, koyekola, kosakana mpe kotonga mombongo — na Français, Anglais, Lingala mpe Kiswahili. Lokola Masakhane (\"Totongaka elongo\"), tondimi ete lobi ya teknoloji ya Afrika ekotongama na baoyo bayebi bomoi na yango, balobaka minoko na yango mpe bamemaka bonkoko na yango na kati ya code na bango.",
        "Sport eleisaka nzoto. Biso toleisaka mayele. Lisano nyonso ya dames oyo esakanami, liteya nyonso oyo elandami, butiki nyonso oyo efungolami na ba plateformes na biso ezali ngalasisi ya bongo — litambe mosusu mpo na Afrika oyo ekanisaka, ebimisaka makambo ya sika mpe ekambaka na ntango ya numérique.",
        "Lelo oyo, ntango mokili mobimba ezali kotia makanisi mingi na koteya ba modèles minene ya Intelligence Artificielle (IA) mpe ba modèles minene ya minoko (LLM), biso tondimi ete esengeli liboso kolendisa mpe koteya bongo ya bilenge ya Afrika. Afrika nde ezali na bato oyo baleki bilenge na mokili mobimba, na mbula ya katikati (âge médian) pene na mibu 19. Tii na mobu 2050, Afrika ekozala nguya ya liboso ya bokoli ya motango ya bato na mokili, yango elakisi ete lobi ya mokili mobimba ekangami makasi na bokoli ya mayele ya bilenge ya Afrika. (<a href=\"https://population.un.org/wpp/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: var(--teal); text-decoration: underline;\">Réf : Makanisi ya Nations Unies mpo na Motango ya Bato na Mokili</a>)",
      ],
    },
    about: {
      title: "Biso tozali banani",
      desc1: "Salela Bongo LLC ezali kompanyi ya teknoloji oyo ekomami na mibeko ya États-Unis, ekelamaki na bana ya Afrika ya molende oyo bayebi bomoi ya solo, minoko mpe bamposa ya kontina. Totongaka, tobimisaka mpe totambwisaka ba applications mpe ba plateformes ya numérique na biso moko mpo na Afrika mpe diaspora na yango.",
      desc2: "Tozali te kompanyi oyo etalaka Afrika uta mosika — biso moko tozali Afrika. Tolobaka minoko na yango, tobikaka na bomoi na yango, mpe totongaka biloko na biso uta na kati. Eloko nyonso oyo tokelaka epikami misisa na bonkoko ya Afrika, elobaka minoko ebele mpe ebongisami mpo na bomoi ya solosolo ya Afrika.",
      items: [
        { icon: "🧠", label: "Makanisi", value: "Salela Bongo — Salelá bongo na yo" },
        { icon: "🌍", label: "Bato oyo tosalelaka", value: "Afrika & Diaspora" },
        { icon: "📱", label: "Bisika", value: "iOS · Android · Web" },
        { icon: "🗣️", label: "Minoko", value: "FR · EN · Lingala · Swahili" },
        { icon: "✉️", label: "Kokutana na biso", value: "contact@salelabongo.org" },
      ],
    },
    apps: {
      title: "Ba Plateformes na Biso",
      sub: "Biloko mitano — elaka moko mpo na mosala ya malamu koleka.",
      list: [
        {
          id: "darakili",
          logo: "/logo-darakili.png",
          name: "DarAkili",
          domain: "darakili.com",
          tag: "Web · iOS · Android · Ezali sikoyo",
          color: "#10b981",
          desc: "DarAkili — kombo ya Kiswahili oyo esangisi Daraja (\"Gbagba\") mpe Akili (\"Mayele\") — elingi koloba \"Gbagba ya Mayele\". Plateforme ya koyekola na internet oyo etongami mpo na Afrika — mateya oyo ekelami na bana ya Afrika, ba classements na engumba mpe na ekolo, elongo na kofuta na Mobile Money. Ba applications ya iPhone mpe ya Android ebimi sikoyo : compte kaka moko, mpe okobi boyekoli na yo ndenge moko na web.",
          features: ["Mateya ya ofele mpe ya kofuta", "Classement na engumba mpe ekolo", "Kosunga mateya ya basusu", "Mobile Money", "App iOS & Android"],
          url: "https://darakili.com",
          stores: DARAKILI_STORES,
        },
        {
          id: "doublevoix",
          logo: "/logo-doublevoix.png",
          name: "DoubleVoix",
          domain: "www.doublevoix.com",
          tag: "Web · IA · iOS · Android · Ezali sikoyo",
          color: "#f97316",
          desc: "Liboso ezalaki CBD — Doublage Bilingue Consécutif (cbd.salelabongo.org). Bobongoli ya maloba na molongo mpo na vidéo nyonso : molobi ayokani na mongongo mpe maloba na ye moko, na nsima mongongo ya mobongoli (interprète) ebongoli eteni mokomoko na monoko na yo — kaka ndenge mobongoli asalaka na kati ya ndako, kasi koloba likolo ya mongongo ya molobi te. Baká lien to kotisá fichier ; miniti ya liboso ezali ya ofele.",
          features: ["Anglais, Français, Espagnol, Swahili, Allemand", "Eyebi Lingala lokola monoko ya ebandeli", "Sous-titres (.srt) ezali", "Miziki ya nsima elongolami", "App iOS & Android"],
          url: "https://www.doublevoix.com",
          stores: DOUBLEVOIX_STORES,
        },
        {
          id: "kuetu",
          logo: "/logo-kuetu.png",
          name: "Kuetu",
          domain: "kuetu.salelabongo.org",
          tag: "Telegram · Web · IA · Pilote",
          color: "#8b5cf6",
          desc: "Plateforme ya kotia bilembo (annotation) na ba données ya minoko ya Afrika, oyo etambolaka mobimba na kati ya lisolo ya Telegram : ba cartes ya mosala na ba boutons, ba notes vocales, mpe kobongisa na kofina mbala moko. Ba kompanyi mpe ba laboratoires batambwisaka ba projets, ba données mpe ba exports na portail ya web ; mosali ye azali kaka na mposa ya bot @KuetuBot.",
          features: ["Nyonso na kati ya Telegram", "Lifuti na Mobile Money", "Ndingisa na botindi mokomoko", "Portail ya ba projets & exports"],
          url: "https://kuetu.salelabongo.org",
        },
        {
          id: "yebela",
          logo: "/logo-yebela.png",
          name: "Yebela Store",
          domain: "yebela.store",
          tag: "Web · PWA",
          color: "#f59e0b",
          desc: "Catalogue ya mombongo na internet ya seko mpo na bato ya mombongo ya Afrika. Fungolá butiki na yo na miniti mibale, kabolá lien mpe teká na mokili mobimba.",
          features: ["Butiki na miniti 2", "Ekangami na WhatsApp", "Mobile Money", "PWA kozanga App Store"],
          url: "https://yebela.store",
        },
        {
          id: "jeuxdedames",
          logo: "/logo-jeuxdedames.png",
          logoBg: true,
          name: "Jeux de Dames",
          domain: "jeuxdedames.africa",
          tag: "Web · iOS · Android · Ezali",
          color: "#3b82f6",
          desc: "Plateforme ya lisano ya dames na internet na mitindo ya Congo (RDC), Internationale mpe ya Amerika. Kosakana mbala moko (temps réel), masolo (chat), abonnement premium mpe ba profils ya basaleli.",
          features: ["Kosakana mbala moko", "Mitindo 3 ya lisano", "Abonnement Premium", "iOS & Android"],
          url: "https://jeuxdedames.africa",
          stores: JEUXDEDAMES_STORES,
        },
      ],
    },
    darakili: {
      label: "DarAkili · Gbagba ya Mayele",
      title: "Emoniseli oyo ezali nsima ya DarAkili",
      nameTitle: "Ndimbola ya DarAkili",
      words: [
        { word: "Daraja", meaning: "Gbagba", detail: "(mpe: Eteni, Kelasi, Matambe ya escalier)" },
        { word: "Akili", meaning: "Mayele", detail: "(mpe: Bwanya, Makanisi, Bongo)" },
      ],
      portmanteau: "Soki tosangisi maloba yango mibale mpo na kobimisa DarAkili, ememi ndimbola ya mozindo ya kokangisa makanisi, kosilisa bozangi boyebi, mpe kofungola nzela ya kopesa mayele mpe bososoli mpo na bato nyonso.",
      visionTitle: "Emoniseli na Biso: Kotinda mpe Kokabola Boyebi",
      paragraphs: [
        "Banda bambula ebele, misala ya kotinda mbongo (remittances) nde ezalaki gbagba ya liboso oyo ekangisaki bana ya diaspora na kontina ya Afrika, mpo na kotinda mosolo ya kosunga mabota mpe kotonga mboka.",
        "Atako mosolo ezali na ntina, bozwi ya solosolo ezali na kati ya bongo. Lelo oyo, tolingi kotinda eloko oyo eleki mbongo na nguya. Na nzela ya DarAkili, tozali kobimisa lolenge ya sika ya botindi: <strong>kotinda mpe kokabola boyebi</strong>.",
        "Mokano na biso ya monene ezali ya kokangisa bana ya Afrika na mokili mobimba bango na bango — mpo bákabola mayele, makoki, mpe bwanya koleka bandelo mpe minoko nyonso. Tondimi ete mayele ya bana ya Afrika esengeli kotambola na bonsomi nyonso na mokili mobimba. Ngonga ekoki ya kosalela bongo na biso — <em>Salela Bongo</em> — mpo na kokabola boyebi, kosangisa makanisi, mpe kotombola mayele na biso nyonso.",
      ],
      downloadTitle: "Ezali sikoyo na iPhone mpe na Android",
      downloadText: "Application ya DarAkili ebimi na App Store mpe na Google Play. Plateforme mobimba ekoti na telefone na yo : landá liteya kozanga navigateur, kobá liteya esika otikaki yango na web, talá classement na yo na engumba mpe na ekolo, futá to sungá liteya na nzela ya application (Apple to Google), mpe zwá nsango (notification) ntango liteya oyo olandaka ebongisami. Kofuta na Mobile Money ezali kaka na web. Compte kaka moko ya DarAkili mpo na web, iOS mpe Android.",
      iosLabel: "Zwá yango na App Store",
      androidLabel: "Zwá yango na Google Play",
    },
    doublevoix: {
      label: "DoubleVoix · doublevoix.com",
      title: "Likanisi oyo ezali nsima ya DoubleVoix",
      renameNote: "Liboso ezalaki <strong>CBD — Doublage Bilingue Consécutif</strong>, na cbd.salelabongo.org. Sikoyo mosala oyo ezali na nkombo na yango moko mpe adresse na yango moko : <a href=\"https://www.doublevoix.com\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #b4540a; text-decoration: underline;\">www.doublevoix.com</a>. Mingongo mibale, vidéo moko.",
      howTitle: "Momesano ya mobongoli (interprète), ndenge moko",
      steps: [
        { n: "1", text: "Molobi azali koloba — mongongo na ye, maloba na ye, ebongwani te." },
        { n: "2", text: "Atelemi mwa moke. Kimia ya solo : ntango oyo mobongoli (interprète) azwaka maloba." },
        { n: "3", text: "Mongongo ya mobongoli ebongoli eteni yango na monoko na yo, likolo ya elilingi oyo etelemi mpe elembo ya monoko." },
        { n: "4", text: "Molobi azongeli koloba. Mpe bongo na bongo tii na nsuka." },
      ],
      paragraphs: [
        "Na ndako ya Nzambe na Kinshasa, na likita ya monene (conférence) to na likita ya libota, mobongoli alobaka te likolo ya mongongo ya molobi : azelaka ngala na ye. Molobi abimisi likanisi, atelemi, mobongoli alimboli yango na monoko mosusu, na nsima molobi akobi. DoubleVoix esalaka kaka lolenge wana, yango moko, mpo na vidéo nyonso.",
        "Yango nde ekesenisi yango na doublage ya momesano. Doublage elongolaka mongongo ya liboso mpe esengeli kokotisa bobongoli na makasi na kati ya ntango moke ya original : mongongo ekimaka mbangu, mpe elengi ya maloba ebebaka. DoubleVoix <strong>ebakisaka</strong> — mongongo ya ebandeli etikalaka ndenge ezalaki, bobongoli ezwaka ntango na yango moko, mpe vidéo ya nsuka ekómaka molai pene na mbala mibale. Mokakatano ya kokokanisa monoko esili, mpe mongongo ya mobongoli epemaka malamu.",
        "Ntango ya kimia ezali likambo ya mpamba te. Soki ezali te, vidéo ekataka maloba ya molobi mpo na kokota na bobongoli mbala moko ; soki ezali, oyokaka lokola bato na kati ya ndako bazali kozela mobongoli.",
        "Ezali mpo na banani ? Mateya ya Nzambe, ba conférences mpe ba formations, matatoli (témoignages), masolo ya diaspora — eloko nyonso oyo esengeli koyokana koleka monoko oyo elobamaki na ebandeli. Baká lien (YouTube, Facebook, Instagram, TikTok, X…) to kotisá fichier, poná monoko, mpe miniti ya liboso ezongi ebongolami, ya ofele.",
        "Minoko mitano oyo ebongolamaka tii lelo — Anglais, Français, Espagnol, Swahili, Allemand — mpe likambo eleki ntina : <strong>Lingala eyebani lokola monoko ya ebandeli (source)</strong>, kaka lolenge ya monoko oyo bisaleli minene ya mombongo ebosanaka. Bobongoli nyonso ekoki kotangama mpe kobongisama liboso mongongo ebima, ba sous-titres .srt ezali elongo na vidéo ya nsuka, mpe miziki ya nsima ekoki kolongolama mpe kozongisama mpo kaka maloba ebongolama.",
      ],
      downloadTitle: "Ezali sikoyo na iPhone mpe na Android",
      downloadText: "Ba applications ya iOS mpe Android ya DoubleVoix ebimi : mosala ndenge moko, compte kaka moko, na kati ya poche na yo — baká lien, landá ndenge vidéo ezali kobongisama, zwá nsango (notification) ntango esili, mpe kabolá yango.",
      iosLabel: "Zwá yango na App Store",
      androidLabel: "Zwá yango na Google Play",
      contactLabel: "Kokutana na DoubleVoix",
      contactEmail: "doublevoix@salelabongo.org",
    },
    kuetu: {
      label: "Kuetu · kuetu.salelabongo.org",
      title: "Kuetu — IA ekoyekola minoko na biso yango moko te",
      paragraphs: [
        "Ba modèles minene ya Intelligence Artificielle elobaka Lingala, Tshiluba mpe Kikongo malamu te to elobaka yango ata moke te, mpe ezali naino kokakatana na Kiswahili. Ezali te mpo minoko yango ezangi bozwi : ezali mpo ba données oyo ebongisami mpe etiami bilembo (annotées) mpo na kolimbola yango ezali te. Nzokande ba données yango ekoki kouta kaka na esika moko — epai ya bato oyo balobaka minoko yango mikolo nyonso.",
        "<strong>Kuetu</strong> ezali plateforme oyo epesi bango mosala yango, mpe efutaka bango mpo na yango. Ba kompanyi, ba laboratoires mpe balukiluki batiaka ba données na bango ; bana ya Afrika batiaka bilembo, bakangaka mingongo, babongolaka mpe batalaka soki ezali malamu ; na nsima ba données ebimi ebongi mpo na koteya modèle ya IA.",
        "Moto oyo ayebi Lingala malamu koleka azali tango nyonso te moto oyo amesani na tableur to esaleli ya makasi ya ordinatɛrɛ. Azali na telefone Android ya ntalo ya nse, ba mégas (données mobiles) oyo ezali ntalo makasi, mpe Telegram esili kozala na telefone na ye. Yango wana <strong>na kati ya Telegram</strong> nde Kuetu elekisaka mosala nyonso : ba cartes ya mosala na ba boutons, ba notes vocales, mpe kobongisa na kofina mbala moko. Eloko ya kokotisa ya sika ezali te, eloko ya mpasi ya koyekola ezali te, mpe eliyaka ba mégas mingi te.",
        "<strong>WhatsApp esalelamaka kaka mpo na kobenga bato ya mosala, koyamba bango, koyebisa nsango mpe kosunga</strong> — ata mokolo moko te mpo na kozwa eyano ya mosala, elembo to fichier. Mibeko ya Meta epekisi kosalela ba données oyo ezwami na ba API na yango mpo na koteya modèle ya IA to kopesa yango na bato mosusu ; na Kuetu yango ezali kaka maloba ya mpamba te kasi mobeko oyo ekengalamaka na ba tests automatiques, mpe nsango nyonso ya WhatsApp etindaka mosali na bot ya Telegram.",
        "Bosembo ezali kaka maloba ya koluka kitoko te. Ndingisa (consentement) esengamaka lisusu <strong>na botindi mokomoko</strong>, kasi kaka mokolo ya kokota te. Uta na lisolo ya Telegram, mosali akoki kotala mbongo azwi, kotelemela bapwɛ bapesi ye, kobongola monoko, kopemisa compte na ye, kolongola ndingisa na ye to kosenga ete ba données na ye nyonso elongolama. Mafuti ekendaka na Mobile Money, na nimero oyo epesamaki na Telegram — ata moke te na WhatsApp.",
      ],
      taskTitle: "Misala oyo esalemaka kuna",
      tasks: [
        "Kokabola makomi na mitindo (classification)",
        "Kopona eyano oyo eleki malamu kati ya mibale",
        "Kondimisa soki mongongo oyo ekangami ezali malamu",
        "Kotanga makomi na mongongo makasi",
        "Kobongola makomi na monoko mosusu",
        "Kotalela lisusu mpe kobongisa mosala",
      ],
      startTitle: "Ndenge ya kobanda",
      groups: [
        {
          id: "annotators",
          title: "Basali ya annotation & batali ya mosala",
          subtitle: "Bot ya Telegram : @KuetuBot",
          steps: [
            "Fungolá <strong>t.me/KuetuBot</strong> na Telegram mpe tindá <strong>/start</strong>.",
            "Poná monoko na yo (English, Français, Kiswahili), ndimá mibeko ya ndingisa (consentement), pesá mwa makambo ya profil na yo, na nsima kabolá nimero na yo na kofina bouton moko. Ezwaka kaka miniti moko.",
            "Mpo na kozwa mosala, esengeli ozala na lien ya libengi ya projet — <strong>t.me/KuetuBot?start=CODE-NA-YO</strong> — oyo mokambi (coordinateur) na yo atindeli yo : kofina mbala moko ekotisi yo na projet.",
            "Tindá <strong>/task</strong> mpo na kozwa carte ya mosala, yanolá na bouton to na note vocale, mpe bandá lisusu. Mpe na ntango nyonso : /earnings (mbongo ozwi), /history (misala otindi), /review mpe /appeal (kotelemela botali), /language, /pause, /revoke, /deletemydata, /help.",
          ],
          cta: "Fungolá @KuetuBot",
          ctaUrl: "https://t.me/KuetuBot",
        },
        {
          id: "coordinators",
          title: "Bakambi ya ba projets & balukiluki",
          subtitle: "Portail : kuetu.salelabongo.org",
          steps: [
            "Kotá na portail na compte na yo ya mokambi (coordinateur). Na eleko oyo ya pilote, ba comptes efungolamaka moke-moke, na libengi.",
            "Kelá projet mpe kotisá ba données na yo, na nsima bongisá mitindo ya bilembo, malako ya mosala mpe lifuti ya projet.",
            "Bimisá ba codes ya libengi : code mokomoko esalelamaka kaka na moto moko, ekoki kolongolama mpe kolandama — to code moko mpo na bato ebele na WhatsApp ntango olingi mosala ekende mbangu.",
            "Landá lolenge mosala ezali koleka — annotation mbala mibale, mobeko ya biyano mibale oyo ekokani likolo ya misato, botali ya bakengeli, mpe makoki ya mosali kotelemela — na nsima bimisá (exporter) ba données oyo esili kobongisama.",
          ],
          cta: "Kotá na portail",
          ctaUrl: "https://kuetu.salelabongo.org",
        },
      ],
      note: "Kuetu ezali na etape ya pilote : basali mpe bakambi ya ba projets bazali koyambama moke-moke, na libengi. Komelá <a href=\"mailto:kuetu@salelabongo.org\" style=\"color: var(--teal-d); text-decoration: underline;\">kuetu@salelabongo.org</a> mpo na kosenga nzela ya kokota.",
    },
    legal: {
      title: "Mibeko & Bosembo",
      sub: "Mibeko ya kompanyi mpo na ba plateformes nyonso ya Salela Bongo LLC.",
      items: [
        { label: "Mibeko ya Kobomba Sekele", url: "/legal/privacy" },
        { label: "Mibeko ya Kosalela", url: "/legal/terms" },
        { label: "Mibeko ya Lisanga", url: "/legal/community-guidelines" },
        { label: "Kolongola Ba Données", url: "/legal/data-deletion" },
      ],
    },
    contact: {
      title: "Kokutana na biso",
      sub: "Mpo na mituna nyonso, bapanzi-nsango to boyokani ya mosala.",
      general: "Mituna ya makambo nyonso",
      apps_contact: "Lisungi mpo na ba plateformes",
    },
    footer: "Makoki nyonso ebatelami",
  },
  sw: {
    nav: { about: "Kuhusu Sisi", apps: "Majukwaa Yetu", contact: "Wasiliana Nasi" },
    hero: {
      badge: "Salela Bongo LLC — « Tumia Ubongo Wako »",
      headline: "Afrika Inafikiri. Afrika Inabuni. Afrika Inajenga.",
      sub: "\"Salela Bongo\" inamaanisha \"Tumia Ubongo Wako\" kwa Kilingala. Kama vile kumbi za mazoezi (gym) zinavyojenga mwili, tunaamini kuwa ubongo nao lazima ufanyiwe mazoezi. Tunajenga majukwaa ya kidijitali yanayoundwa na Waafrika, kwa ajili ya Waafrika — kwa lugha za Afrika, na kwa moyo wa Afrika.",
      cta: "Gundua majukwaa yetu",
      ctaSub: "Wasiliana nasi",
      stats: { platforms: "Majukwaa", languages: "Lugha", countries: "Nchi" },
    },
    mission: {
      title: "Dhamira Yetu",
      quote: "Dunia ina kumbi za mazoezi kwa ajili ya mwili — sisi tunajenga kumbi za mazoezi kwa ajili ya akili ya Mwafrika.",
      paragraphs: [
        "Salela Bongo LLC ilizaliwa kutokana na imani rahisi lakini yenye nguvu: akili ya Mwafrika inastahili zana zilizojengwa kuendana na uwezo wake. Jina letu, \"Salela Bongo\", ni wito wa Kilingala — \"Tumia Ubongo Wako\" — mwito wa hamasa kwa kila Mwafrika na kila mwana-diaspora anayekataa kuwa mtazamaji tu katika mapinduzi ya kidijitali.",
        "Bidhaa zetu ni zaidi ya programu za kompyuta. Tunajenga majukwaa ambapo akili ya Mwafrika inaweza kufanya mazoezi, kujifunza, kucheza na kujenga biashara — kwa Kifaransa, Kiingereza, Kilingala na Kiswahili. Kama ilivyo Masakhane (\"Tunajenga pamoja\"), tunaamini kuwa mustakabali wa teknolojia barani Afrika utajengwa na wale wanaoelewa mazingira yake, wanaozungumza lugha zake na wanaobeba utamaduni wake ndani ya msimbo (code) wao.",
        "Michezo hulisha mwili. Sisi tunalisha akili. Kila mchezo wa dama unaochezwa, kila kozi inayokamilishwa, na kila duka linalofunguliwa kwenye majukwaa yetu ni zoezi la kiakili — hatua moja zaidi kuelekea Afrika inayofikiri, inayobuni na kuongoza katika ulimwengu wa kidijitali.",
        "Leo hii, wakati dunia ikielekeza nguvu kubwa katika kufundisha mifumo mikubwa ya Akili Mnemba (AI) na mifumo mikubwa ya lugha (LLMs), tunaamini katika kuifundisha na kuiimarisha akili ya vijana wa Kiafrika kwanza. Afrika ina idadi kubwa zaidi ya vijana duniani, ikiwa na umri wa wastani (median age) wa takriban miaka 19. Ifikapo mwaka 2050, bara la Afrika litakuwa kichocheo kikuu cha ukuaji wa idadi ya watu duniani, ikimaanisha kuwa mustakabali wa dunia umeunganishwa moja kwa moja na maendeleo ya kiakili ya vijana wa Afrika. (<a href=\"https://population.un.org/wpp/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: var(--teal); text-decoration: underline;\">Rejea: Matarajio ya Idadi ya Watu Duniani ya Umoja wa Mataifa</a>)",
      ],
    },
    about: {
      title: "Sisi ni Nani",
      desc1: "Salela Bongo LLC ni kampuni ya teknolojia iliyosajiliwa nchini Marekani, iliyoanzishwa na Waafrika wenye shauku wanaoelewa uhalisia, lugha na matarajio ya bara letu. Tunabuni, tunachapisha na kuendesha programu na majukwaa yetu wenyewe ya kidijitali kwa ajili ya Afrika na diaspora yake.",
      desc2: "Sisi si kampuni inayoiangalia Afrika kwa mbali — sisi ni Afrika yenyewe. Tunazungumza lugha zake, tunaishi uhalisia wake, na tunajenga bidhaa zetu kutoka ndani. Kila bidhaa tunayounda imejikita katika utamaduni wetu, inatumia lugha nyingi, na imeundwa kuendana na mazingira halisi ya Kiafrika.",
      items: [
        { icon: "🧠", label: "Falsafa", value: "Salela Bongo — Tumia Ubongo Wako" },
        { icon: "🌍", label: "Masoko Lengwa", value: "Afrika na Diaspora" },
        { icon: "📱", label: "Majukwaa", value: "iOS · Android · Wavuti" },
        { icon: "🗣️", label: "Lugha", value: "FR · EN · Lingala · Kiswahili" },
        { icon: "✉️", label: "Mawasiliano", value: "contact@salelabongo.org" },
      ],
    },
    apps: {
      title: "Majukwaa Yetu",
      sub: "Bidhaa tano — dhamira moja ya ubora wa hali ya juu.",
      list: [
        {
          id: "darakili",
          logo: "/logo-darakili.png",
          name: "DarAkili",
          domain: "darakili.com",
          tag: "Wavuti · iOS · Android · Inapatikana sasa",
          color: "#10b981",
          desc: "DarAkili — muunganiko wa maneno ya Kiswahili Daraja na Akili — ukimaanisha \"Daraja la Akili\". Jukwaa la kujifunza mtandaoni lililoundwa kwa ajili ya Afrika — kozi zilizoandaliwa na Waafrika, orodha za washindi kwa mji na nchi, pamoja na malipo ya Mobile Money. Programu za iPhone na Android sasa zimechapishwa: akaunti ileile na maendeleo yaleyale kama kwenye wavuti.",
          features: ["Kozi za bure na za kulipia", "Orodha ya washindi kimji na nchi", "Ufadhili wa kozi", "Mobile Money", "Programu ya iOS & Android"],
          url: "https://darakili.com",
          stores: DARAKILI_STORES,
        },
        {
          id: "doublevoix",
          logo: "/logo-doublevoix.png",
          name: "DoubleVoix",
          domain: "www.doublevoix.com",
          tag: "Wavuti · AI · iOS · Android · Inapatikana sasa",
          color: "#f97316",
          desc: "Awali ilijulikana kama CBD — Consecutive Bilingual Dubbing (cbd.salelabongo.org). Ukalimani wa kupishana kwa video yoyote: mzungumzaji anasikika kwa maneno yake halisi, kisha sauti ya mkalimani inatafsiri kila sehemu kwa lugha yako — kwa mwendo wa mkalimani wa moja kwa moja ukumbini, si kufunika sauti ya mzungumzaji. Bandika kiungo (link) au pakia faili; dakika ya kwanza ni bure.",
          features: ["Kiingereza, Kifaransa, Kihispania, Kiswahili, Kijerumani", "Inatambua Kilingala kama lugha chanzi", "Manukuu (.srt) yamejumuishwa", "Muziki wa chinichini huondolewa", "Programu ya iOS & Android"],
          url: "https://www.doublevoix.com",
          stores: DOUBLEVOIX_STORES,
        },
        {
          id: "kuetu",
          logo: "/logo-kuetu.png",
          name: "Kuetu",
          domain: "kuetu.salelabongo.org",
          tag: "Telegram · Wavuti · AI · Majaribio",
          color: "#8b5cf6",
          desc: "Jukwaa la kuweka lebo na kuchambua data (data annotation) kwa lugha za Kiafrika, linaloendeshwa kikamilifu ndani ya mazungumzo ya Telegram: kadi za kazi zenye vitufe, ujumbe wa sauti, na masahihisho kwa mguso mmoja. Kampuni na watafiti husimamia miradi, seti za data na upakuaji kwenye tovuti; mchambuzi anahitaji tu boti ya @KuetuBot.",
          features: ["Kila kitu ndani ya Telegram", "Malipo kwa Mobile Money", "Idhini kwa kila uwasilishaji", "Tovuti ya miradi na upakuaji data"],
          url: "https://kuetu.salelabongo.org",
        },
        {
          id: "yebela",
          logo: "/logo-yebela.png",
          name: "Yebela Store",
          domain: "yebela.store",
          tag: "Wavuti · PWA",
          color: "#f59e0b",
          desc: "Katalogi ya kudumu ya biashara mtandaoni kwa wajasiriamali wa Kiafrika. Fungua duka lako ndani ya dakika 2, shiriki kiungo na uuze popote duniani.",
          features: ["Duka ndani ya dakika 2", "Imeunganishwa na WhatsApp", "Mobile Money", "PWA — bila App Store"],
          url: "https://yebela.store",
        },
        {
          id: "jeuxdedames",
          logo: "/logo-jeuxdedames.png",
          logoBg: true,
          name: "Jeux de Dames",
          domain: "jeuxdedames.africa",
          tag: "Wavuti · iOS · Android · Inapatikana",
          color: "#3b82f6",
          desc: "Jukwaa la mchezo wa dama mtandaoni lenye mitindo ya Kongo (DRC), Kimataifa na Kimarekani. Michezo ya moja kwa moja (real-time), gumzo ndani ya mchezo, kifurushi cha premium na wasifu wa wachezaji.",
          features: ["Uchezaji wa moja kwa moja", "Aina 3 za mchezo", "Kifurushi cha Premium", "iOS & Android"],
          url: "https://jeuxdedames.africa",
          stores: JEUXDEDAMES_STORES,
        },
      ],
    },
    darakili: {
      label: "DarAkili · Daraja la Akili",
      title: "Maono Nyuma ya DarAkili",
      nameTitle: "Maana ya Jina DarAkili",
      words: [
        { word: "Daraja", meaning: "Kiungo / Daraja", detail: "(pia: Ngazi, Kiwango, Cheo, Hatua)" },
        { word: "Akili", meaning: "Ufahamu / Akili", detail: "(pia: Fikra, Maarifa, Ubongo)" },
      ],
      portmanteau: "Maneno haya mawili ya Kiswahili yanapounganishwa na kuunda DarAkili, yanabeba maana kubwa ya kuunganisha mawazo, kuziba pengo la maarifa, na kujenga njia ya kuelekea kwenye akili na uelewa wa pamoja.",
      visionTitle: "Maono Yetu: Utumaji wa Maarifa Nyumbani",
      paragraphs: [
        "Kwa miongo kadhaa, huduma za kutuma pesa nyumbani (remittances) zimekuwa daraja kuu linalounganisha Waafrika waishio nje (diaspora) na bara la Afrika, zikituruhusu kutuma pesa kusaidia familia zetu na kujenga jamii zetu.",
        "Ingawa mtaji wa kifedha ni muhimu, utajiri wa kweli upo kwenye akili. Leo, tunataka kutuma kitu chenye nguvu zaidi kuliko pesa. Kupitia DarAkili, tunaanzisha aina mpya ya utumaji rasilimali: <strong>utumaji na usambazaji wa maarifa</strong>.",
        "Maono yetu makuu ni kuwaunganisha Waafrika kote duniani moja kwa moja wao kwa wao — wakishirikishana akili, ujuzi na hekima kuvuka mipaka na lugha zote. Tunaamini kuwa maarifa ya Mwafrika yanapaswa kutiririka kwa uhuru kote ulimwenguni. Huu ni wakati wa kutumia akili zetu — <em>Salela Bongo</em> — kushiriki maarifa, kubadilishana mawazo na kuinua uwezo wetu wa kiakili kwa pamoja.",
      ],
      downloadTitle: "Inapatikana sasa kwenye iPhone na Android",
      downloadText: "Programu ya DarAkili imechapishwa kwenye App Store na Google Play. Jukwaa zima lipo kiganjani mwako: soma kozi bila kuhitaji kivinjari (browser), endelea na somo pale ulipoachia kwenye wavuti, tazama nafasi yako kwenye orodha ya washindi wa mji na nchi yako, lipia au fadhili kozi kupitia malipo ya ndani ya programu (Apple au Google), na upokee taarifa kozi unayoifuatilia inaposasishwa. Malipo ya Mobile Money yanaendelea kupatikana kwenye wavuti. Akaunti moja ya DarAkili kwa wavuti, iOS na Android.",
      iosLabel: "Pakua kwenye App Store",
      androidLabel: "Ipate kwenye Google Play",
    },
    doublevoix: {
      label: "DoubleVoix · doublevoix.com",
      title: "Wazo Nyuma ya DoubleVoix",
      renameNote: "Awali ilijulikana kama <strong>CBD — Consecutive Bilingual Dubbing</strong>, kwenye cbd.salelabongo.org. Sasa mradi huu una jina lake na anwani yake rasmi: <a href=\"https://www.doublevoix.com\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #b4540a; text-decoration: underline;\">www.doublevoix.com</a>. Sauti mbili, video moja.",
      howTitle: "Mwendo wa mkalimani, ukiigwa kikamilifu",
      steps: [
        { n: "1", text: "Mzungumzaji anaongea — sauti yake na maneno yake yanabaki kama yalivyo." },
        { n: "2", text: "Anatulia. Kimya halisi: muda ambao mkalimani huingia." },
        { n: "3", text: "Sauti ya mkalimani inatafsiri sehemu hiyo kwa lugha yako, juu ya picha iliyosimamishwa yenye alama ya lugha." },
        { n: "4", text: "Mzungumzaji anaendelea. Na vivyo hivyo hadi mwisho." },
      ],
      paragraphs: [
        "Kanisani jijini Kinshasa, Dar es Salaam au Nairobi, kwenye mkutano au kikao cha familia, mkalimani haongei juu ya sauti ya mzungumzaji: anasubiri zamu yake. Mzungumzaji anatoa wazo, anatulia, mkalimani analitafsiri kwa lugha nyingine, kisha mzungumzaji anaendelea. DoubleVoix inazalisha mwendo huohuo kiotomatiki kwa video yoyote.",
        "Hicho ndicho kinachoitofautisha na uwekaji sauti wa kawaida (dubbing). Dubbing ya kawaida huondoa sauti ya asili na kulazimisha tafsiri ienee ndani ya muda uleule wa mzungumzaji wa awali: sauti huharakishwa na maana kupotea. DoubleVoix <strong>huongeza muda</strong> — sauti ya asili inabaki salama, tafsiri inapata muda wake kamili wa kusikika, na video ya mwisho huwa na urefu wa takriban mara mbili. Shinikizo la kufanana kwa midomo huondoka, na sauti ya mkalimani inapumua.",
        "Sekunde za kimya si mapambo tu ya uhariri. Bila kimya hicho, video hukata ghafla kutoka kwa mzungumzaji kwenda kwenye tafsiri; kikiwepo, unasikia hali halisi ya ukumbi unaomsubiri mkalimani wake.",
        "Ni kwa ajili ya nani? Mahubiri na mafundisho, mikutano na mafunzo, shuhuda, maudhui ya diaspora — chochote kinachostahili kueleweka zaidi ya lugha kilichosemwa kwayo. Bandika kiungo (YouTube, Facebook, Instagram, TikTok, X…) au pakia faili, chagua lugha, na dakika ya kwanza inarudi ikiwa imetafsiriwa, bure.",
        "Lugha tano lengwa hadi sasa — Kiingereza, Kifaransa, Kihispania, Kiswahili, Kijerumani — na muhimu zaidi, <strong>Kilingala kinatambuliwa kama lugha chanzi</strong>: aina hasa ya lugha ya Kiafrika ambayo zana za kibiashara za kimataifa huziacha nyuma. Kila tafsiri inaweza kuhakikiwa na kusahihishwa kabla ya sauti kutengenezwa, manukuu ya .srt huambatana na video ya mwisho, na muziki wa chinichini unaweza kuondolewa na kurudishwa ili maneno pekee ndiyo yatafsiriwe.",
      ],
      downloadTitle: "Inapatikana sasa kwenye iPhone na Android",
      downloadText: "Programu za iOS na Android za DoubleVoix zimechapishwa: huduma ileile na akaunti ileile mfukoni mwako — bandika kiungo, fuatilia uchakataji, pokea taarifa video ikiwa tayari, kisha uishiriki.",
      iosLabel: "Pakua kwenye App Store",
      androidLabel: "Ipate kwenye Google Play",
      contactLabel: "Mawasiliano ya DoubleVoix",
      contactEmail: "doublevoix@salelabongo.org",
    },
    kuetu: {
      label: "Kuetu · kuetu.salelabongo.org",
      title: "Kuetu — AI Haitajifunza Lugha Zetu Yenyewe",
      paragraphs: [
        "Mifumo mikubwa ya Akili Mnemba (AI) inazungumza Kilingala, Kitshiluba na Kikongo kwa shida sana — au haizungumzi kabisa — na bado inabahatisha kwenye Kiswahili. Hii si kwa sababu lugha zetu hazina utajiri: ni kwa sababu data iliyoandaliwa na kuwekewa lebo (annotated data) inayozielezea haipo. Na data hiyo inaweza kutoka chanzo kimoja pekee — watu wanaozungumza lugha hizo kila siku.",
        "<strong>Kuetu</strong> ni jukwaa linalowapa kazi hiyo na kuwalipa kwa kazi yao. Kampuni, maabara na watafiti huleta seti zao za data; wachambuzi wa Kiafrika huweka lebo, hurekodi sauti, hutafsiri na kuhakiki; kisha matokeo hupakuliwa yakiwa tayari kufundisha mifumo ya AI.",
        "Mtu anayefaa zaidi kuchambua Kilingala au Kiswahili si lazima awe mtu aliyezoea kutumia jedwali za kompyuta (spreadsheets) au mifumo migumu ya kitaalamu. Ana simu ya kawaida ya Android, vifurushi vya intaneti (bando) vyenye gharama, na tayari ana programu ya Telegram kwenye simu yake. Ndiyo maana Kuetu imeweka kazi yote <strong>ndani ya Telegram</strong>: kadi za kazi zenye vitufe, ujumbe wa sauti, na masahihisho kwa mguso mmoja. Hakuna cha kusakinisha, hakuna ugumu wa kujifunza, na inatumia bando kidogo sana.",
        "<strong>WhatsApp inatumika tu kualika, kukaribisha, kutoa taarifa na kutoa msaada</strong> — kamwe haitumiki kukusanya majibu ya kazi, lebo au faili. Masharti ya Meta yanakataza kutumia data inayopatikana kupitia API zake kufundishia mifumo ya AI au kuwapa wahusika wengine; katika Kuetu hiyo si ahadi ya maandishi tu bali ni sheria inayolindwa kwa majaribio ya kiotomatiki, na kila ujumbe wa WhatsApp humpeleka mtumiaji moja kwa moja kwenye boti ya Telegram.",
        "Maadili kwetu si mapambo. Idhini (consent) inaombwa tena <strong>katika kila uwasilishaji wa kazi</strong>, si wakati wa kujisajili pekee. Ndani ya mazungumzo ya Telegram, mchambuzi anaweza kuangalia mapato yake, kukata rufaa kuhusu tathmini, kubadilisha lugha, kusitisha akaunti kwa muda, kuondoa idhini au kuomba kufutwa kwa data yake yote. Malipo hutumwa kwa Mobile Money kwenda kwenye nambari iliyotolewa ndani ya Telegram — kamwe si kwenye WhatsApp.",
      ],
      taskTitle: "Aina za kazi zinazofanyika",
      tasks: [
        "Uainishaji wa maandishi (Text classification)",
        "Kuchagua jibu bora kati ya mawili",
        "Uhakiki wa rekodi za sauti",
        "Kusoma maandishi kwa sauti",
        "Kutafsiri kwa kuandika",
        "Uhakiki na uamuzi wa ubora",
      ],
      startTitle: "Jinsi ya kuanza",
      groups: [
        {
          id: "annotators",
          title: "Wachambuzi na wahakiki",
          subtitle: "Boti ya Telegram: @KuetuBot",
          steps: [
            "Fungua <strong>t.me/KuetuBot</strong> kwenye Telegram na utume <strong>/start</strong>.",
            "Chagua lugha yako (English, Français, Kiswahili), kubali skrini ya idhini, jaza maelezo machache ya wasifu, kisha shiriki nambari yako ya simu kwa kubofya kitufe kimoja. Inachukua kama dakika moja tu.",
            "Ili kupokea kazi unahitaji kiungo cha mwaliko wa mradi — <strong>t.me/KuetuBot?start=MSIMBO-WAKO</strong> — kinachotumwa na mratibu wako: mguso mmoja tu unakuingiza kwenye mradi.",
            "Tuma <strong>/task</strong> kupokea kadi ya kazi, jibu kwa kitufe au ujumbe wa sauti, na uendelee. Na wakati wowote unaweza kutumia: /earnings (mapato), /history (historia ya kazi), /review na /appeal (kupinga tathmini), /language, /pause, /revoke, /deletemydata, /help.",
          ],
          cta: "Fungua @KuetuBot",
          ctaUrl: "https://t.me/KuetuBot",
        },
        {
          id: "coordinators",
          title: "Waratibu wa miradi na watafiti",
          subtitle: "Tovuti: kuetu.salelabongo.org",
          steps: [
            "Ingia kwenye tovuti kwa akaunti yako ya mratibu. Katika kipindi hiki cha majaribio, akaunti zinafunguliwa hatua kwa hatua kwa mwaliko.",
            "Unda mradi na upakie data yako, kisha weka mpangilio wa lebo, maelekezo ya kazi na viwango vya malipo ya mradi.",
            "Tengeneza mialiko: kila msimbo ni wa matumizi ya mara moja, unaoweza kufutwa na kufuatiliwa — au msimbo mmoja wa pamoja kwa ajili ya kusambaza kwenye WhatsApp wakati kasi ni muhimu zaidi.",
            "Simamia ubora — uchambuzi wa watu wawili kwa kila kazi, kanuni ya kura mbili zinazofanana kati ya tatu, uamuzi wa wahakiki, na rufaa za wachambuzi — kisha pakua seti ya data iliyokamilika.",
          ],
          cta: "Fungua tovuti",
          ctaUrl: "https://kuetu.salelabongo.org",
        },
      ],
      note: "Kuetu ipo katika hatua ya majaribio (pilot): wachambuzi na waratibu wa miradi wanapokelewa hatua kwa hatua kwa mwaliko. Andika barua pepe kwenda <a href=\"mailto:kuetu@salelabongo.org\" style=\"color: var(--teal-d); text-decoration: underline;\">kuetu@salelabongo.org</a> kuomba ufikiaji.",
    },
    legal: {
      title: "Sheria na Uzingatiaji",
      sub: "Sera za kampuni kwa majukwaa yote ya Salela Bongo LLC.",
      items: [
        { label: "Sera ya Faragha", url: "/legal/privacy" },
        { label: "Masharti ya Huduma", url: "/legal/terms" },
        { label: "Miongozo ya Jamii", url: "/legal/community-guidelines" },
        { label: "Ufutaji wa Data", url: "/legal/data-deletion" },
      ],
    },
    contact: {
      title: "Wasiliana Nasi",
      sub: "Kwa maswali, maombi ya vyombo vya habari au ushirikiano wa usambazaji.",
      general: "Maswali ya jumla",
      apps_contact: "Msaada wa majukwaa",
    },
    footer: "Haki zote zimehifadhiwa",
  },
};

export default function Home() {
  const lang = useLegalLanguage() as Language;
  const txt = t[lang];
  const year = new Date().getFullYear();

  const handleLangChange = (l: Language) => {
    storeLanguage(l);
  };

  return (
    <div className={styles.page}>
      {/* ── Background orbs ── */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <a href="#top" className={styles.logo}>
          <Image src="/Rounded.png" alt="Salela Bongo Logo" width={32} height={32} className={styles.mainLogoImg} />
          <span>Salela Bongo</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#about" className={styles.navLink}>{txt.nav.about}</a>
          <a href="#apps" className={styles.navLink}>{txt.nav.apps}</a>
          <a href="#contact" className={styles.navLink}>{txt.nav.contact}</a>
        </div>
        <div className={styles.navRight}>
          <SocialLinks />
          <div className={styles.langSwitcher}>
            {(["fr", "en", "ln", "sw"] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => handleLangChange(l)}
                className={`${styles.langBtn} ${lang === l ? styles.langActive : ""}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="top" className={styles.hero}>
        <Image src="/Rounded.png" alt="" width={104} height={104} className={styles.heroLogo} priority />
        <div className={styles.heroBadge}>{txt.hero.badge}</div>
        <h1 className={styles.heroHeadline}>{txt.hero.headline}</h1>
        <p className={styles.heroSub}>{txt.hero.sub}</p>
        <div className={styles.heroCTAs}>
          <a href="#apps" className={styles.btnPrimary}>{txt.hero.cta}</a>
          <a href="#contact" className={styles.btnGhost}>{txt.hero.ctaSub}</a>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.stat}><span className={styles.statNum}>5</span><span className={styles.statLabel}>{txt.hero.stats.platforms}</span></div>
          <div className={styles.statDivider} />
          <div className={styles.stat}><span className={styles.statNum}>4</span><span className={styles.statLabel}>{txt.hero.stats.languages}</span></div>
          <div className={styles.statDivider} />
          <div className={styles.stat}><span className={styles.statNum}>50+</span><span className={styles.statLabel}>{txt.hero.stats.countries}</span></div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section id="mission" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>🧠 Salela Bongo</div>
          <h2 className={styles.sectionTitle}>{txt.mission.title}</h2>
          <blockquote className={styles.missionQuote}>
            {txt.mission.quote}
          </blockquote>
          <div className={styles.missionParagraphs}>
            {txt.mission.paragraphs.map((p, i) => (
              <p key={i} className={styles.missionPara} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Company</div>
          <h2 className={styles.sectionTitle}>{txt.about.title}</h2>
          <div className={styles.aboutBannerWrap}>
            <Image src="/Background.jpeg" alt="Salela Bongo LLC" fill className={styles.aboutBannerImg} />
          </div>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p className={styles.aboutPara}>{txt.about.desc1}</p>
              <p className={styles.aboutPara}>{txt.about.desc2}</p>
            </div>
            <div className={styles.aboutCards}>
              {txt.about.items.map((item) => (
                <div key={item.label} className={styles.aboutCard}>
                  <span className={styles.aboutCardIcon}>{item.icon}</span>
                  <div>
                    <div className={styles.aboutCardLabel}>{item.label}</div>
                    <div className={styles.aboutCardValue}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── APPS ── */}
      <section id="apps" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Products</div>
          <h2 className={styles.sectionTitle}>{txt.apps.title}</h2>
          <p className={styles.sectionSub}>{txt.apps.sub}</p>
          <div className={styles.appsGrid}>
            {txt.apps.list.map((app) => {
              const socials = BRAND_SOCIALS[app.id];
              return (
                /* A plain <div>, not an <a>: a card that is one big link starts a link-drag
                   instead of a text selection, so nothing inside could be copied. Only the
                   header and the CTA are links now. */
                <div
                  key={app.id}
                  className={styles.appCard}
                  style={{ "--app-color": app.color } as React.CSSProperties}
                >
                  <a href={app.url} target="_blank" rel="noopener noreferrer" className={styles.appCardHeader} draggable={false}>
                    <div className={`${styles.appLogoWrap} ${"logoBg" in app && app.logoBg ? styles.appLogoWhiteBg : ""}`}>
                      <Image src={app.logo} alt={app.name} width={56} height={56} className={styles.appLogo} draggable={false} />
                    </div>
                    <div className={styles.appHeaderInfo}>
                      <div className={styles.appName}>{app.name}</div>
                      <span className={styles.appDomain}>{app.domain} ↗</span>
                    </div>
                  </a>
                  <div className={styles.appTagRow}>
                    <span className={styles.appTag}>{app.tag}</span>
                  </div>
                  <p className={styles.appDesc}>{app.desc}</p>
                  <ul className={styles.appFeatures}>
                    {app.features.map((f) => (
                      <li key={f} className={styles.appFeature}>
                        <span className={styles.appFeatureDot} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.appFooter}>
                    {"stores" in app && app.stores ? (
                      <div className={styles.storeRow}>
                        <a href={app.stores.ios} target="_blank" rel="noopener noreferrer" className={styles.storeBadge} draggable={false}>
                          <AppleIcon size={22} />
                          <span className={styles.storeBadgeText}>
                            <small>{STORE_LINES[lang].apple}</small>App Store
                          </span>
                        </a>
                        <a href={app.stores.android} target="_blank" rel="noopener noreferrer" className={styles.storeBadge} draggable={false}>
                          <PlayIcon size={22} colored />
                          <span className={styles.storeBadgeText}>
                            <small>{STORE_LINES[lang].google}</small>Google Play
                          </span>
                        </a>
                      </div>
                    ) : null}
                    {socials ? <SocialIcons socials={socials} /> : null}
                    <a href={app.url} target="_blank" rel="noopener noreferrer" className={styles.appCTA} draggable={false}>
                      {SOCIAL_TITLE[lang].visit} {app.domain} ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DARAKILI VISION ── */}
      <section id="darakili-vision" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>🌉 {txt.darakili.label}</div>
          <h2 className={styles.sectionTitle}>{txt.darakili.title}</h2>

          {/* Word breakdown */}
          <div className={styles.darakiliCard}>
            <div className={styles.darakiliNameTitle}>{txt.darakili.nameTitle}</div>
            <div className={styles.darakiliWords}>
              {txt.darakili.words.map((w) => (
                <div key={w.word} className={styles.darakiliWord}>
                  <span className={styles.darakiliWordRoot}>{w.word}</span>
                  <span className={styles.darakiliWordArrow}>→</span>
                  <span className={styles.darakiliWordMeaning}>{w.meaning}</span>
                  <span className={styles.darakiliWordDetail}>{w.detail}</span>
                </div>
              ))}
            </div>
            <p className={styles.darakiliPortmanteau}>{txt.darakili.portmanteau}</p>
          </div>

          {/* Vision */}
          <div className={styles.darakiliVisionTitle}>{txt.darakili.visionTitle}</div>
          <div className={styles.missionParagraphs}>
            {txt.darakili.paragraphs.map((p, i) => (
              <p key={i} className={styles.missionPara} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>

          {/* Download */}
          <div className={styles.downloadCard} style={{ "--accent": "#10b981" } as React.CSSProperties}>
            <div className={styles.downloadTitle}>📱 {txt.darakili.downloadTitle}</div>
            <p className={styles.downloadText}>{txt.darakili.downloadText}</p>
            <div className={styles.storeRow}>
              <a href={DARAKILI_STORES.ios} target="_blank" rel="noopener noreferrer" className={styles.storeBtnLg}>
                <AppleIcon /> {txt.darakili.iosLabel}
              </a>
              <a href={DARAKILI_STORES.android} target="_blank" rel="noopener noreferrer" className={styles.storeBtnLg}>
                <PlayIcon colored /> {txt.darakili.androidLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOUBLEVOIX ── */}
      <section id="doublevoix" className={styles.section} style={{ "--accent": "#f97316" } as React.CSSProperties}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>🎙️ {txt.doublevoix.label}</div>
          <h2 className={styles.sectionTitle}>{txt.doublevoix.title}</h2>
          <p className={styles.sectionSub} dangerouslySetInnerHTML={{ __html: txt.doublevoix.renameNote }} />

          <div className={styles.accentCard}>
            <div className={styles.accentCardTitle}>{txt.doublevoix.howTitle}</div>
            <ol className={styles.stepList}>
              {txt.doublevoix.steps.map((s) => (
                <li key={s.n} className={styles.step}>
                  <span className={styles.stepNum}>{s.n}</span>
                  <span className={styles.stepText}>{s.text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.missionParagraphs}>
            {txt.doublevoix.paragraphs.map((p, i) => (
              <p key={i} className={styles.missionPara} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>

          <div className={styles.downloadCard}>
            <div className={styles.downloadTitle}>📱 {txt.doublevoix.downloadTitle}</div>
            <p className={styles.downloadText}>{txt.doublevoix.downloadText}</p>
            <div className={styles.storeRow}>
              <a href={DOUBLEVOIX_STORES.ios} target="_blank" rel="noopener noreferrer" className={styles.storeBtnLg}>
                <AppleIcon /> {txt.doublevoix.iosLabel}
              </a>
              <a href={DOUBLEVOIX_STORES.android} target="_blank" rel="noopener noreferrer" className={styles.storeBtnLg}>
                <PlayIcon colored /> {txt.doublevoix.androidLabel}
              </a>
            </div>
          </div>

          <div className={styles.inlineContact}>
            <span className={styles.inlineContactLabel}>{txt.doublevoix.contactLabel}</span>
            <a href={`mailto:${txt.doublevoix.contactEmail}`} className={styles.contactEmail}>
              {txt.doublevoix.contactEmail}
            </a>
          </div>
        </div>
      </section>

      {/* ── KUETU ── */}
      <section id="kuetu" className={styles.section} style={{ "--accent": "#8b5cf6", "--app-color": "#8b5cf6" } as React.CSSProperties}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>💬 {txt.kuetu.label}</div>
          <h2 className={styles.sectionTitle}>{txt.kuetu.title}</h2>
          <div className={styles.missionParagraphs}>
            {txt.kuetu.paragraphs.map((p, i) => (
              <p key={i} className={styles.missionPara} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>

          <div className={styles.accentCard}>
            <div className={styles.accentCardTitle}>{txt.kuetu.taskTitle}</div>
            <ul className={styles.appFeatures}>
              {txt.kuetu.tasks.map((task) => (
                <li key={task} className={styles.appFeature}>
                  <span className={styles.appFeatureDot} />
                  {task}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.blockTitle}>{txt.kuetu.startTitle}</div>
          <div className={styles.startGrid}>
            {txt.kuetu.groups.map((group) => (
              <div key={group.id} className={styles.startCard}>
                <div className={styles.startCardTitle}>{group.title}</div>
                <div className={styles.startCardSub}>{group.subtitle}</div>
                <ol className={styles.stepList}>
                  {group.steps.map((s, i) => (
                    <li key={i} className={styles.step}>
                      <span className={styles.stepNum}>{i + 1}</span>
                      <span className={styles.stepText} dangerouslySetInnerHTML={{ __html: s }} />
                    </li>
                  ))}
                </ol>
                <a href={group.ctaUrl} target="_blank" rel="noopener noreferrer" className={styles.startBtn}>
                  {group.cta} ↗
                </a>
              </div>
            ))}
          </div>
          <p className={styles.kuetuNote} dangerouslySetInnerHTML={{ __html: txt.kuetu.note }} />
        </div>
      </section>

      {/* ── LEGAL ── */}
      <section id="legal" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Legal</div>
          <h2 className={styles.sectionTitle}>{txt.legal.title}</h2>
          <p className={styles.sectionSub}>{txt.legal.sub}</p>
          <div className={styles.legalGrid}>
            {txt.legal.items.map((item) => (
              <a key={item.label} href={item.url} className={styles.legalCard}>
                <span className={styles.legalIcon}>📄</span>
                <span>{item.label}</span>
                <span className={styles.legalArrow}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Contact</div>
          <h2 className={styles.sectionTitle}>{txt.contact.title}</h2>
          <p className={styles.sectionSub}>{txt.contact.sub}</p>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>{txt.contact.general}</div>
              <div className={styles.copyRow}>
                <a href="mailto:contact@salelabongo.org" className={styles.contactEmail}>
                contact@salelabongo.org
              </a>
                <CopyButton text="contact@salelabongo.org" label={SOCIAL_TITLE[lang].copy} doneLabel={SOCIAL_TITLE[lang].copied} />
              </div>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>{txt.contact.apps_contact}</div>
              <div className={styles.copyRow}>
                <a href="mailto:jeuxdedames@salelabongo.org" className={styles.contactEmail}>
                jeuxdedames@salelabongo.org
              </a>
                <CopyButton text="jeuxdedames@salelabongo.org" label={SOCIAL_TITLE[lang].copy} doneLabel={SOCIAL_TITLE[lang].copied} />
              </div>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>DarAkili</div>
              <div className={styles.copyRow}>
                <a href="mailto:darakili@salelabongo.org" className={styles.contactEmail}>
                darakili@salelabongo.org
              </a>
                <CopyButton text="darakili@salelabongo.org" label={SOCIAL_TITLE[lang].copy} doneLabel={SOCIAL_TITLE[lang].copied} />
              </div>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>Yebela</div>
              <div className={styles.copyRow}>
                <a href="mailto:contact@yebela.store" className={styles.contactEmail}>
                contact@yebela.store
              </a>
                <CopyButton text="contact@yebela.store" label={SOCIAL_TITLE[lang].copy} doneLabel={SOCIAL_TITLE[lang].copied} />
              </div>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>DoubleVoix</div>
              <div className={styles.copyRow}>
                <a href="mailto:doublevoix@salelabongo.org" className={styles.contactEmail}>
                doublevoix@salelabongo.org
              </a>
                <CopyButton text="doublevoix@salelabongo.org" label={SOCIAL_TITLE[lang].copy} doneLabel={SOCIAL_TITLE[lang].copied} />
              </div>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>Kuetu</div>
              <div className={styles.copyRow}>
                <a href="mailto:kuetu@salelabongo.org" className={styles.contactEmail}>
                kuetu@salelabongo.org
              </a>
                <CopyButton text="kuetu@salelabongo.org" label={SOCIAL_TITLE[lang].copy} doneLabel={SOCIAL_TITLE[lang].copied} />
              </div>
            </div>
          </div>

          <div className={styles.blockTitle} style={{ marginTop: "3rem" }}>{SOCIAL_TITLE[lang].title}</div>
          <p className={styles.sectionSub}>{SOCIAL_TITLE[lang].sub}</p>
          <div className={styles.socialGrid}>
            {BRAND_NAMES.map((b) => (
              <div key={b.id} className={styles.socialCard}>
                <div className={styles.contactCardTitle}>{b.name}</div>
                <ul className={styles.socialList}>
                  {BRAND_SOCIALS[b.id].map((so) => (
                    <li key={so.network} className={styles.socialItem}>
                      <a href={so.url} target="_blank" rel="noopener noreferrer" className={styles.socialItemIcon} aria-label={NETWORK_LABEL[so.network]} draggable={false}>
                        <NetworkIcon network={so.network} size={16} />
                      </a>
                      <span className={styles.socialItemText}>
                        <span className={styles.socialItemNet}>{NETWORK_LABEL[so.network]}</span>
                        <span className={styles.socialItemHandle}>{so.handle}</span>
                      </span>
                      <CopyButton text={so.network === "whatsapp" ? WHATSAPP.display : so.url} label={SOCIAL_TITLE[lang].copy} doneLabel={SOCIAL_TITLE[lang].copied} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <Image src="/Rounded.png" alt="Salela Bongo Logo" width={24} height={24} className={styles.footerLogoImg} />
            <span>Salela Bongo LLC</span>
          </div>
          <p className={styles.footerCopy}>
            &copy; {year} Salela Bongo LLC — {txt.footer}
          </p>
          <div className={styles.footerLinks}>
            <a href="/legal/privacy">Privacy</a>
            <a href="/legal/terms">Terms</a>
            <a href="/legal/community-guidelines">Guidelines</a>
            <a href="/legal/data-deletion">Data Deletion</a>
            <a href="mailto:contact@salelabongo.org">Contact</a>
          </div>
          <SocialLinks />
        </div>
      </footer>
    </div>
  );
}

function AppleIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.05 12.53c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.61-1.7-3.18-1.73-1.35-.14-2.64.79-3.33.79-.69 0-1.75-.77-2.87-.75-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.74 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.14.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.3-3.5zM14.9 5.6c.6-.74 1.01-1.76.9-2.78-.87.04-1.93.58-2.56 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.58-1.21z" />
    </svg>
  );
}

/** Google Play triangle. `colored` uses the four brand colours; otherwise it inherits currentColor. */
function PlayIcon({ size = 15, colored = false }: { size?: number; colored?: boolean }) {
  if (!colored) {
    return (
      <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.6 1.84a1.5 1.5 0 0 0-.6 1.2v17.92a1.5 1.5 0 0 0 .6 1.2l.1.06 10.03-10.16v-.24L3.7 1.78l-.1.06zm13.47 6.74-2.68-2.72L4.9 1.03l12.17 7.55zm0 6.84 2.9-1.8c.86-.53.86-1.72 0-2.26l-2.9-1.8-2.9 2.93 2.9 2.93zM4.9 22.97l9.49-4.83 2.68-2.72-12.17 7.55z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#00d7fe" d="M3.6 1.84a1.5 1.5 0 0 0-.6 1.2v17.92a1.5 1.5 0 0 0 .6 1.2l.1.06 10.03-10.16v-.24L3.7 1.78l-.1.06z" />
      <path fill="#00f076" d="m17.07 8.58-2.68-2.72L3.7 1.78l.1-.06c.4-.2.9-.1 1.1.31l12.17 7.55z" />
      <path fill="#ff3a44" d="m17.07 15.42-12.17 7.55c-.2.4-.7.5-1.1.3l-.1-.05 10.69-10.84 2.68 3.04z" />
      <path fill="#ffd500" d="m17.07 15.42-2.68-2.72 2.68-2.72 2.9 1.8c.86.54.86 1.73 0 2.26l-2.9 1.38z" />
    </svg>
  );
}

function NetworkIcon({ network, size = 18 }: { network: Network; size?: number }) {
  const common = { width: size, height: size, fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": true } as const;
  switch (network) {
    case "facebook":
      return <svg {...common}><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>;
    case "instagram":
      return <svg {...common}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.822a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
    case "tiktok":
      return <svg {...common}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.62-.35 3.22-1.04 4.67-1.12 2.37-3.32 4.24-5.91 4.88-2.6.65-5.41.34-7.79-1.02-2.37-1.36-4.08-3.66-4.72-6.26-.64-2.6-.33-5.41 1.03-7.79 1.36-2.37 3.66-4.08 6.26-4.72 1.46-.35 2.99-.41 4.46-.17v4.06c-.85-.15-1.73-.1-2.55.15-1.5.46-2.78 1.54-3.46 2.92-.68 1.38-.72 3.01-.1 4.42.61 1.42 1.84 2.55 3.3 3.04 1.46.49 3.08.3 4.42-.49 1.34-.79 2.35-2.11 2.68-3.61.08-.34.12-.69.12-1.04V.02z"/></svg>;
    case "x":
      return <svg {...common}><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>;
    case "youtube":
      return <svg {...common}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
    case "threads":
      return <svg {...common}><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/></svg>;
    case "whatsapp":
      return <svg {...common}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
  }
}

/** Compact icon row used on each product card. */
function SocialIcons({ socials }: { socials: Social[] }) {
  return (
    <div className={styles.cardSocials}>
      {socials.map((so) => (
        <a
          key={so.network}
          href={so.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardSocial}
          aria-label={`${NETWORK_LABEL[so.network]} ${so.handle}`}
          title={`${NETWORK_LABEL[so.network]} — ${so.handle}`}
          draggable={false}
        >
          <NetworkIcon network={so.network} size={17} />
        </a>
      ))}
    </div>
  );
}

/** Small "Copy" button. Falls back to a hidden textarea where the async clipboard API is blocked. */
function CopyButton({ text, label, doneLabel }: { text: string; label: string; doneLabel: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* nothing more to try */ }
      document.body.removeChild(ta);
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 1600);
  };
  return (
    <button type="button" onClick={copy} className={styles.copyBtn} aria-label={`${label}: ${text}`}>
      {done ? doneLabel : label}
    </button>
  );
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={`${styles.socialLinks} ${className || ""}`}>
      <a href="https://www.facebook.com/SalelaBongo" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
      </a>
      <a href="https://www.instagram.com/salelabongo" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.822a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      </a>
      <a href="https://x.com/SalelaBongo" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="X (Twitter)">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
      </a>
      <a href="https://www.tiktok.com/@salelabongo" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="TikTok">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.62-.35 3.22-1.04 4.67-1.12 2.37-3.32 4.24-5.91 4.88-2.6.65-5.41.34-7.79-1.02-2.37-1.36-4.08-3.66-4.72-6.26-.64-2.6-.33-5.41 1.03-7.79 1.36-2.37 3.66-4.08 6.26-4.72 1.46-.35 2.99-.41 4.46-.17v4.06c-.85-.15-1.73-.1-2.55.15-1.5.46-2.78 1.54-3.46 2.92-.68 1.38-.72 3.01-.1 4.42.61 1.42 1.84 2.55 3.3 3.04 1.46.49 3.08.3 4.42-.49 1.34-.79 2.35-2.11 2.68-3.61.08-.34.12-.69.12-1.04V.02z"/></svg>
      </a>
    </div>
  );
}
