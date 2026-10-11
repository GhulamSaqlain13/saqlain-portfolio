import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  // Only initialize on client side
  if (typeof window === "undefined") {
    return null;
  }

  if (!supabaseInstance) {
    // Next.js embeds public environment variables when accessed directly.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase credentials are missing. Please check your .env.local file.");
      return null;
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }

  return supabaseInstance;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const client = getSupabaseClient();

    if (!client) {
      console.error("Supabase client not available");
      throw new Error("Unable to submit form. Please try again or contact via WhatsApp.");
    }

    const { data: result, error } = await client
      .from("contacts")
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
}
