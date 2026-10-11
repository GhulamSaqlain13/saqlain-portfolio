import Link from "next/link";
import { ArrowUpRight, ArrowUp, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import { PillButton } from "@/components/Navbar";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Selected work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About me", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div>
            <p className="site-footer__eyebrow">GOOD PRODUCTS START WITH A CONVERSATION</p>
            <h2>
              Let&apos;s build what&apos;s next<span>.</span>
            </h2>
          </div>
          <PillButton href="/contact" variant="green">
            Get in touch
          </PillButton>
        </div>
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Logo />
            <p>
              Full-stack development for businesses with bigger ideas. Thoughtful design. Reliable
              code. Real purpose.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <h3>Explore</h3>
            <ul>
              {NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>
                    {label}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="site-footer__contact">
            <h3>Let&apos;s talk</h3>
            <a href="mailto:saqlainghulam78@gmail.com">
              <Mail size={16} aria-hidden="true" />
              <span>saqlainghulam78@gmail.com</span>
            </a>
            <a href="tel:+923448698452">+92 344 8698452</a>
            <a href="https://wa.me/923448698452">
              Chat on WhatsApp <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>&copy; {new Date().getFullYear()} Ghulam Saqlain. All rights reserved.</p>
          <a href="#main-content" aria-label="Back to top">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
