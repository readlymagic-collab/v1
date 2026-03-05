import LevelSelectionView from "@/components/student/levels/LevelSelectionView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Level",
  description:
    "Choose your reading level to start a tailored practice session. From basic words to complex sights.",
  keywords: [
    "reading levels",
    "sight words",
    "vocabulary practice",
    "literacy levels",
  ],
};

export default function LevelSelectionPage() {
  return <LevelSelectionView />;
}
