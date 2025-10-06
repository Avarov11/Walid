import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
