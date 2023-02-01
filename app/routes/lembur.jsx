import Sidebar from '~/components/sidebar';
import { Outlet, useLoaderData } from '@remix-run/react';
import { requireUserToken, getUserDetails } from '~/lib/session.server';
import { json } from '@remix-run/node';

export async function loader({ request }) {
    await requireUserToken(request, '/lembur');
    const user = await getUserDetails(request);
    return json({
        user,
    });
}

export default function Lembur() {
    const { user } = useLoaderData();

    return (
        <Sidebar user={user} active='lembur'>
            <Outlet />
        </Sidebar>
    );
}
