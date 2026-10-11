import { Code2, Database, ShoppingBag, Blocks, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

type Skill = { name: string; icon?: string; color?: string };
const GROUPS: {
  title: string;
  description: string;
  icon: typeof Code2;
  skills: Skill[];
  project: string;
}[] = [
  {
    title: "Frontend development",
    description: "Interfaces that make digital products clear and easy to use.",
    icon: Code2,
    skills: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "Next.js", icon: "nextdotjs", color: "#FFFFFF" },
      { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4" },
    ],
    project: "Websites, applications & product interfaces",
  },
  {
    title: "Backend & databases",
    description: "The application logic and data behind the experience.",
    icon: Database,
    skills: [
      { name: "Node.js", icon: "nodedotjs", color: "#5FA04E" },
      { name: "Express.js" },
      { name: "MongoDB", icon: "mongodb", color: "#47A248" },
      { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
    ],
    project: "Used in Comfort and Care & MERN Job Portal",
  },
  {
    title: "E-commerce",
    description: "Shopify storefronts built around products and customers.",
    icon: ShoppingBag,
    skills: [
      { name: "Shopify" },
      { name: "Storefront development" },
      { name: "Product collections" },
    ],
    project: "Used in Forge Nutrition & Health Maker",
  },
  {
    title: "Extensions & workflow",
    description: "Browser tools that bring useful functionality into everyday work.",
    icon: Blocks,
    skills: [{ name: "Chrome Extensions" }, { name: "AI chat assistance" }, { name: "Git" }],
    project: "Used in Fiverr Scam Detector & Smart Chat Assistant",
  },
];

export default function Tech() {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-heading">
      <div className="skills-section__inner">
        <div className="skills-section__heading">
          <Reveal>
            <p className="label-xs">Skills & technologies</p>
            <h2 id="skills-heading">
              The skills behind
              <br />
              the work<span>.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="skills-section__intro">
              From Shopify stores to full-stack applications and Chrome extensions. These are the
              tools and skills I bring to each project.
            </p>
            <Link href="/work" className="skills-section__link">
              Explore the projects <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="skills-grid">
          {GROUPS.map(({ title, description, icon: Icon, skills, project }, index) => (
            <Reveal key={title} delay={index * 60}>
              <article className="skill-card">
                <div className="skill-card__top">
                  <span className="skill-card__icon">
                    <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="skill-card__number" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <h3>{title}</h3>
                <p className="skill-card__description">{description}</p>
                <ul className="skill-card__skills" aria-label={`${title} skills`}>
                  {skills.map(({ name, icon, color }) => (
                    <li key={name}>
                      {icon && (
                        <span
                          className="technology-logo"
                          aria-hidden="true"
                          style={{
                            backgroundColor: color,
                            maskImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/${icon}.svg)`,
                            WebkitMaskImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/${icon}.svg)`,
                          }}
                        />
                      )}
                      {name}
                    </li>
                  ))}
                </ul>
                <p className="skill-card__project">{project}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
