// src/utils/supabaseClient.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://muizndhkpdgmcvyctfim.supabase.co";
const supabaseKey: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("Supabase key is undefined");
}

const supabase = createClient(supabaseUrl, supabaseKey);
export const logout = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("supabaseSession");
  window.location.href = "/";
};

export default supabase;
