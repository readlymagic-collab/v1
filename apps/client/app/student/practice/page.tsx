import PracticeView from "@/components/student/practice/PracticeView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Session",
  description:
    "Interactive reading practice session. Improve your word recognition with real-time feedback and text-to-speech support.",
  keywords: [
    "reading practice",
    "word recognition",
    "text-to-speech",
    "interactive learning",
  ],
};

export default function PracticePage() {
  return <PracticeView />;
}
