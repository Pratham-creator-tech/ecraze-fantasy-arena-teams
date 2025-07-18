// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jfilncyheyjuftiklnbb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaWxuY3loZXlqdWZ0aWtsbmJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzODg4ODksImV4cCI6MjA2Nzk2NDg4OX0.gMOo3O8E7LlDRs1-B6BG7FOJiwuv6Cy1xShTO1vWBks";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});