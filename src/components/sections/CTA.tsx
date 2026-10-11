import { PillButton } from "@/components/Navbar";

export default function CTA() {
  return (
    <section id="contact" className="contact-home" aria-labelledby="contact-home-title">
      <div>
        <p className="text-brand text-lg font-medium">Have a project in mind?</p>
        <h2 id="contact-home-title">Let&apos;s build something great.</h2>
        <p>Websites and applications built around your business. Let&apos;s talk about yours.</p>
      </div>
      <PillButton href="/contact" variant="green">
        Get in touch
      </PillButton>
    </section>
  );
}
