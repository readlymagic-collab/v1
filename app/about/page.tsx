import AboutView from "@/components/about/AboutView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ReadlyMagic",
  description:
    "Learn more about our mission to combine the science of reading with magical experiences to master literacy.",
  keywords: [
    "about readlymagic",
    "mission",
    "literacy mission",
    "reading education",
  ],
};

export default function AboutPage() {
  return <AboutView />;
}
