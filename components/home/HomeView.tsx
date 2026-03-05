import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ModeSelection from "@/components/home/ModeSelection";

export default function HomeView() {
  return (
    <div className="cloud-bg flex min-h-screen flex-col">
      <Navbar />
      <ModeSelection />
      <Footer />
    </div>
  );
}
