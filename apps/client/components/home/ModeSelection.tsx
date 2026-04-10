import ModeCard from "./ModeCard";

export default function ModeSelection() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center p-6 text-center">
      <div className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-2xl space-y-12 duration-1000">
        <h1 className="text-4xl font-black tracking-tighter text-[#34495e] md:text-5xl">
          Choose how you want to continue
        </h1>

        <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2">
          <ModeCard title="Continue as Parent" href="/parent" variant="green" />
          <ModeCard
            title="Continue as Student"
            href="/student"
            variant="orange"
          />
        </div>
      </div>
    </section>
  );
}
