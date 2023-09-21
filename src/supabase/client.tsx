import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "Las variables de entorno de Supabase no están configuradas correctamente."
  );
}

export const client = createClient(supabaseUrl, supabaseServiceKey);
