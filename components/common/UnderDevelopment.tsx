import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface UnderDevelopmentProps {
  title: string;
}

export default function UnderDevelopment({ title }: UnderDevelopmentProps) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="animate-in fade-in zoom-in max-w-md space-y-6 duration-700">
          <div className="relative mx-auto h-64 w-64">
            <Image
              src="/images/tbd.png"
              alt="Under Development"
              fill
              className="object-contain opacity-80"
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-[#34495e]">
              {title}
            </h1>
            <p className="font-medium text-zinc-500">
              We&apos;re currently building some magic for this page. Check back
              soon!
            </p>
          </div>

          <div className="bg-readly-blue/20 mx-auto h-1 w-24 overflow-hidden rounded-full">
            <div className="bg-readly-blue animate-progress h-full w-1/2" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
