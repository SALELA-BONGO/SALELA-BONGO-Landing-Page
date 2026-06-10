"use client";

import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { useLegalLanguage } from "@/lib/useLegalLanguage";
import { LegalSection } from "@/components/LegalSection";
import { getLegalContent, type LegalPageContent } from "@/lib/legal";
import styles from "@/app/legal/legal.module.css";

export function LegalPageView({
  pageKey,
  backHref = "/legal",
}: {
  pageKey: "privacy" | "terms" | "communityGuidelines" | "dataDeletion";
  backHref?: string;
}) {
  const lang = useLegalLanguage();
  const content = getLegalContent(lang);
  const page: LegalPageContent = content[pageKey];
  const year = new Date().getFullYear();

  return (
    <LegalLayout>
      <Link href={backHref} className={styles.backLink}>
        ← {backHref === "/" ? content.common.backToHome : content.common.backToLegal}
      </Link>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{page.title}</h1>
        <p className={styles.pageMeta}>{page.lastUpdated}</p>
      </div>

      {page.intro && <p className={styles.intro}>{page.intro}</p>}

      <div className={styles.content}>
        {page.sections.map((section) => (
          <LegalSection key={section.title} section={section} />
        ))}
        {page.footerNote && (
          <p className={styles.footerNote}>
            {pageKey === "dataDeletion" ? (
              <>
                {lang === "fr" && (
                  <>
                    Consultez également notre{" "}
                    <Link href="/legal/privacy">Politique de confidentialité</Link> pour les détails complets.
                  </>
                )}
                {lang === "en" && (
                  <>
                    See also our <Link href="/legal/privacy">Privacy Policy</Link> for full details on your data rights.
                  </>
                )}
                {lang === "ln" && (
                  <>
                    Talá mpe <Link href="/legal/privacy">Politique ya Confidentialité</Link> na biso mpo na makoki na yo mobimba.
                  </>
                )}
              </>
            ) : (
              page.footerNote
            )}
          </p>
        )}
      </div>

      <p className={styles.siteFooter}>
        &copy; {year} {content.common.companyFooter}
      </p>
    </LegalLayout>
  );
}
