import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PillButton } from "@/components/Navbar";

const SERVICES = [
  {
    title: "Business websites",
    text: "A clear, professional home for your business that helps visitors understand what you offer.",
    items: ["Business & portfolio websites", "Landing pages", "Responsive layouts"],
    note: "MAKE THE RIGHT FIRST IMPRESSION",
  },
  {
    title: "Web applications",
    text: "Turn your workflows into a useful application, with the frontend and backend working together.",
    items: ["MERN-stack applications", "Dashboards & portals", "Database integration"],
    note: "BUILD AROUND YOUR WORKFLOW",
  },
  {
    title: "Shopify & e-commerce",
    text: "An online storefront that makes your products easy to discover and your brand easy to recognize.",
    items: ["Shopify storefronts", "Product collections", "Mobile shopping experiences"],
    note: "BRING YOUR PRODUCTS ONLINE",
  },
  {
    title: "MVP development",
    text: "Start with the features that matter, get a working product in front of users, and build from there.",
    items: ["Core feature development", "Frontend & backend", "Launch-ready foundations"],
    note: "TAKE YOUR IDEA TO ITS FIRST LAUNCH",
  },
  {
    title: "Custom tools & extensions",
    text: "Solve a specific problem with a focused tool, from browser extensions to AI-assisted experiences.",
    items: ["Chrome extensions", "AI chat assistants", "Custom web tools"],
    note: "MAKE EVERYDAY WORK SIMPLER",
  },
];

export default function Services({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="services" className="services-section" aria-labelledby="services-heading">
      <div className="services-section__inner">
        <div className="services-section__header">
          <Reveal>
            <p className="label-xs">What I can help you with</p>
            <Heading id="services-heading">
              Built for your business<span>.</span>
            </Heading>
          </Reveal>
          <Reveal delay={80}>
            <p className="services-section__intro">
              From your first website to a custom application. Choose what you need, and we will
              work out the right approach together.
            </p>
          </Reveal>
        </div>
        <div className="services-cards">
          {SERVICES.map(({ title, text, items, note }, index) => (
            <Reveal key={title} delay={(index % 3) * 60}>
              <article className="service-card">
                <div className="service-card__top">
                  <span className="service-card__number">0{index + 1}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p className="service-card__description">{text}</p>
                <ul className="service-card__features">
                  {items.map((item) => (
                    <li key={item}>
                      <Check size={13} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="service-card__note">{note}</p>
                <Link
                  href="/contact"
                  className="service-card__link"
                  aria-label={`Discuss ${title}`}
                >
                  Let&apos;s discuss it <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
          <Reveal delay={120}>
            <div className="service-card service-card--conversation">
              <span className="label-xs">Let&apos;s figure it out</span>
              <h3>
                Not sure where
                <br />
                to start?
              </h3>
              <p className="service-card__description">
                Tell me about your idea or the problem you want to solve. We can find a practical
                starting point.
              </p>
              <PillButton href="/contact" variant="green">
                Talk about your project
              </PillButton>
              <p className="service-card__reassurance">A simple conversation. A clear next step.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
