import type { Metadata } from "next";
import { LegalPageView } from "@/components/LegalPageView";

export const metadata: Metadata = {
  title: "Community Guidelines | Salela Bongo LLC",
  description:
    "Community guidelines for respectful interaction across Salela Bongo LLC platforms.",
};

export default function CommunityGuidelinesPage() {
  return <LegalPageView pageKey="communityGuidelines" />;
}
