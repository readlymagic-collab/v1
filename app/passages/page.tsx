import PassagesView from "@/components/passages/PassagesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading Passages",
  description:
    "Browse our collection of science-based reading passages designed to engage students and improve reading comprehension.",
  keywords: [
    "reading passages",
    "comprehension",
    "literacy resources",
    "graded passages",
  ],
};

export default function PassagesPage() {
  return <PassagesView />;
}
