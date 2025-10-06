import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;
if (isSupabaseConfigured) {
  client = createClient(supabaseUrl as string, supabaseAnonKey as string);
} else {
  // Avoid hard crash in production builds if env vars are missing.
  // This keeps the app rendering and logs a clear message for troubleshooting.
  console.warn('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Supabase is disabled.');
}

export const supabase = client;

export interface Project {
  id: string;
  title: string;
  description: string;
  project_type: string;
  location: string;
  image_url: string;
  gallery_images: string[];
  completion_date: string;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ConsultationRequest {
  client_name: string;
  email: string;
  phone: string;
  project_type: string;
  location: string;
  budget_range: string;
  preferred_date?: string;
  message?: string;
}
