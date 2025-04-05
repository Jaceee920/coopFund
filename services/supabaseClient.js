import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and anon key
const supabaseUrl = 'https://fhxofxjplxexfbgvndyt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoeG9meGpwbHhleGZiZ3ZuZHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NTUwNzQsImV4cCI6MjA1ODIzMTA3NH0.bt_fDbxUVbpHuqpykph6oTNtg3DlZk_cYdCyFXHSZ2A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

        