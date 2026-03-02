"use client";

import { useState } from 'react';
import styles from './page.module.css';

type Language = 'fr' | 'en' | 'ln';

const translations = {
  fr: {
    comingSoon: "Bientôt disponible",
    description: "Pour plus de détails ou pour toute question, contactez-nous à",
  },
  en: {
    comingSoon: "Coming Soon",
    description: "For more details or question reach out to",
  },
  ln: {
    comingSoon: "Eza Koya", // Coming soon
    description: "Mpo na koyeba makambo mosusu to mituna, komela biso na",
  }
};

export default function Home() {
  const [lang, setLang] = useState<Language>('fr');
  
  const currentYear = new Date().getFullYear();
  const t = translations[lang];

  return (
    <div className={styles.container}>
      <div className={styles.languageSwitcher}>
        <button 
          className={`${styles.langBtn} ${lang === 'fr' ? styles.active : ''}`}
          onClick={() => setLang('fr')}
          aria-label="Français"
        >
          FR
        </button>
        <button 
          className={`${styles.langBtn} ${lang === 'en' ? styles.active : ''}`}
          onClick={() => setLang('en')}
          aria-label="English"
        >
          EN
        </button>
        <button 
          className={`${styles.langBtn} ${lang === 'ln' ? styles.active : ''}`}
          onClick={() => setLang('ln')}
          aria-label="Lingala"
        >
          LN
        </button>
      </div>

      <main className={styles.glassCard}>
        <h1 className={styles.title}>{t.comingSoon}</h1>
        <div className={styles.contactBox}>
          <p className={styles.description}>
            {t.description}{' '}
            <a href="mailto:contact@salelabongo.org" className={styles.contactLink}>
              contact@salelabongo.org
            </a>
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {currentYear} SALELA BONGO LLC - ALL RIGHT RESERVED</p>
      </footer>
    </div>
  );
}
