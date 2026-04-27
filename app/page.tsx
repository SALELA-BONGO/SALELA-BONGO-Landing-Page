"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

type Language = "fr" | "en" | "ln";

const t = {
  fr: {
    nav: { about: "À propos", apps: "Nos Applications", contact: "Contact" },
    hero: {
      badge: "Salela Bongo LLC — « Utilise ton cerveau »",
      headline: "L'Afrique pense. L'Afrique crée. L'Afrique construit.",
      sub: "\"Salela Bongo\" signifie \"Utilise ton cerveau\" en Lingala. Tout comme les salles de sport forgent le corps, nous croyons que le cerveau doit être entraîné. Nous construisons des applications par des Africains, pour des Africains — dans les langues de l'Afrique, avec le cœur de l'Afrique.",
      cta: "Découvrir nos applications",
      ctaSub: "Nous contacter",
    },
    mission: {
      title: "Notre Mission",
      quote: "Le monde a des salles de sport pour le corps — nous construisons des gymnases pour l'esprit africain.",
      paragraphs: [
        "Salela Bongo LLC est née d'une conviction simple et puissante : l'intelligence africaine mérite des outils à sa hauteur. Notre nom, \"Salela Bongo\", est un appel en Lingala — \"Utilise ton cerveau\" — un cri de ralliement pour chaque Africain et chaque membre de la diaspora qui refuse de rester spectateur dans la révolution numérique.",
        "Nous ne construisons pas simplement des applications. Nous forgeons des espaces où l'esprit africain peut s'exercer, apprendre, jouer et entreprendre — en français, en anglais et en lingala. Comme Masakhane (\"Nous construisons ensemble\"), nous croyons que l'avenir technologique de l'Afrique sera bâti par ceux qui comprennent son contexte, parlent ses langues et portent sa culture dans leur code.",
        "Le sport nourrit le corps. Nous nourrissons l'esprit. Chaque partie de dames jouée, chaque cours suivi, chaque boutique créée sur nos plateformes est un exercice intellectuel — un pas de plus vers une Afrique qui pense, innove et domine le numérique.",
        "Aujourd'hui, alors que le monde se concentre massivement sur l'entraînement de grands modèles d'intelligence artificielle (IA) et de grands modèles linguistiques (LLM), nous croyons qu'il faut d'abord entraîner le jeune cerveau africain. L'Afrique a la population la plus jeune du monde, avec un âge médian d'environ 19 ans. D'ici 2050, le continent sera le principal moteur de la croissance démographique mondiale, ce qui signifie que l'avenir du monde est intrinsèquement lié au développement intellectuel de la jeunesse africaine. (<a href=\"https://population.un.org/wpp/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #60a5fa; text-decoration: underline;\">Réf : Perspectives de la population mondiale des Nations Unies</a>)",
      ],
    },
    about: {
      title: "Qui sommes-nous",
      desc1: "Salela Bongo LLC est une société de technologie enregistrée aux États-Unis, fondée par des Africains passionnés qui comprennent les réalités, les langues et les aspirations du continent. Nous concevons des applications mobiles et des plateformes numériques pour l'Afrique et sa diaspora.",
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
      title: "Nos Applications",
      sub: "Trois produits — un seul engagement envers l'excellence.",
      list: [
        {
          id: "jeuxdedames",
          logo: "/logo-jeuxdedames.png",
          logoBg: true,
          name: "Jeux de Dames",
          domain: "jeuxdedames.africa",
          tag: "En ligne · iOS · Android",
          color: "#3b82f6",
          desc: "Plateforme de jeu de dames en ligne avec variantes congolaise, internationale et américaine. Jeux en temps réel, chat, abonnement premium et profils utilisateurs.",
          features: ["Jeu en temps réel (WebSocket)", "3 variantes de jeu", "Abonnement Premium", "iOS & Android"],
          url: "https://jeuxdedames.africa",
        },
        {
          id: "yekola",
          logo: "/logo-yekola.jpeg",
          name: "Yekola",
          domain: "yekola.africa",
          tag: "Web · Mobile à venir",
          color: "#10b981",
          desc: "Plateforme d'apprentissage en ligne conçue pour l'Afrique — cours créés par des Africains, classements locaux par ville et pays, paiement mobile money inclus.",
          features: ["Cours gratuits & payants", "Classements locaux", "Parrainage de cours", "Mobile Money"],
          url: "https://yekola.africa",
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
      ],
    },
    legal: {
      title: "Conformité & Légal",
      sub: "Nos politiques sont disponibles sur chaque application.",
      items: [
        { label: "Politique de confidentialité", url: "https://jeuxdedames.africa/legal/privacy" },
        { label: "Conditions d'utilisation", url: "https://jeuxdedames.africa/legal/terms" },
        { label: "Charte communautaire", url: "https://jeuxdedames.africa/legal/community-guidelines" },
        { label: "Suppression des données", url: "https://jeuxdedames.africa/legal/data-deletion" },
      ],
    },
    contact: {
      title: "Nous contacter",
      sub: "Pour toute question professionnelle, partenariat ou demande presse.",
      general: "Demandes générales",
      apps_contact: "Support applications",
    },
    footer: "Tous droits réservés",
  },
  en: {
    nav: { about: "About", apps: "Our Apps", contact: "Contact" },
    hero: {
      badge: "Salela Bongo LLC — \"Use Your Brain\"",
      headline: "Africa Thinks. Africa Creates. Africa Builds.",
      sub: "\"Salela Bongo\" means \"Use Your Brain\" in Lingala. Just as gyms forge the body, we believe the brain must be trained. We build apps by Africans, for Africans — in Africa's languages, with Africa's heart.",
      cta: "Explore our apps",
      ctaSub: "Get in touch",
    },
    mission: {
      title: "Our Mission",
      quote: "The world has gyms for the body — we are building gyms for the African mind.",
      paragraphs: [
        "Salela Bongo LLC was born from a simple yet powerful conviction: African intelligence deserves tools built to match. Our name, \"Salela Bongo\", is a rallying cry in Lingala — \"Use Your Brain\" — a call to every African and every member of the diaspora who refuses to be a spectator in the digital revolution.",
        "We don't just build apps. We forge spaces where the African mind can exercise, learn, play, and build businesses — in French, English, and Lingala. Like Masakhane (\"We build together\"), we believe Africa's technological future will be shaped by those who understand its context, speak its languages, and carry its culture in their code.",
        "Sports nourish the body. We nourish the mind. Every checkers game played, every course completed, every shop created on our platforms is an intellectual workout — one more step toward an Africa that thinks, innovates, and leads in the digital age.",
        "Today, as the world focuses heavily on training big AI models and Large Language Models (LLMs), we believe in training the younger African mind first. Africa has the youngest population in the world, with a median age of approximately 19 years old. By 2050, the continent will be the primary driver of global population growth, meaning the future of the world is inherently tied to the intellectual development of African youth. (<a href=\"https://population.un.org/wpp/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #60a5fa; text-decoration: underline;\">Ref: United Nations World Population Prospects</a>)",
      ],
    },
    about: {
      title: "Who We Are",
      desc1: "Salela Bongo LLC is a US-registered technology company founded by passionate Africans who understand the continent's realities, languages, and aspirations. We design mobile apps and digital platforms for Africa and its diaspora.",
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
      title: "Our Applications",
      sub: "Three products — one commitment to excellence.",
      list: [
        {
          id: "jeuxdedames",
          logo: "/logo-jeuxdedames.png",
          logoBg: true,
          name: "Jeux de Dames",
          domain: "jeuxdedames.africa",
          tag: "Online · iOS · Android",
          color: "#3b82f6",
          desc: "Online checkers platform with Congolese, International and American variants. Real-time gameplay, in-game chat, premium subscription and user profiles.",
          features: ["Real-time play (WebSocket)", "3 game variants", "Premium subscription", "iOS & Android"],
          url: "https://jeuxdedames.africa",
        },
        {
          id: "yekola",
          logo: "/logo-yekola.jpeg",
          name: "Yekola",
          domain: "yekola.africa",
          tag: "Web · Mobile coming soon",
          color: "#10b981",
          desc: "Online learning platform built for Africa — courses authored by Africans, local leaderboards by city and country, mobile money payments included.",
          features: ["Free & paid courses", "Local leaderboards", "Course sponsorship", "Mobile Money"],
          url: "https://yekola.africa",
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
      ],
    },
    legal: {
      title: "Compliance & Legal",
      sub: "Our policies are available on each application.",
      items: [
        { label: "Privacy Policy", url: "https://jeuxdedames.africa/legal/privacy" },
        { label: "Terms of Service", url: "https://jeuxdedames.africa/legal/terms" },
        { label: "Community Guidelines", url: "https://jeuxdedames.africa/legal/community-guidelines" },
        { label: "Data Deletion", url: "https://jeuxdedames.africa/legal/data-deletion" },
      ],
    },
    contact: {
      title: "Contact Us",
      sub: "For professional inquiries, partnerships, or press requests.",
      general: "General inquiries",
      apps_contact: "App support",
    },
    footer: "All rights reserved",
  },
  ln: {
    nav: { about: "Ntina", apps: "Mipango na Biso", contact: "Toyebana" },
    hero: {
      badge: "Salela Bongo LLC — « Salelá Bongo na yo »",
      headline: "Afrika ekanisi. Afrika esali. Afrika etongi.",
      sub: "\"Salela Bongo\" elakisi \"Salelá bongo na yo\" na Lingala. Ndenge ba salle ya sport elendisaka nzoto, biso tondimi ete bongo esengeli kolendisama. Tosalaka mipango na ba Africains, mpo na ba Africains — na minoko ya Afrika, na motema ya Afrika.",
      cta: "Tala mipango na biso",
      ctaSub: "Toyebana",
    },
    mission: {
      title: "Mission na Biso",
      quote: "Mokili ezali na ba salle ya sport mpo na nzoto — biso tozali kotonga ba gymnase mpo na makanisi ya Afrika.",
      paragraphs: [
        "Salela Bongo LLC ebotamaki na kondima moko ya nguya: bwanya ya Afrika esengeli na bisaleli oyo etongamaki mpo na yango. Nkombo na biso, \"Salela Bongo\", ezali loyembo ya libundeli na Lingala — \"Salelá bongo na yo\" — ebeleli mpo na moto nyonso ya Afrika mpe ya diaspora oyo aboyi kozala kaka motaleli na révolution ya numérique.",
        "Tosalaka kaka mipango te. Totongaka bisika epai makanisi ya Afrika ekoki komimesa, koyekola, kosakana mpe kotonga mombongo — na Français, Anglais mpe Lingala. Lokola Masakhane (\"Totonga nzela moko\"), tondimi ete mikolo ya lobi ya teknolojia ya Afrika ekosalemama na baoyo bayebi contexte na yango, balobaka minoko na yango mpe bamemaka culture na yango na code na bango.",
        "Sport eleisaka nzoto. Biso toleisaka makanisi. Masano nionso ya dames oyo esakanami, cours nionso oyo elandamaki, boutique nionso oyo esalemaki na plateformes na biso ezali exercice ya bwanya — etape mosusu mpo na Afrika oyo ekanisaka, esalaka mpe etambwisaka na numérique.",
        "Lelo oyo, ntango mokili mobimba ezali kotia likebi na kolendisa ba modèles ya minene ya Intelligence Artificielle (IA) mpe ba modèles linguistiques (LLM), biso tondimi ete esengeli naino kolendisa bongo ya bilenge ya Afrika. Afrika ezali na population oyo eleki bilenge na mokili mobimba, na âge médian ya mibu 19. Tii na mobu 2050, continent ekokóma moteur ya liboso ya bokoli ya population na mokili, yango elakisi ete mikolo ezali koya ya mokili ekangami na bokoli ya mayele ya bilenge ya Afrika. (<a href=\"https://population.un.org/wpp/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #60a5fa; text-decoration: underline;\">Réf : Perspectives ya Population ya Mokili ya Nations Unies</a>)",
      ],
    },
    about: {
      title: "Biso tozali banani",
      desc1: "Salela Bongo LLC ezali société ya teknolojia eregistrée na États-Unis, etongamaki na ba Africains ya motema oyo bayebi réalités, minoko mpe biloto ya continan. Tosalaka mipango ya telefoni mpe plateformes ya numerique mpo na Afrika mpe diaspora na yango.",
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
      title: "Mipango na Biso",
      sub: "Biloko misato — commitment moko ya malamu.",
      list: [
        {
          id: "jeuxdedames",
          logo: "/logo-jeuxdedames.png",
          logoBg: true,
          name: "Jeux de Dames",
          domain: "jeuxdedames.africa",
          tag: "Online · iOS · Android",
          color: "#3b82f6",
          desc: "Plateau ya jeu de dames online na variantes ya Congo, Internationale mpe Américaine. Jeu ya temps réel, chat, abonnement premium mpe profils.",
          features: ["Jeu ya temps réel", "Variantes 3", "Premium", "iOS & Android"],
          url: "https://jeuxdedames.africa",
        },
        {
          id: "yekola",
          logo: "/logo-yekola.jpeg",
          name: "Yekola",
          domain: "yekola.africa",
          tag: "Web · Mobile ekoya",
          color: "#10b981",
          desc: "Plateforme ya koyekola online esalama mpo na Afrika — ba cours esalami na ba Africains, classements ya locale, mobile money.",
          features: ["Ba cours ya ofele", "Classements locale", "Sponsor cours", "Mobile Money"],
          url: "https://yekola.africa",
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
      ],
    },
    legal: {
      title: "Conformité & Légal",
      sub: "Ba politique na biso ezali na mipango nionso.",
      items: [
        { label: "Politique ya Confidentialité", url: "https://jeuxdedames.africa/legal/privacy" },
        { label: "Conditions ya Kosalela", url: "https://jeuxdedames.africa/legal/terms" },
        { label: "Règles ya Communauté", url: "https://jeuxdedames.africa/legal/community-guidelines" },
        { label: "Suppression ya Data", url: "https://jeuxdedames.africa/legal/data-deletion" },
      ],
    },
    contact: {
      title: "Toyebana",
      sub: "Mpo na mituna ya professionnel, partenariat to presse.",
      general: "Mituna ya général",
      apps_contact: "Support mipango",
    },
    footer: "Makoki nionso ebatelami",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Language>("fr");
  const txt = t[lang];
  const year = new Date().getFullYear();

  return (
    <div className={styles.page}>
      {/* ── Background orbs ── */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <a href="#top" className={styles.logo}>
          <span className={styles.logoIcon}>⬡</span>
          <span>Salela Bongo</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#about" className={styles.navLink}>{txt.nav.about}</a>
          <a href="#apps" className={styles.navLink}>{txt.nav.apps}</a>
          <a href="#contact" className={styles.navLink}>{txt.nav.contact}</a>
        </div>
        <div className={styles.langSwitcher}>
          {(["fr", "en", "ln"] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`${styles.langBtn} ${lang === l ? styles.langActive : ""}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
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
          <div className={styles.stat}><span className={styles.statNum}>3</span><span className={styles.statLabel}>Applications</span></div>
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
              <div key={app.id} className={styles.appCard} style={{ "--app-color": app.color } as React.CSSProperties}>
                <div className={styles.appCardHeader}>
                  <div className={`${styles.appLogoWrap} ${"logoBg" in app && app.logoBg ? styles.appLogoWhiteBg : ""}`}>
                    <Image src={app.logo} alt={app.name} width={56} height={56} className={styles.appLogo} />
                  </div>
                  <div className={styles.appHeaderInfo}>
                    <div className={styles.appName}>{app.name}</div>
                    <a href={app.url} target="_blank" rel="noopener noreferrer" className={styles.appDomain}>
                      {app.domain} ↗
                    </a>
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
                <a href={app.url} target="_blank" rel="noopener noreferrer" className={styles.appCTA}>
                  Visiter {app.domain} ↗
                </a>
              </div>
            ))}
          </div>
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
              <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.legalCard}>
                <span className={styles.legalIcon}>📄</span>
                <span>{item.label}</span>
                <span className={styles.legalArrow}>↗</span>
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
              <a href="mailto:contact@jeuxdedames.africa" className={styles.contactEmail}>
                contact@jeuxdedames.africa
              </a>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>Yekola</div>
              <a href="mailto:yekola@salelabongo.org" className={styles.contactEmail}>
                yekola@salelabongo.org
              </a>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactCardTitle}>Yebela</div>
              <a href="mailto:contact@yebela.store" className={styles.contactEmail}>
                contact@yebela.store
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <span className={styles.logoIcon}>⬡</span>
            <span>Salela Bongo LLC</span>
          </div>
          <p className={styles.footerCopy}>
            &copy; {year} Salela Bongo LLC — {txt.footer}
          </p>
          <div className={styles.footerLinks}>
            <a href="https://jeuxdedames.africa/legal/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
            <a href="https://jeuxdedames.africa/legal/terms" target="_blank" rel="noopener noreferrer">Terms</a>
            <a href="mailto:contact@salelabongo.org">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
