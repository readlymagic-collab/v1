import SchoolsView from "@/components/schools/SchoolsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReadlyMagic for Schools",
  description:
    "Discover how ReadlyMagic can be integrated into your school curriculum to boost literacy outcomes for every student.",
  keywords: [
    "schools",
    "curriculum integration",
    "classroom tools",
    "literacy program",
  ],
};

export default function SchoolsPage() {
  return <SchoolsView />;
}
