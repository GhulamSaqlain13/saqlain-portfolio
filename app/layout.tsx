import ClientAssistant from "@/components/ClientAssistant";
import SiteMotion from "@/components/SiteMotion";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles.css";
import { Toaster } from "sonner";
import WhatsAppButton from "@/components/WhatsAppButton";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Ghulam Saqlain | Full-Stack Developer",
  description:
    "Portfolio website for Ghulam Saqlain, a full-stack developer building modern business-focused digital products.",
  authors: [{ name: "Ghulam Saqlain" }],
  openGraph: {
    title: "Ghulam Saqlain | Full-Stack Developer",
    description:
      "Portfolio website for Ghulam Saqlain, a full-stack developer building modern business-focused digital products.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable} data-scroll-behavior="smooth">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
        <SiteMotion />
        <WhatsAppButton />
        <ClientAssistant />
        <Toaster theme="dark" richColors />
      </body>
    </html>
  );
}
