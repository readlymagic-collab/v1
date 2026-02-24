import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ModeSelection from "@/components/home/ModeSelection";

export const metadata: Metadata = {
  title: "Welcome to ReadlyMagic",
  description: "Select your mode to continue with the ReadlyMagic experience.",
};

export default function Home() {
  return (
    <div className="cloud-bg flex min-h-screen flex-col">
      <Navbar />
      <ModeSelection />
      <Footer />
    </div>
  );
}
