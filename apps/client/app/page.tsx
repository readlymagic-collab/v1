import type { Metadata } from "next";
import HomeView from "@/components/home/HomeView";

export const metadata: Metadata = {
  title: "Welcome to ReadlyMagic",
  description: "Select your mode to continue with the ReadlyMagic experience.",
  keywords: [
    "reading app",
    "literacy",
    "student mode",
    "parent dashboard",
    "education portal",
  ],
};

export default function Home() {
  return <HomeView />;
}
