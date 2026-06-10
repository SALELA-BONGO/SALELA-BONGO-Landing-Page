import type { LegalSection as LegalSectionType } from "@/lib/legal";
import styles from "@/app/legal/legal.module.css";

export function LegalSection({ section }: { section: LegalSectionType }) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>
        {section.number && <span className={styles.sectionNumber}>{section.number} </span>}
        {section.title}
      </h3>
      <div className={styles.sectionBody}>
        {section.body && <p>{section.body}</p>}
        {section.list && (
          <ul className={styles.sectionList}>
            {section.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {section.subsections?.map((sub) => (
          <div key={sub.title} className={styles.subsection}>
            <h4 className={styles.subsectionTitle}>{sub.title}</h4>
            {sub.body && <p>{sub.body}</p>}
            {sub.list && (
              <ul className={styles.sectionList}>
                {sub.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
