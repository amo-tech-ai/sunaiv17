
import { createClient } from '@supabase/supabase-js';

// Safely access env to prevent crashes if import.meta.env is undefined
// Cast to any to resolve TypeScript error: Property 'env' does not exist on type 'ImportMeta'
const env = (import.meta as any).env || {};

// Credentials provided in prompt
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://necxcwhuzylsumlkkmlk.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_LFstdKVxHEJ5wntLWtmCoA_P-mQ92kS';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Edge functions will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
