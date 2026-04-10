import ParentDashboardView from "@/components/parent/ParentDashboardView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent Dashboard",
  description: "Monitor your child's reading progress and manage their learning journey.",
};

export default function ParentPage() {
  return <ParentDashboardView />;
}
