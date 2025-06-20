import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nxldluymmvxhwklqfcsb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54bGRsdXltbXZ4aHdrbHFmY3NiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODk1NTcwNywiZXhwIjoyMDY0NTMxNzA3fQ.GC87diHQ6bGNYmZeFEcVb3dkLJMrCPvwR9DJqK7K0Xk';
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;