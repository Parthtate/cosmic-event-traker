import { createClient } from "@supabase/supabase-js";

// 1️  Read credentials from .env (add them in Vercel too)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 2️ Create a single client for the whole app
export const supabase = createClient(supabaseUrl, supabaseAnon);
