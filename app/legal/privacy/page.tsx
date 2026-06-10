import type { Metadata } from "next";
import { LegalPageView } from "@/components/LegalPageView";

export const metadata: Metadata = {
  title: "Privacy Policy | Salela Bongo LLC",
  description:
    "Privacy Policy for Salela Bongo LLC platforms: Jeux de Dames, DarAkili, and Yebela Store.",
};

export default function PrivacyPage() {
  return <LegalPageView pageKey="privacy" />;
}
