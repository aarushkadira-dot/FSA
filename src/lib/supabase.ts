import { createClient } from "@supabase/supabase-js";

// Public project URL and publishable key. Both are safe to ship to the browser;
// data access is controlled by row level security in the database.
const SUPABASE_URL = "https://psmqabrmxceqwiznvqcb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_-xPWEir72q7jJMmvuTb4rg_E9XKPHJK";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

export type AccountStatus = "pending" | "approved" | "rejected";

export type Profile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  school_id: string | null;
  school_name: string | null;
  grade: string | null;
  subject: string | null;
  role: "teacher" | "admin";
  status: AccountStatus;
  created_at: string;
};
