export function getEnv() {
    return {
        API: process.env.API,
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
        SUPABASE_URL_IMAGE_PATH: process.env.SUPABASE_URL_IMAGE_PATH,
        SESSION_SECRET: process.env.SESSION_SECRET,
    };
}
