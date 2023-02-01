import Sidebar from '~/components/sidebar';
import { Outlet, useLoaderData } from '@remix-run/react';
import { createContext, useEffect, useState } from 'react';

import { requireUserToken, getUserDetails } from '~/lib/session.server';
import { json } from '@remix-run/node';
import { getEnv } from '~/env.server';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export async function loader({ request }) {
    await requireUserToken(request, '/');
    const user = await getUserDetails(request);

    const supabaseURL = getEnv().SUPABASE_URL;
    const supabaseAnonKey = getEnv().SUPABASE_ANON_KEY;
    const baseImageURL = getEnv().SUPABASE_URL_IMAGE_PATH;
    const apiURL = getEnv().API;

    return json({
        user,
        apiURL,
        baseImageURL,
        supabaseURL,
        supabaseAnonKey,
    });
}

export const UserContext = createContext();

export default function Settings() {
    const { user, apiURL, baseImageURL, supabaseURL, supabaseAnonKey } =
        useLoaderData();
    const supabase = createClient(supabaseURL, supabaseAnonKey);

    const [user_id, setUser_id] = useState(user.user_id);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const [photo, setPhoto] = useState(user.photo);

    return (
        <Sidebar user={user} active='settings'>
            <UserContext.Provider
                value={{
                    user_id,
                    name,
                    email,
                    photo,
                    role,
                    setUser_id,
                    setName,
                    setEmail,
                    setRole,
                    setPhoto,
                    apiURL,
                    baseImageURL,
                }}
            >
                <SessionContextProvider supabaseClient={supabase}>
                    <Outlet />
                </SessionContextProvider>
            </UserContext.Provider>
        </Sidebar>
    );
}
