import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PillButton } from "@/components/Navbar";

type Project = {
  n: string;
  title: string;
  category: string;
  text: string;
  visual: "grid" | "lines" | "blocks" | "arc";
  href?: string;
};

const PROJECTS: Project[] = [
  {
    n: "forge-nutrition",
    title: "Forge Nutrition",
    category: "E-Commerce / Shopify",
    text: "A Shopify store I built for a nutrition brand, with supplement collections and product discovery organized around wellness goals.",
    visual: "blocks",
    href: "https://www.forgenutrition.net/",
  },
  {
    n: "health-maker",
    title: "Health Maker",
    category: "E-Commerce / Shopify",
    text: "A Shopify e-commerce website I built for a wellness brand, featuring supplements, product collections, and online shopping.",
    visual: "arc",
    href: "https://healthmaker.net/",
  },
  {
    n: "fiverr-scam-detector",
    title: "Fiverr Scam Detector",
    category: "Chrome Extension",
    text: "A Chrome extension I built to help Fiverr users identify potential scams.",
    visual: "grid",
    href: "https://chromewebstore.google.com/detail/scam-finder-for-fiverr/ahiblloihlolenidljpaophgfmbbjfjn?hl=en",
  },
  {
    n: "smart-chat-assistant",
    title: "Smart Chat Assistant",
    category: "Chrome Extension / AI",
    text: "An AI chat assistance extension I built, available on the Chrome Web Store.",
    visual: "lines",
    href: "https://chromewebstore.google.com/detail/smart-chat-assistant-ai-w/njjbgnflfdchlnihjdcdkmgblmkgnppc",
  },
  {
    n: "comfort-and-care",
    title: "Comfort and Care",
    category: "Full-Stack Application / MERN",
    text: "A full-stack application I built using MongoDB, Express.js, React, and Node.js.",
    visual: "arc",
  },
  {
    n: "eets-travel",
    title: "Eets Travel",
    category: "Web Project",
    text: "Eets Travel, a project I built.",
    visual: "lines",
  },
  {
    n: "ranklocal",
    title: "RankLocal",
    category: "Web Project",
    text: "RankLocal, a project I built.",
    visual: "grid",
  },
  {
    n: "01",
    title: "ViikkoNro",
    category: "Web Product / Utility",
    text: "A fast and focused digital product designed to make ISO week-number calculations simple and accessible — built for Finland.",
    visual: "grid",
  },
  {
    n: "02",
    title: "MERN Job Portal",
    category: "Full-Stack Web Application",
    text: "A full-stack recruitment platform connecting employers and job seekers, from posting to application tracking.",
    visual: "lines",
  },
  {
    n: "03",
    title: "E-Commerce Platform",
    category: "E-Commerce",
    text: "A modern online shopping experience designed around products, customers, and conversion.",
    visual: "blocks",
  },
  {
    n: "04",
    title: "Blog Website",
    category: "Publishing / Content",
    text: "A modern editorial platform designed for storytelling, publishing, and content discovery with a clean reading experience.",
    visual: "arc",
  },
  {
    n: "05",
    title: "AI Knowledge Assistant",
    category: "AI Product / SaaS",
    text: "A focused knowledge workspace that turns internal documents into useful answers, summaries, and next actions for teams.",
    visual: "blocks",
  },
  {
    n: "06",
    title: "Growth Analytics Dashboard",
    category: "Data Product",
    text: "A clear reporting layer for small businesses to connect customer activity, performance, and decisions in one place.",
    visual: "lines",
  },
  {
    n: "07",
    title: "Local Services Marketplace",
    category: "Marketplace / MVP",
    text: "A practical marketplace concept for discovering trusted local providers, comparing services, and starting a conversation quickly.",
    visual: "grid",
  },
];

function Visual({ p }: { p: Project }) {
  return (
    <div className={`work-preview work-preview--${p.visual}`} aria-hidden="true">
      <span className="work-preview__word">{p.title.split(" ")[0]}</span>
      <div className="work-device">
        <div className="work-device__bar">
          <i />
          <i />
          <i />
          <span>
            {p.href ? new URL(p.href).hostname : `${p.title.toLowerCase().replaceAll(" ", "")}.app`}
          </span>
        </div>
        <div className="work-device__screen">
          <div className="work-mock-nav">
            <strong>{p.title}</strong>
            <span>Discover &nbsp; About &nbsp; Contact</span>
          </div>
          <div className="work-mock-body">
            <span className="work-mock-label">A BETTER DIGITAL EXPERIENCE</span>
            <strong>
              {p.visual === "grid"
                ? "Make every\nweek count."
                : p.visual === "lines"
                  ? "Your next chapter\nstarts here."
                  : p.visual === "blocks"
                    ? "Everything you need.\nAll in one place."
                    : "Stories worth\ngetting lost in."}
            </strong>
            <span className="work-mock-copy">Thoughtfully designed. Built around you.</span>
            <span className="work-mock-button">
              Explore now <ArrowUpRight size={10} />
            </span>
          </div>
          <div className="work-mock-art">
            <span />
            <span />
            <span />
          </div>
          <div className="work-mock-footer">
            <span>Simple by design.</span>
            <span>Made for what’s next ↗</span>
          </div>
        </div>
      </div>
      <span className="work-device__stand" />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="work-card group">
      <Link
        href={project.href || "/contact"}
        aria-label={`${project.href ? "Visit" : "Discuss"} ${project.title}`}
        target={project.href ? "_blank" : undefined}
        rel={project.href ? "noopener noreferrer" : undefined}
        className="work-card__link"
      >
        <Visual p={project} />
        <div className="work-card__heading">
          <h3>{project.title}</h3>
          <ArrowUpRight size={19} aria-hidden="true" />
        </div>
        <p>{project.text}</p>
        <div className="work-card__meta">
          <span className="work-card__tag">{project.category}</span>
          <span className="work-card__action">
            {project.href ? "View live project" : "Discuss this project"}
            <ArrowUpRight size={13} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function Work({ limit }: { limit?: number }) {
  return (
    <section id="work" className="selected-work">
      <div className="mx-auto mb-16 w-full max-w-[1080px] md:mb-24">
        <Reveal>
          <p className="label-xs">Portfolio</p>
          <h2 className="mt-8 text-[clamp(2.6rem,8vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.05em]">
            Projects
          </h2>
        </Reveal>
      </div>
      <div className="work-grid">
        <Reveal className="work-intro">
          <p className="work-eyebrow">
            <span /> Some recent projects
          </p>
          <p className="work-intro__statement">
            Selected work that
            <br />
            delivers results.
          </p>
        </Reveal>
        {PROJECTS.slice(0, limit).map((project, index) => (
          <Reveal
            key={project.n}
            className={`work-item work-item--${index + 1}`}
            delay={(index % 2) * 80}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
        <Reveal className={`work-outro ${limit ? "work-outro--compact" : ""}`}>
          <p>
            Have something
            <br />
            great in mind?
          </p>
          <PillButton href={limit ? "/work" : "/contact"} variant="green">
            {limit ? "View all projects" : "Let us build it together"}
          </PillButton>
        </Reveal>
      </div>
    </section>
  );
}
