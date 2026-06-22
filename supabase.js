/* ============================================
   ColdMax - Conexión a Supabase
   ============================================ */

const SUPABASE_URL = 'https://ohtmgvnxxvtwlselkinu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odG1ndm54eHZ0d2xzZWxraW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNzExNDMsImV4cCI6MjA5NzY0NzE0M30.BkWPJFvyD50NmMonvaMdGgmJReaXsAvtbpeKTprTuHI';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
