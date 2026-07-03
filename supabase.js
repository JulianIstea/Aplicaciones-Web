/* ============================================
   ColdMax - Conexión a Supabase
   ============================================
   IMPORTANTE: Configurar Row Level Security (RLS):
   1. Habilitar RLS en tabla 'productos'
   2. Policy SELECT: permitir a todos (anon)
   3. Policy INSERT/UPDATE/DELETE: solo usuarios autenticados
   
   La key anon es pública por diseño de Supabase.
   Sin RLS, cualquier persona puede modificar los datos.
   ============================================ */

const SUPABASE_URL = 'https://ohtmgvnxxvtwlselkinu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odG1ndm54eHZ0d2xzZWxraW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNzExNDMsImV4cCI6MjA5NzY0NzE0M30.BkWPJFvyD50NmMonvaMdGgmJReaXsAvtbpeKTprTuHI';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/*
-- SQL para configurar RLS en Supabase (ejecutar en SQL Editor):

-- Habilitar RLS
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Policy: todos pueden leer
CREATE POLICY "Allow SELECT" ON productos
    FOR SELECT USING (true);

-- Policy: solo autenticados pueden insertar
CREATE POLICY "Allow INSERT" ON productos
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy: solo autenticados pueden actualizar
CREATE POLICY "Allow UPDATE" ON productos
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy: solo autenticados pueden eliminar
CREATE POLICY "Allow DELETE" ON productos
    FOR DELETE USING (auth.role() = 'authenticated');
*/
