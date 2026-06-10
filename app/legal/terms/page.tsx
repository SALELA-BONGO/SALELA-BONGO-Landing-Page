import type { Metadata } from "next";
import { LegalPageView } from "@/components/LegalPageView";

export const metadata: Metadata = {
  title: "Terms of Service | Salela Bongo LLC",
  description:
    "Terms of Service for Salela Bongo LLC platforms: Jeux de Dames, DarAkili, and Yebela Store.",
};

export default function TermsPage() {
  return <LegalPageView pageKey="terms" />;
}
