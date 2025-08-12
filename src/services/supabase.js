import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fohawhpjagcutkswfczs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvaGF3aHBqYWdjdXRrc3dmY3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MjI0NzksImV4cCI6MjA2ODM5ODQ3OX0.e07SgRj_tcra1Xm7LUaH9I1w0mfGpd3jwnWbjNuEMDA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
