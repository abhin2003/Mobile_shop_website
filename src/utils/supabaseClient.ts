import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nquntnxfgokmfymhybmf.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_gZF0T7t47dRGV9FkvXDz3w_7eyjNkGK';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
