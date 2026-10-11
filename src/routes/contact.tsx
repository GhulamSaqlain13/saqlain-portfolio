"use client";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Mail, Phone, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import Footer from "@/components/sections/Footer";
import { submitContactForm } from "@/lib/supabase";
import { toast } from "sonner";
import { DRAFT_KEY } from "@/lib/assistant-knowledge.mjs";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const WHATSAPP_NUMBER = "+923448698452";
const EMAIL = "saqlainghulam78@gmail.com";

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    function applyBrief() {
      try {
        const stored = sessionStorage.getItem(DRAFT_KEY);
        if (!stored) return;
        const draft = JSON.parse(stored);
        if (typeof draft?.subject !== "string" || typeof draft?.message !== "string") return;
        setValue("subject", draft.subject.slice(0, 160), { shouldDirty: true });
        setValue("message", draft.message.slice(0, 8000), { shouldDirty: true });
        sessionStorage.removeItem(DRAFT_KEY);
        toast.success(
          "Your project draft is filled in. Review it and add your contact details before sending.",
        );
      } catch {
        /* Keep the normal form available when browser storage is unavailable. */
      }
    }
    if (new URLSearchParams(window.location.search).get("brief") === "1") applyBrief();
    window.addEventListener("portfolio:brief", applyBrief);
    return () => window.removeEventListener("portfolio:brief", applyBrief);
  }, [setValue]);
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      toast.success("Message sent successfully! I'll get back to you soon.", {
        duration: 4000,
      });
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again or contact via WhatsApp.", {
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}
        <div>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Your Name *
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              placeholder="Your full name"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
            />
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email Address *
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
            />
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-foreground">
              Phone Number *
            </label>
            <input
              {...register("phone")}
              id="phone"
              type="tel"
              placeholder="+92 300 1234567"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium text-foreground">
              Project Subject *
            </label>
            <input
              {...register("subject")}
              id="subject"
              type="text"
              placeholder="e.g., E-commerce Website"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
            />
            {errors.subject && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.subject.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-foreground">
            Tell me about your project *
          </label>
          <textarea
            {...register("message")}
            id="message"
            placeholder="Describe your project idea, goals, timeline, and any specific requirements..."
            rows={6}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none"
          />
          {errors.message && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-foreground px-6 py-3 text-base font-semibold text-background transition-all duration-300 hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <CheckCircle className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background">
      <div className="page-banner">
        <Navbar />
      </div>
      <section className="contact-simple" aria-labelledby="contact-heading">
        <div className="contact-simple__intro">
          <p className="text-brand text-lg font-medium">Contact</p>
          <h1 id="contact-heading">Let&apos;s work together.</h1>
          <p>Have a project in mind? Tell me a little about it.</p>
        </div>
        <div className="contact-simple__grid">
          <div className="contact-simple__details">
            <h2>Start a conversation</h2>
            <p>Reach out directly or send a message using the form.</p>
            <a href={`mailto:${EMAIL}`}>
              <Mail size={19} />
              <span>
                <small>Email</small>
                {EMAIL}
              </span>
            </a>
            <a href={`tel:${WHATSAPP_NUMBER}`}>
              <Phone size={19} />
              <span>
                <small>Phone</small>
                {WHATSAPP_NUMBER}
              </span>
            </a>
            <a href="https://wa.me/923448698452">
              <MessageCircle size={19} />
              <span>
                <small>WhatsApp</small>Send a message
              </span>
            </a>
          </div>
          <div className="contact-simple__form">
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
