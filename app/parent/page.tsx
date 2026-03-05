import ParentDashboardView from "@/components/parent/ParentDashboardView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent Dashboard",
  description:
    "Monitor your child's reading progress, view session history, and track accuracy improvements in real-time.",
  keywords: [
    "parent dashboard",
    "reading progress",
    "literacy tracking",
    "student analytics",
  ],
};

export default function ParentPage() {
  return <ParentDashboardView />;
}
