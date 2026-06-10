import type { Metadata } from "next";
import { LegalPageView } from "@/components/LegalPageView";

export const metadata: Metadata = {
  title: "Data Deletion | Salela Bongo LLC",
  description:
    "How to request deletion of your account and personal data across Salela Bongo LLC platforms.",
};

export default function DataDeletionPage() {
  return <LegalPageView pageKey="dataDeletion" />;
}
