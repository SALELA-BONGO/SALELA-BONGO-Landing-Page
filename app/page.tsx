"use client";

import Image from "next/image";
import { storeLanguage } from "@/lib/legal";
import { useLegalLanguage } from "@/lib/useLegalLanguage";
import styles from "./page.module.css";

type Language = "fr" | "en" | "ln";

/** DarAkili's published listings. One place, because three language blocks and the
 *  download row in the DarAkili section all point at the same two URLs. */
const DARAKILI_STORES = {
  ios: "https://apps.apple.com/app/id6806669532",
  android: "https://play.google.com/store/apps/details?id=com.darakili.android",
};

const t = {
  fr: {
    nav: { about: "À propos", apps: "Nos Plateformes", contact: "Contact" },
    hero: {
      badge: "Salela Bongo LLC — « Utilise ton cerveau »",
      headline: "L'Afrique pense. L'Afrique crée. L'Afrique construit.",
      sub: "\"Salela Bongo\" signifie \"Utilise ton cerveau\" en Lingala. Tout comme les salles de sport forgent le corps, nous croyons que le cerveau doit être entraîné. Nous construisons des plateformes numériques par des Africains, pour des Africains — dans les langues de l'Afrique, avec le cœur de l'Afrique.",
      cta: "Découvrir nos plateformes",
      ctaSub: "Nous contacter",
    },
    mission: {
      title: "Notre Mission",
      quote: "Le monde a des salles de sport pour le corps — nous construisons des gymnases pour l'intelligence africaine.",
      paragraphs: [
        "Salela Bongo LLC est née d'une conviction simple et puissante : l'intelligence africaine mérite des outils à sa hauteur. Notre nom, \"Salela Bongo\", est un appel en Lingala — \"Utilise ton cerveau\" — un cri de ralliement pour chaque Africain et chaque membre de la diaspora qui refuse de rester spectateur dans la révolution numérique.",
        "Nous sommes plus qu'une plateforme de développement. Nous forgeons des espaces où l'intelligence africaine peut s'exercer, apprendre, jouer et entreprendre — en français, en anglais et en lingala. Comme Masakhane (\"Nous construisons ensemble\"), nous croyons que l'avenir technologique de l'Afrique sera bâti par ceux qui comprennent son contexte, parlent ses langues et portent sa culture dans leur code.",
        "Le sport nourrit le corps. Nous nourrissons l'intelligence. Chaque partie de dames jouée, chaque cours suivi, chaque boutique créée sur nos plateformes est un exercice intellectuel — un pas de plus vers une Afrique qui pense, innove et domine le numérique.",
        "Aujourd'hui, alors que le monde se concentre massivement sur l'entraînement de grands modèles d'intelligence artificielle (IA) et de grands modèles linguistiques (LLM), nous croyons qu'il faut d'abord entraîner le jeune cerveau africain. L'Afrique a la population la plus jeune du monde, avec un âge médian d'environ 19 ans. D'ici 2050, le continent sera le principal moteur de la croissance démographique mondiale, ce qui signifie que l'avenir du monde est intrinsèquement lié au développement intellectuel de la jeunesse africaine. (<a href=\"https://population.un.org/wpp/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #60a5fa; text-decoration: underline;\">Réf : Perspectives de la population mondiale des Nations Unies</a>)",
      ],
    },
    about: {
      title: "Qui sommes-nous",
      desc1: "Salela Bongo LLC est une société de technologie enregistrée aux États-Unis, fondée par des Africains passionnés qui comprennent les réalités, les langues et les aspirations du continent. Nous concevons des solutions et plateformes numériques pour l'Afrique et sa diaspora.",
      desc2: "Nous ne sommes pas une entreprise qui regarde l'Afrique de loin — nous sommes l'Afrique. Nous parlons ses langues, nous vivons son contexte, et nous codons ses solutions. Chaque produit que nous créons est culturellement ancré, multilingue et pensé pour les réalités africaines.",
      items: [
        { icon: "🧠", label: "Philosophie", value: "Salela Bongo — Utilise ton cerveau" },
        { icon: "🌍", label: "Marchés cibles", value: "Afrique & Diaspora" },
        { icon: "📱", label: "Plateformes", value: "iOS · Android · Web" },
        { icon: "🗣️", label: "Langues", value: "FR · EN · Lingala" },
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
          tag: "Web · iOS & Android · À venir",
          color: "#3b82f6",
          desc: "Plateforme de jeu de dames en ligne avec variantes congolaise, internationale et américaine. Jeux en temps réel, chat, abonnement premium et profils utilisateurs.",
          features: ["Jeu en temps réel", "3 variantes de jeu", "Abonnement Premium", "iOS & Android"],
          url: "https://jeuxdedames.africa",
        },
        {
          id: "doublevoix",
          logo: "/logo-doublevoix.png",
          name: "DoubleVoix",
          domain: "www.doublevoix.com",
          tag: "Web · IA · iOS & Android bientôt",
          color: "#f97316",
          desc: "Anciennement CBD — Doublage Bilingue Consécutif (cbd.salelabongo.org). Interprétation consécutive pour n'importe quelle vidéo : l'orateur est entendu dans ses propres mots, puis une voix d'interprète rend chaque passage dans votre langue — le rythme d'un interprète en salle, pas un doublage par-dessus. Collez un lien ou téléversez un fichier ; la première minute est offerte.",
          features: ["Anglais, Français, Espagnol, Swahili, Allemand", "Source en Lingala reconnue", "Sous-titres .srt inclus", "Musique de fond retirée"],
          url: "https://www.doublevoix.com",
          soon: "Applications iOS & Android — bientôt disponibles",
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
      downloadText: "L'application DarAkili est publiée sur l'App Store et sur Google Play. Toute la plateforme tient dans le téléphone : suivre un cours hors du navigateur, reprendre une leçon là où le web l'avait laissée, voir son classement par ville et par pays, payer ou parrainer un cours en mobile money, et recevoir une notification quand un cours suivi est mis à jour. Un seul compte DarAkili pour le web, iOS et Android.",
      iosLabel: "Télécharger sur l'App Store",
      androidLabel: "Disponible sur Google Play",
    },
    doublevoix: {
      label: "DoubleVoix · doublevoix.com",
      title: "L'idée derrière DoubleVoix",
      renameNote: "Anciennement <strong>CBD — Doublage Bilingue Consécutif</strong>, hébergé sur cbd.salelabongo.org. Le projet porte désormais son propre nom et sa propre adresse : <a href=\"https://www.doublevoix.com\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #fb923c; text-decoration: underline;\">www.doublevoix.com</a>. Deux voix, une seule vidéo.",
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
      soonTitle: "Sur mobile, bientôt",
      soonText: "Les applications natives iOS et Android de DoubleVoix arrivent : même service, même compte, dans votre poche — coller un lien, suivre l'avancement du traitement, recevoir une notification quand la vidéo est prête, puis la partager. <strong>Bientôt disponibles</strong> sur l'App Store et sur Google Play.",
      soonIos: "App Store — bientôt",
      soonAndroid: "Google Play — bientôt",
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
          title: "Coordinateurs de projet & clients",
          subtitle: "Portail : kuetu.salelabongo.org",
          steps: [
            "Écrivez-nous avec votre langue cible, le type de tâches et le volume visé : nous ouvrons votre espace client et votre premier projet.",
            "Déposez vos données, puis définissez le schéma d'étiquettes, les consignes et la rémunération du projet.",
            "Générez les invitations : chaque code est à usage unique, révocable et traçable — ou un code unique partagé pour une diffusion WhatsApp, quand la vitesse prime sur le contrôle.",
            "Suivez la qualité — double annotation, règle des deux voix concordantes sur trois, relecture par des réviseurs, recours de l'annotateur — puis exportez le jeu de données annoté.",
          ],
          cta: "Voir kuetu.salelabongo.org",
          ctaUrl: "https://kuetu.salelabongo.org",
        },
      ],
      note: "Kuetu est en phase pilote : l'inscription des annotateurs se fait sur invitation et les premiers projets se configurent avec notre équipe. Écrivez à <a href=\"mailto:kuetu@salelabongo.org\" style=\"color: #a78bfa; text-decoration: underline;\">kuetu@salelabongo.org</a> pour ouvrir un projet ou rejoindre le vivier d'annotateurs.",
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
      sub: "Pour toute question professionnelle, partenariat ou demande presse.",
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
    },
    mission: {
      title: "Our Mission",
      quote: "The world has gyms for the body — we are building gyms for the African mind.",
      paragraphs: [
        "Salela Bongo LLC was born from a simple yet powerful conviction: African intelligence deserves tools built to match. Our name, \"Salela Bongo\", is a rallying cry in Lingala — \"Use Your Brain\" — a call to every African and every member of the diaspora who refuses to be a spectator in the digital revolution.",
        "We are more than just software builders. We forge spaces where the African mind can exercise, learn, play, and build businesses — in French, English, and Lingala. Like Masakhane (\"We build together\"), we believe Africa's technological future will be shaped by those who understand its context, speak its languages, and carry its culture in their code.",
        "Sports nourish the body. We nourish the mind. Every checkers game played, every course completed, every shop created on our platforms is an intellectual workout — one more step toward an Africa that thinks, innovates, and leads in the digital age.",
        "Today, as the world focuses heavily on training big AI models and Large Language Models (LLMs), we believe in training the younger African mind first. Africa has the youngest population in the world, with a median age of approximately 19 years old. By 2050, the continent will be the primary driver of global population growth, meaning the future of the world is inherently tied to the intellectual development of African youth. (<a href=\"https://population.un.org/wpp/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #60a5fa; text-decoration: underline;\">Ref: United Nations World Population Prospects</a>)",
      ],
    },
    about: {
      title: "Who We Are",
      desc1: "Salela Bongo LLC is a US-registered technology company founded by passionate Africans who understand the continent's realities, languages, and aspirations. We design digital solutions and platforms for Africa and its diaspora.",
      desc2: "We are not a company looking at Africa from afar — we are Africa. We speak its languages, we live its context, and we code its solutions. Every product we build is culturally rooted, multilingual, and designed for African realities.",
      items: [
        { icon: "🧠", label: "Philosophy", value: "Salela Bongo — Use Your Brain" },
        { icon: "🌍", label: "Target Markets", value: "Africa & Diaspora" },
        { icon: "📱", label: "Platforms", value: "iOS · Android · Web" },
        { icon: "🗣️", label: "Languages", value: "FR · EN · Lingala" },
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
          tag: "Web · iOS & Android · Coming Soon",
          color: "#3b82f6",
          desc: "Online checkers platform with Congolese, International and American variants. Real-time gameplay, in-game chat, premium subscription and user profiles.",
          features: ["Real-time play", "3 game variants", "Premium subscription", "iOS & Android"],
          url: "https://jeuxdedames.africa",
        },
        {
          id: "doublevoix",
          logo: "/logo-doublevoix.png",
          name: "DoubleVoix",
          domain: "www.doublevoix.com",
          tag: "Web · AI · iOS & Android coming soon",
          color: "#f97316",
          desc: "Formerly CBD — Consecutive Bilingual Dubbing (cbd.salelabongo.org). Consecutive interpretation for any video: the speaker is heard in their own words, then an interpreter voices each passage in your language — the rhythm of a live interpreter, not a dub over the top. Paste a link or upload a file; the first minute is free.",
          features: ["English, French, Spanish, Swahili, German", "Understands Lingala source", "Subtitles (.srt) included", "Background music removed"],
          url: "https://www.doublevoix.com",
          soon: "iOS & Android apps — available soon",
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
      downloadText: "The DarAkili app is published on the App Store and on Google Play. The whole platform fits in the phone: take a course outside the browser, pick a lesson up where the web left it, watch your standing on the city and country leaderboards, pay for or sponsor a course with mobile money, and get a notification when a course you follow is updated. One DarAkili account across web, iOS and Android.",
      iosLabel: "Download on the App Store",
      androidLabel: "Get it on Google Play",
    },
    doublevoix: {
      label: "DoubleVoix · doublevoix.com",
      title: "The Idea Behind DoubleVoix",
      renameNote: "Formerly <strong>CBD — Consecutive Bilingual Dubbing</strong>, hosted at cbd.salelabongo.org. The project now carries its own name and its own address: <a href=\"https://www.doublevoix.com\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #fb923c; text-decoration: underline;\">www.doublevoix.com</a>. Two voices, one video.",
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
      soonTitle: "On mobile, soon",
      soonText: "Native iOS and Android apps for DoubleVoix are on the way: the same service and the same account, in your pocket — paste a link, follow the processing, get a notification when the video is ready, then share it. <strong>Available soon</strong> on the App Store and Google Play.",
      soonIos: "App Store — soon",
      soonAndroid: "Google Play — soon",
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
          title: "Project coordinators & customers",
          subtitle: "Portal: kuetu.salelabongo.org",
          steps: [
            "Write to us with your target language, the task types and the volume you need: we open your customer workspace and your first project.",
            "Bring your data in, then define the label schema, the instructions and what the project pays.",
            "Mint the invites: each code is single-use, revocable and individually auditable — or one shared code for a WhatsApp broadcast, when speed matters more than control.",
            "Watch quality — double annotation, the two-matching-votes-out-of-three rule, reviewer adjudication, annotator appeals — then export the labelled dataset.",
          ],
          cta: "Visit kuetu.salelabongo.org",
          ctaUrl: "https://kuetu.salelabongo.org",
        },
      ],
      note: "Kuetu is in pilot: annotators join by invitation and the first projects are set up with our team. Write to <a href=\"mailto:kuetu@salelabongo.org\" style=\"color: #a78bfa; text-decoration: underline;\">kuetu@salelabongo.org</a> to open a project or to join the annotator pool.",
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
      sub: "For professional inquiries, partnerships, or press requests.",
      general: "General inquiries",
      apps_contact: "Platform support",
    },
    footer: "All rights reserved",
  },
  ln: {
    nav: { about: "Ntina", apps: "Plateformes na Biso", contact: "Toyebana" },
    hero: {
      badge: "Salela Bongo LLC — « Salelá Bongo na yo »",
      headline: "Afrika ekanisi. Afrika esali. Afrika etongi.",
      sub: "\"Salela Bongo\" elakisi \"Salelá bongo na yo\" na Lingala. Ndenge ba salle ya sport elendisaka nzoto, biso tondimi ete bongo esengeli kolendisama. Totongaka ba plateformes numériques na ba Africains, mpo na ba Africains — na minoko ya Afrika, na motema ya Afrika.",
      cta: "Tala plateformes na biso",
      ctaSub: "Toyebana",
    },
    mission: {
      title: "Mission na Biso",
      quote: "Mokili ezali na ba salle ya sport mpo na nzoto — biso tozali kotonga ba gymnase mpo na makanisi ya Afrika.",
      paragraphs: [
        "Salela Bongo LLC ebotamaki na kondima moko ya nguya: bwanya ya Afrika esengeli na bisaleli oyo etongamaki mpo na yango. Nkombo na biso, \"Salela Bongo\", ezali loyembo ya libundeli na Lingala — \"Salelá bongo na yo\" — ebeleli mpo na moto nyonso ya Afrika mpe ya diaspora oyo aboyi kozala kaka motaleli na révolution ya numérique.",
        "Totongaka kaka ba logiciels te. Totongaka bisika epai makanisi ya Afrika ekoki komimesa, koyekola, kosakana mpe kotonga mombongo — na Français, Anglais mpe Lingala. Lokola Masakhane (\"Totonga nzela moko\"), tondimi ete mikolo ya lobi ya teknolojia ya Afrika ekosalemama na baoyo bayebi contexte na yango, balobaka minoko na yango mpe bamemaka culture na yango na code na bango.",
        "Sport eleisaka nzoto. Biso toleisaka makanisi. Masano nionso ya dames oyo esakanami, cours nionso oyo elandamaki, boutique nionso oyo esalemaki na plateformes na biso ezali exercice ya bwanya — etape mosusu mpo na Afrika oyo ekanisaka, esalaka mpe etambwisaka na numérique.",
        "Lelo oyo, ntango mokili mobimba ezali kotia likebi na kolendisa ba modèles ya minene ya Intelligence Artificielle (IA) mpe ba modèles linguistiques (LLM), biso tondimi ete esengeli naino kolendisa bongo ya bilenge ya Afrika. Afrika ezali na population oyo eleki bilenge na mokili mobimba, na âge médian ya mibu 19. Tii na mobu 2050, continent ekokóma moteur ya liboso ya bokoli ya population na mokili, yango elakisi ete mikolo ezali koya ya mokili ekangami na bokoli ya mayele ya bilenge ya Afrika. (<a href=\"https://population.un.org/wpp/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #60a5fa; text-decoration: underline;\">Réf : Perspectives ya Population ya Mokili ya Nations Unies</a>)",
      ],
    },
    about: {
      title: "Biso tozali banani",
      desc1: "Salela Bongo LLC ezali société ya teknolojia eregistrée na États-Unis, etongamaki na ba Africains ya motema oyo bayebi réalités, minoko mpe biloto ya continan. Tosalaka ba solutions mpe plateformes ya numérique mpo na Afrika mpe diaspora na yango.",
      desc2: "Tozali société oyo etalaka Afrika ya mosika te — tozali Afrika yango moko. Tolobaka minoko na yango, tovandaka na contexte na yango, mpe tosalaka ba solutions na yango. Eloko nionso oyo totongaka ezali ya culture ya Afrika, multilingue mpe esalama mpo na réalités ya Afrika.",
      items: [
        { icon: "🧠", label: "Philosophie", value: "Salela Bongo — Salelá bongo na yo" },
        { icon: "🌍", label: "Ba marchés", value: "Afrika & Diaspora" },
        { icon: "📱", label: "Plateformes", value: "iOS · Android · Web" },
        { icon: "🗣️", label: "Minoko", value: "FR · EN · Lingala" },
        { icon: "✉️", label: "Contact", value: "contact@salelabongo.org" },
      ],
    },
    apps: {
      title: "Plateformes na Biso",
      sub: "Biloko mitano — commitment moko ya malamu.",
      list: [
        {
          id: "darakili",
          logo: "/logo-darakili.png",
          name: "DarAkili",
          domain: "darakili.com",
          tag: "Web · iOS · Android · Ezali sikoyo",
          color: "#10b981",
          desc: "DarAkili — nkombo oyo esangisi Daraja (\"Gbagba\") mpe Akili (\"Mayele\") na Swahili — yango elakisi \"Gbagba ya Mayele\". Plateforme ya koyekola online esalama mpo na Afrika — ba cours esalami na ba Africains, classements ya locale, mobile money. Application ya iPhone mpe ya Android ebimi sikoyo : compte moko, progression moko na web.",
          features: ["Ba cours ya ofele", "Classements locale", "Sponsor cours", "Mobile Money", "App iOS & Android"],
          url: "https://darakili.com",
          stores: DARAKILI_STORES,
        },
        {
          id: "yebela",
          logo: "/logo-yebela.png",
          name: "Yebela Store",
          domain: "yebela.store",
          tag: "Web · PWA",
          color: "#f59e0b",
          desc: "Catalogue ya commerce online ya seko mpo na ba entrepreneur ya Afrika. Sala boutique na miniti mibale, tinda link mpe teka na mokili mobimba.",
          features: ["Boutique na miniti 2", "WhatsApp", "Mobile Money", "PWA"],
          url: "https://yebela.store",
        },
        {
          id: "jeuxdedames",
          logo: "/logo-jeuxdedames.png",
          logoBg: true,
          name: "Jeux de Dames",
          domain: "jeuxdedames.africa",
          tag: "Web · iOS & Android · Ekoya",
          color: "#3b82f6",
          desc: "Plateau ya jeu de dames online na variantes ya Congo, Internationale mpe Américaine. Jeu ya temps réel, chat, abonnement premium mpe profils.",
          features: ["Jeu ya temps réel", "Variantes 3", "Premium", "iOS & Android"],
          url: "https://jeuxdedames.africa",
        },
        {
          id: "doublevoix",
          logo: "/logo-doublevoix.png",
          name: "DoubleVoix",
          domain: "www.doublevoix.com",
          tag: "Web · IA · iOS & Android ekoya",
          color: "#f97316",
          desc: "Liboso ezalaki CBD — Bodoublage Bilingue (cbd.salelabongo.org). Bobongoli ya maloba mpo na vidéo nionso : moteyi ayokani na maloba na ye moko, na sima mongala abongoli eteni moko na moko na monoko na yo — lokola interprète ya solo na ndako, kasi doublage te. Tinda link to téléverse fichier ; miniti ya liboso ezali ofele.",
          features: ["Anglais, Français, Espagnol, Swahili, Allemand", "Eyebi Lingala lokola source", "Sous-titres .srt", "Musique ya nsima elongolami"],
          url: "https://www.doublevoix.com",
          soon: "Ba applications iOS & Android — ekoya nokinoki",
        },
        {
          id: "kuetu",
          logo: "/logo-kuetu.png",
          name: "Kuetu",
          domain: "kuetu.salelabongo.org",
          tag: "Telegram · Web · IA · Pilote",
          color: "#8b5cf6",
          desc: "Plateforme ya kotia ba étiquettes na ba données ya minoko ya Afrika, mosala nionso esalemaka kaka na lisolo ya Telegram : ba cartes ya mosala na ba boutons, ba notes vocales, kobongisa na tap moko. Ba sociétés mpe ba chercheurs basalelaka portail ya web mpo na ba projets, ba données mpe ba exports ; moto oyo azali kotia étiquettes asengeli kaka na bot @KuetuBot.",
          features: ["Nionso na kati ya Telegram", "Lifuti na mobile money", "Consentement na envoi moko na moko", "Portail ya ba projets & exports"],
          url: "https://kuetu.salelabongo.org",
        },
      ],
    },
    darakili: {
      label: "DarAkili · Gbagba ya Mayele",
      title: "Emoniseli mpe Mposa ya DarAkili",
      nameTitle: "Ndimbola ya DarAkili",
      words: [
        { word: "Daraja", meaning: "Gbagba", detail: "(mpe: Niveau, Kelasi, Matambe ya escalier)" },
        { word: "Akili", meaning: "Mayele", detail: "(mpe: Bwanya, Makanisi, Bongo)" },
      ],
      portmanteau: "Soki tosangisi maloba yango mibale mpo na kobimisa DarAkili, ememi ndimbola ya mozindo ya kokangisa makanisi, kosilisa bozangi boyebi, mpe kofungola nzela ya kopesa mayele mpe bososoli mpo na bato nionso.",
      visionTitle: "Emoniseli na Biso: Kotinda Boyebi (Remittance ya Mayele)",
      paragraphs: [
        "Banda bambula ebele, misala ya kotinda mbongo (remittances) nde ezalaki gbagba monene oyo ekangisaki bana ya diaspora na ba oyo bazali na continent ya Afrika, mpo na kotinda mosolo ya kosunga mabota mpe kotonga mboka.",
        "Atako mbongo ezali na ntina, bozwi ya solosolo ezali na kati ya bongo. Lelo oyo, tolingi kotinda biloko oyo eleki mbongo na nguya. Na nzela ya DarAkili, tozali kobimisa lolenge ya sika ya botindi: <strong>kotinda mpe kokabola boyebi</strong>.",
        "Mokano na biso ya monene ezali ya kosangisa bana ya Afrika ya mokili mobimba bango na bango — mpo bákabola mayele, makoki, mpe bwanya, na nzela ya mikolo mpe minoko nyonso. Tondimi ete mayele ya bana ya Afrika esengeli kotambola ofele na mokili mobimba. Ngonga ekoki — <em>Salela Bongo</em> — mpo na kokabola boyebi, kosangisa makanisi, mpe kotombola mayele na biso nionso.",
      ],
      downloadTitle: "Ezali sikoyo na iPhone mpe na Android",
      downloadText: "Application ya DarAkili ebimi na App Store mpe na Google Play. Plateforme mobimba ekoti na telefone : kolanda cours na kozanga navigateur, kokoba leçon esika web etikaki yango, kotala classement na yo na engumba mpe na mboka, kofuta to kosunga cours na mobile money, mpe kozwa notification tango cours oyo ozali kolanda ebongisami. Compte moko ya DarAkili mpo na web, iOS mpe Android.",
      iosLabel: "Kozwa na App Store",
      androidLabel: "Kozwa na Google Play",
    },
    doublevoix: {
      label: "DoubleVoix · doublevoix.com",
      title: "Likanisi oyo ezali nsima ya DoubleVoix",
      renameNote: "Liboso ezalaki <strong>CBD — Bodoublage Bilingue Consécutif</strong>, na cbd.salelabongo.org. Sikoyo projet ezali na nkombo na yango moko mpe adresse na yango moko : <a href=\"https://www.doublevoix.com\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #fb923c; text-decoration: underline;\">www.doublevoix.com</a>. Mingongo mibale, vidéo moko.",
      howTitle: "Rythme ya interprète, esalemi lisusu",
      steps: [
        { n: "1", text: "Moteyi azali koloba — mongongo na ye, maloba na ye, ebongwani te." },
        { n: "2", text: "Atelemi. Kimia ya solo : ngonga oyo interprète azwaka nzela." },
        { n: "3", text: "Mongongo ya interprète ebongoli eteni yango na monoko na yo, likolo ya elilingi oyo etelemi mpe badge ya monoko." },
        { n: "4", text: "Moteyi akobi lisusu. Mpe bongo tii na nsuka." },
      ],
      paragraphs: [
        "Na ndako ya Nzambe na Kinshasa, na conférence to na likita ya libota, interprète alobaka likolo ya moteyi te : azelaka tour na ye. Moteyi apesi likanisi, atelemi, interprète abongoli yango na monoko mosusu, na sima moteyi akobi. DoubleVoix esali kaka rythme wana, yango moko, mpo na vidéo nionso.",
        "Yango nde ekesenisi yango na doublage ya momesano. Doublage elongolaka mongongo ya liboso mpe esengeli kokotisa bobongoli na kati ya ngonga kaka oyo ya original : mongongo ekimaka mbangu, ndimbola ekweyaka. DoubleVoix ezali <strong>ya kobakisa</strong> — original etikali ndenge ezalaki, bobongoli ezwi ngonga na yango moko, mpe vidéo ya nsuka ezali molai mbala mibale. Contrainte ya synchronisation esili, mpe mongongo ya interprète ezwi pema.",
        "Kimia ezali détail ya montage te. Soki ezali te, vidéo elongwaka na moteyi kokende na bobongoli lokola coupe ya makasi ; soki ezali, oyokaka ndako oyo ezali kozela interprète na yango.",
        "Mpo na banani ? Masakoli mpe mateya, ba conférences mpe ba formations, ba témoignages, biloko ya diaspora — nionso oyo esengeli koyokana koleka monoko oyo elobamaki na yango. Tinda link (YouTube, Facebook, Instagram, TikTok, X…) to téléverse fichier, pona monoko, mpe miniti ya liboso ezongi ebongolami, ofele.",
        "Minoko mitano ya bokomi tii lelo — Anglais, Français, Espagnol, Swahili, Allemand — mpe likambo ya ntina : <strong>Lingala eyebani lokola monoko ya source</strong>, kaka lolenge ya monoko oyo bisaleli ya mombongo etikaka pembeni. Bobongoli nionso ekoki kotangama mpe kobongisama liboso mongongo esalema, sous-titres .srt ezali elongo na vidéo ya nsuka, mpe musique ya nsima ekoki kolongolama mpe kozongisama mpo kaka maloba ebongolama.",
      ],
      soonTitle: "Na telefone, nokinoki",
      soonText: "Ba applications ya solo ya iOS mpe Android ya DoubleVoix ezali koya : service moko, compte moko, na poche na yo — kotinda link, kolanda mosala, kozwa notification tango vidéo esili, mpe kokabola yango. <strong>Ekoya nokinoki</strong> na App Store mpe na Google Play.",
      soonIos: "App Store — nokinoki",
      soonAndroid: "Google Play — nokinoki",
      contactLabel: "Contact DoubleVoix",
      contactEmail: "doublevoix@salelabongo.org",
    },
    kuetu: {
      label: "Kuetu · kuetu.salelabongo.org",
      title: "Kuetu — IA ekoyekola minoko na biso yango moko te",
      paragraphs: [
        "Ba modèles minene ya intelligence artificielle balobaka Lingala, Tshiluba mpe Kikongo malamu te to balobaka ata moke te, mpe bazali kaka pene-pene na Swahili. Ezali te mpo minoko yango ezali na bozwi te : ezali mpo ba données oyo etiami ba étiquettes mpo na kolakisa yango ezali te. Mpe ba données yango ekoki kouta kaka na esika moko — bato oyo balobaka minoko yango mikolo nionso.",
        "<strong>Kuetu</strong> ezali plateforme oyo epesi bango mosala yango, mpe efutaka bango mpo na yango. Ba sociétés, ba laboratoires mpe ba chercheurs batiaka ba données na bango ; ba Africains batiaka ba étiquettes, bazali koenregistrer, kobongola mpe kotala soki ezali malamu ; export ezongi ebongi mpo na kolakisa modèle.",
        "Moto oyo ayebi Lingala malamu koleka ezali te noki moto oyo ayebi kosalela tableur to interface ya annotation ya ba professionnels. Azali na telefone Android ya ntalo moke, ba données ya mobile oyo ezali ntalo makasi, mpe Telegram esili kozala na telefone na ye. Yango wana <strong>na kati ya Telegram</strong> nde Kuetu etii mosala nionso : ba cartes ya mosala na ba boutons, ba notes vocales, kobongisa na tap moko. Eloko ya kotia te, eloko ya koyekola te, mpe données ya moke penza.",
        "<strong>WhatsApp esalelamaka kaka mpo na kobenga bato, koyamba, koyebisa mpe kosunga</strong> — ata mokolo moko te mpo na kozwa eyano, étiquette to fichier. Mibeko ya Meta epekisi kosalela ba données oyo ezwami na ba API na yango mpo na kolakisa modèle to kopesa yango na bato mosusu ; na Kuetu wana ezali elaka ya page te kasi mobeko oyo ba tests automatiques bazali kotala, mpe message nionso ya WhatsApp ememaka na bot ya Telegram.",
        "Bosembo ezali bilamba ya kolatisa te. Consentement esengamaka lisusu <strong>na envoi moko na moko</strong>, kaka na inscription te. Kobanda na lisolo, moto oyo azali kosala akoki kotala mbongo na ye, kotelemela évaluation, kobongola monoko, kopema, kolongola consentement to kosenga ete ba données na ye elongolama. Lifuti ekendaka na mobile money, na numéro oyo epesamaki na Telegram — ata moke te na WhatsApp.",
      ],
      taskTitle: "Mosala nini esalemaka kuna",
      tasks: [
        "Kokabola ba textes na ba classes",
        "Kopona kati ya biyano mibale",
        "Kotala soki enregistrement ezali malamu",
        "Kotanga na mongongo makasi",
        "Kobongola na kokoma",
        "Kotanga lisusu & kokata likambo",
      ],
      startTitle: "Ndenge ya kobanda",
      groups: [
        {
          id: "annotators",
          title: "Batie ba étiquettes & batali",
          subtitle: "Bot ya Telegram : @KuetuBot",
          steps: [
            "Fungola <strong>t.me/KuetuBot</strong> na Telegram mpe tinda <strong>/start</strong>.",
            "Pona monoko na yo (English, Français, Kiswahili), ndima consentement, pesa mwa ba informations ya profil, na sima kabola numéro na yo na bouton moko. Miniti moko nionso.",
            "Mpo na kozwa mosala, esengeli link ya invitation ya projet — <strong>t.me/KuetuBot?start=CODE-NA-YO</strong> — oyo coordinateur atindeli yo : tap moko ekotisi yo na projet.",
            "Tinda <strong>/task</strong> mpo na kozwa carte, yanola na bouton to na note vocale, mpe kobanda lisusu. Mpe ntango nionso : /earnings (mbongo), /history (ba envois), /review mpe /appeal (kotelemela évaluation), /language, /pause, /revoke, /deletemydata, /help.",
          ],
          cta: "Fungola @KuetuBot",
          ctaUrl: "https://t.me/KuetuBot",
        },
        {
          id: "coordinators",
          title: "Ba coordinateurs ya projet & ba clients",
          subtitle: "Portail : kuetu.salelabongo.org",
          steps: [
            "Komela biso na monoko oyo olingi, lolenge ya mosala mpe motango oyo osengeli na yango : tofungoli espace na yo ya client mpe projet na yo ya liboso.",
            "Tia ba données na yo, na sima pesa schéma ya ba étiquettes, ba consignes mpe lifuti ya projet.",
            "Bimisa ba invitations : code moko na moko ezali mpo na moto moko, ekoki kolongolama mpe kotangama — to code moko ya kokabola mpo na broadcast ya WhatsApp, tango mbangu eleki ntina na contrôle.",
            "Landa qualité — annotation mbala mibale, mobeko ya mingongo mibale oyo eyokani na misato, botali ya ba réviseurs, appel ya moto oyo asalaki — na sima bimisa export ya ba données oyo etiami ba étiquettes.",
          ],
          cta: "Tala kuetu.salelabongo.org",
          ctaUrl: "https://kuetu.salelabongo.org",
        },
      ],
      note: "Kuetu ezali na etape ya pilote : bato batiaka ba étiquettes bakotaka na invitation, mpe ba projets ya liboso ebongisamaka elongo na équipe na biso. Komela <a href=\"mailto:kuetu@salelabongo.org\" style=\"color: #a78bfa; text-decoration: underline;\">kuetu@salelabongo.org</a> mpo na kofungola projet to mpo na kokota na lisanga ya batie ba étiquettes.",
    },
    legal: {
      title: "Conformité & Légal",
      sub: "Ba politique ya entreprise mpo na ba plateformes nionso ya Salela Bongo LLC.",
      items: [
        { label: "Politique ya Confidentialité", url: "/legal/privacy" },
        { label: "Conditions ya Kosalela", url: "/legal/terms" },
        { label: "Règles ya Communauté", url: "/legal/community-guidelines" },
        { label: "Suppression ya Data", url: "/legal/data-deletion" },
      ],
    },
    contact: {
      title: "Toyebana",
      sub: "Mpo na mituna ya professionnel, partenariat to presse.",
      general: "Mituna ya général",
      apps_contact: "Support plateformes",
    },
    footer: "Makoki nionso ebatelami",
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
            {(["fr", "en", "ln"] as Language[]).map((l) => (
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
        <div className={styles.heroBadge}>{txt.hero.badge}</div>
        <h1 className={styles.heroHeadline}>{txt.hero.headline}</h1>
        <p className={styles.heroSub}>{txt.hero.sub}</p>
        <div className={styles.heroCTAs}>
          <a href="#apps" className={styles.btnPrimary}>{txt.hero.cta}</a>
          <a href="#contact" className={styles.btnGhost}>{txt.hero.ctaSub}</a>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.stat}><span className={styles.statNum}>5</span><span className={styles.statLabel}>Plateformes</span></div>
          <div className={styles.statDivider} />
          <div className={styles.stat}><span className={styles.statNum}>3</span><span className={styles.statLabel}>Langues</span></div>
          <div className={styles.statDivider} />
          <div className={styles.stat}><span className={styles.statNum}>50+</span><span className={styles.statLabel}>Pays</span></div>
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
            {txt.apps.list.map((app) => (
              <div
                key={app.id}
                className={styles.appCardWrap}
                style={{ "--app-color": app.color } as React.CSSProperties}
              >
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.appCard}
              >
                <div className={styles.appCardHeader}>
                  <div className={`${styles.appLogoWrap} ${"logoBg" in app && app.logoBg ? styles.appLogoWhiteBg : ""}`}>
                    <Image src={app.logo} alt={app.name} width={56} height={56} className={styles.appLogo} />
                  </div>
                  <div className={styles.appHeaderInfo}>
                    <div className={styles.appName}>{app.name}</div>
                    <span className={styles.appDomain}>{app.domain} ↗</span>
                  </div>
                </div>
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
                <span className={styles.appCTA}>
                  Visiter {app.domain} ↗
                </span>
              </a>
              {/* Store buttons live OUTSIDE the card anchor — a link inside a link is
                  invalid HTML and browsers resolve the nesting unpredictably. */}
              {"stores" in app && app.stores ? (
                <div className={styles.storeRow}>
                  <a href={app.stores.ios} target="_blank" rel="noopener noreferrer" className={styles.storeBtn}>
                    <AppleIcon /> App Store
                  </a>
                  <a href={app.stores.android} target="_blank" rel="noopener noreferrer" className={styles.storeBtn}>
                    <PlayIcon /> Google Play
                  </a>
                </div>
              ) : null}
              {"soon" in app && app.soon ? (
                <div className={styles.storeRow}>
                  <span className={styles.storeSoon}>📱 {app.soon}</span>
                </div>
              ) : null}
              </div>
            ))}
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
                <PlayIcon /> {txt.darakili.androidLabel}
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
            <div className={styles.downloadTitle}>📱 {txt.doublevoix.soonTitle}</div>
            <p className={styles.downloadText} dangerouslySetInnerHTML={{ __html: txt.doublevoix.soonText }} />
            <div className={styles.storeRow}>
              <span className={styles.storeSoonLg}><AppleIcon /> {txt.doublevoix.soonIos}</span>
              <span className={styles.storeSoonLg}><PlayIcon /> {txt.doublevoix.soonAndroid}</span>
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
              <a href="mailto:contact@salelabongo.org" className={styles.contactEmail}>
                contact@salelabongo.org
              </a>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>{txt.contact.apps_contact}</div>
              <a href="mailto:jeuxdedames@salelabongo.org" className={styles.contactEmail}>
                jeuxdedames@salelabongo.org
              </a>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>DarAkili</div>
              <a href="mailto:darakili@salelabongo.org" className={styles.contactEmail}>
                darakili@salelabongo.org
              </a>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>Yebela</div>
              <a href="mailto:contact@yebela.store" className={styles.contactEmail}>
                contact@yebela.store
              </a>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>DoubleVoix</div>
              <a href="mailto:doublevoix@salelabongo.org" className={styles.contactEmail}>
                doublevoix@salelabongo.org
              </a>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>Kuetu</div>
              <a href="mailto:kuetu@salelabongo.org" className={styles.contactEmail}>
                kuetu@salelabongo.org
              </a>
            </div>
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

function AppleIcon() {
  return (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.05 12.53c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.61-1.7-3.18-1.73-1.35-.14-2.64.79-3.33.79-.69 0-1.75-.77-2.87-.75-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.74 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.14.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.3-3.5zM14.9 5.6c.6-.74 1.01-1.76.9-2.78-.87.04-1.93.58-2.56 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.58-1.21z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.6 1.84a1.5 1.5 0 0 0-.6 1.2v17.92a1.5 1.5 0 0 0 .6 1.2l.1.06 10.03-10.16v-.24L3.7 1.78l-.1.06zm13.47 6.74-2.68-2.72L4.9 1.03l12.17 7.55zm0 6.84 2.9-1.8c.86-.53.86-1.72 0-2.26l-2.9-1.8-2.9 2.93 2.9 2.93zM4.9 22.97l9.49-4.83 2.68-2.72-12.17 7.55z" />
    </svg>
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
