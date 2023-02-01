import { getEnv } from '~/env.server';
import { createClient } from '@supabase/supabase-js';

const ENV = getEnv();

const supabaseUrl = ENV.SUPABASE_URL;
const supabaseKey = ENV.SUPABASE_ANON_KEY;

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
