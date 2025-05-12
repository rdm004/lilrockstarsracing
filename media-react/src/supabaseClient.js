import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kwgkwmkvoweyhxxpjuhw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3Z2t3bWt2b3dleWh4eHBqdWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MDkxODQsImV4cCI6MjA2MjI4NTE4NH0.yDJM-xGZYuaqkq8u4kGd8DVMQTWFgq9XDYpyDnNmk34';

export const supabase = createClient(supabaseUrl, supabaseKey);