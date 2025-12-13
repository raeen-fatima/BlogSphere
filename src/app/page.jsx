// export const dynamic = "force-dynamic";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <>
    <Hero />
      <section className="h-[80vh] flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Welcome to BlogSphere</h1>
      </section>
    </>
  );
}
