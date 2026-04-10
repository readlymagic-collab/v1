import ResourcesView from "@/components/resources/ResourcesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Resources",
  description:
    "Access a wealth of literacy resources, teaching guides, and support materials based on the science of reading.",
  keywords: [
    "learning resources",
    "teaching materials",
    "literacy tools",
    "reading support",
  ],
};

export default function ResourcesPage() {
  return <ResourcesView />;
}
