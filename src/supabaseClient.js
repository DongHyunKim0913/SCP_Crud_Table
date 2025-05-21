import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cgnqkwtnnfxrkmahcfha.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbnFrd3RubmZ4cmttYWhjZmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NDA1NDgsImV4cCI6MjA2MjAxNjU0OH0.v6f0NoxJiYbNuh5M3XsMRcnVyUhBRIuFHftuqXUTfSw';
export const supabase = createClient(supabaseUrl, supabaseKey);
