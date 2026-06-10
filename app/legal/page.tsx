"use client";

import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { useLegalLanguage } from "@/lib/useLegalLanguage";
import { getLegalContent } from "@/lib/legal";
import styles from "./legal.module.css";

export default function LegalIndexPage() {
  const lang = useLegalLanguage();
  const content = getLegalContent(lang);
  const year = new Date().getFullYear();

  return (
    <LegalLayout>
      <Link href="/" className={styles.backLink}>
        ← {content.common.backToHome}
      </Link>

      <h1 className={styles.indexTitle}>{content.common.legalIndexTitle}</h1>
      <p className={styles.indexSub}>{content.common.legalIndexSub}</p>

      <div className={styles.cardGrid}>
        {content.index.cards.map((card) => (
          <Link key={card.href} href={card.href} className={styles.card}>
            <span className={styles.cardLabel}>{card.label}</span>
            <span className={styles.cardDesc}>{card.description}</span>
            <span className={styles.cardArrow}>→</span>
          </Link>
        ))}
      </div>

      <p className={styles.siteFooter}>
        &copy; {year} {content.common.companyFooter}
      </p>
    </LegalLayout>
  );
}
