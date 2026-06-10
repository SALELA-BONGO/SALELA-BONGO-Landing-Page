"use client";

import Image from "next/image";
import Link from "next/link";
import { storeLanguage, type Language } from "@/lib/legal";
import { useLegalLanguage } from "@/lib/useLegalLanguage";
import styles from "@/app/legal/legal.module.css";

export function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = useLegalLanguage();

  const handleLangChange = (l: Language) => {
    storeLanguage(l);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/Rounded.png"
            alt="Salela Bongo Logo"
            width={28}
            height={28}
            className={styles.logoImg}
          />
          <span>Salela Bongo</span>
        </Link>
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
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
