import { type LoaderArgs, type MetaFunction, json } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react';

import styles from './styles/app.css';
import globalsStyles from './styles/globals.css';
import { getEnv } from './env.server';
import { useState } from 'react';
import { XCircle } from 'react-feather';

export function links() {
    return [
        { rel: 'stylesheet', href: styles },
        { rel: 'stylesheet', href: globalsStyles },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=SF+Pro+Text&display=swap',
        },
    ];
}

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Simpeg',
    viewport: 'width=device-width,initial-scale=1',
});

export async function loader({ request }: LoaderArgs) {
    return json({
        ENV: getEnv(),
    });
}

const currentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month < 10 ? `0${month}` : month}`;
};

export default function App() {
    const data = useLoaderData<typeof loader>();

    const [date, setDate] = useState(currentDate());
    const [url, setURL] = useState(
        `${data.ENV.API}/generate-report?date=${date}`
    );

    return (
        <html lang='en' data-theme='dark'>
            <head>
                <Meta />
                <Links />
            </head>
            <body className='bg-[#0C0B10]'>
                <main className='w-full min-h-screen antialiased'>
                    <Outlet />
                    {/* <div className='absolute bottom-5'>
                        <div className='flex flex-col items-center justify-center gap-2 '>
                            <img
                                className='w-10 h-10 text-violet-400'
                                src={Logo}
                                alt=''
                            />
                            <div className='text-xs font-semibold text-gray-300'>
                                <span>Hutahaean Group</span>
                            </div>
                        </div>
                    </div> */}
                </main>
                <ScrollRestoration />
                <Scripts />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.ENV = ${JSON.stringify(data.ENV)};`,
                    }}
                />
                <LiveReload />

                <input type='checkbox' id='my-modal' className='modal-toggle' />
                <div className='modal'>
                    <div className='modal-box'>
                        <h3 className='text-lg font-bold'>Rekapitulasi</h3>
                        <div className='mt-8'>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    window.open(url, '_blank');
                                }}
                                className='flex flex-col items-center gap-2'
                            >
                                <span className='text-sm text-yellow-300'>
                                    Masukkan tahun & tanggal rekapitulasi
                                </span>
                                <div className='flex flex-col items-center gap-2'>
                                    <input
                                        value={date}
                                        onChange={(e) => {
                                            setDate(e.target.value);
                                            setURL(
                                                `${data.ENV.API}/generate-report?date=${e.target.value}`
                                            );
                                        }}
                                        name='date'
                                        placeholder='Filter...'
                                        className='input input-bordered input-info w-36'
                                    />
                                    <button
                                        type='submit'
                                        className='btn w-36 btn-success'
                                    >
                                        Download
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className='modal-action'>
                            <label
                                htmlFor='my-modal'
                                className='flex items-center gap-1 text-xs group btn btn-sm btn-warning'
                            >
                                <XCircle className='w-4 h-4 stroke-black' />
                                Tutup
                            </label>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
