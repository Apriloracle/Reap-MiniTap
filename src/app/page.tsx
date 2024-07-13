import Celon from "@/components/Celon";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex-grow" /> {/* This pushes the content down */}
      <Celon />
      <div className="flex-grow flex-grow-[2]" /> {/* This pushes the content up more */}
    </main>
  );
}
