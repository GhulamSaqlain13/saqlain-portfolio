import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import Footer from "@/components/sections/Footer";
import portrait from "@/assets/me-Photoroom.png";

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background">
      <div className="page-banner">
        <Navbar />
      </div>
      <section className="border-t border-border py-24 md:py-40">
        <div className="mx-auto grid w-full max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-10">
          <Reveal className="md:col-span-5">
            <div className="about-portrait-frame relative overflow-hidden border border-border bg-secondary">
              <img
                src={portrait.src}
                alt="Ghulam Saqlain, full stack developer"
                width={portrait.width}
                height={portrait.height}
                loading="lazy"
                className="w-full select-none"
              />
            </div>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7 md:self-center">
            <Reveal>
              <p className="label-xs">The person behind the code</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-8 text-[clamp(2rem,4.4vw,4rem)] font-bold leading-[0.98] tracking-[-0.045em]">
                I like building things that have a <span className="text-outline">purpose.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                I&apos;m Ghulam Saqlain, a Full Stack Developer focused on turning ideas and
                business problems into modern digital products.
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                I work across the frontend and backend to build complete experiences—from the first
                concept and user experience to the architecture, development, and final launch.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-12 border-t border-border pt-8">
                <p className="text-2xl font-medium tracking-[-0.03em]">
                  Ghulam Saqlain<span className="text-accent">.</span>
                </p>
                <p className="label-xs mt-3">Full Stack Developer Â· Digital Product Builder</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
