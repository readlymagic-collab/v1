import ScienceView from "@/components/science/ScienceView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Science of Reading",
  description:
    "Explore the evidence-based research behind the science of reading and how it informs our interactive literacy tools.",
  keywords: [
    "science of reading",
    "evidence-based",
    "literacy research",
    "phonics",
    "fluency",
  ],
};

export default function SciencePage() {
  return <ScienceView />;
}
