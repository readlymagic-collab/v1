import type { Metadata } from "next";
import Image from "next/image";
import BackButton from "@/components/common/BackButton";
import PinForm from "@/components/student-pin/PinForm";

export const metadata: Metadata = {
  title: "Student Login",
  description:
    "Enter your 4-digit student PIN to access your Reading Magic dashboard.",
};

export default function StudentPage() {
  return (
    <div className="cloud-bg flex min-h-screen flex-col items-center justify-center p-6">
      <BackButton href="/" className="absolute top-8 left-8" />

      <div className="animate-in zoom-in-95 w-full max-w-md space-y-8 rounded-3xl border border-zinc-100 bg-white p-10 shadow-xl duration-500">
        <div className="flex justify-center">
          <Image
            src="/images/brand.png"
            alt="ReadlyMagic Logo"
            width={180}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-black tracking-tight text-zinc-800">
            Enter your student PIN
          </h1>
          <p className="text-sm text-zinc-500 italic">
            Hint: Try 1234 for demo
          </p>
        </div>

        <PinForm onSuccessRedirect="/student/home" />
      </div>

      <p className="mt-8 text-sm text-zinc-400">Demo version</p>
    </div>
  );
}
