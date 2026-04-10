import SupportView from "@/components/support/SupportView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Need help? Access our support center for guides, FAQs, and contact information for the ReadlyMagic team.",
  keywords: ["support", "help center", "customer care", "literacy support"],
};

export default function SupportPage() {
  return <SupportView />;
}
