import ResultsView from "@/components/student/results/ResultsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session Results",
  description:
    "Well done! Review your reading session results, accuracy, and see how much you've improved.",
  keywords: [
    "reading results",
    "accuracy tracking",
    "learning achievements",
    "session summary",
  ],
};

export default function ResultsPage() {
  return <ResultsView />;
}
