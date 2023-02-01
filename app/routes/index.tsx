import Sidebar from '~/components/sidebar';

import { getUserDetails, requireUserToken } from '~/lib/session.server';
import { LoaderArgs, json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getTotalNonStaff } from '~/models/dashboard.server';
import {
    type Icon,
    Users,
    DollarSign,
    Moon,
    Settings,
    Search,
} from 'react-feather';
import TwoLines from '../assets/twoLines.svg';
import Note from '../assets/note.svg';
import ClockIcon from '../assets/clock.svg';

export async function loader({ request }: LoaderArgs) {
    await requireUserToken(request, '/');
    const user = await getUserDetails(request);

    const { totalNonStaff } = await getTotalNonStaff();

    return json({
        user,
        totalNonStaff,
    });
}

export function DashboardItemCardSimple({
    title,
    href,
    gradient,
    Icon,
    rightIcon,
}: {
    title: string;
    href: string;
    gradient: string;
    Icon: Icon;
    rightIcon: string;
}) {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions | undefined = {
        year: 'numeric',
        month: 'long',
    };
    const dateNow = date.toLocaleDateString('id-ID', options);

    return (
        <div
            className={`p-5 ml-5 flex flex-col justify-between gap-3 shadow-2xl hover:shadow-yellow-500/30 w-60 rounded-xl shadow-black bg-gradient-to-bl ${gradient}`}
        >
            <div className='flex items-center justify-between'>
                <Icon className='w-12 h-12 text-yellow-500 fill-current stroke-yellow-500 ' />
                <img
                    src={rightIcon}
                    alt='two lines'
                    className={`w-8 h-8 stroke-yellow-500`}
                />
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <span className='text-lg font-bold'>{title}</span>
                    <span className='text-xs text-gray-300'>{dateNow}</span>
                </div>
                <div>
                    <span className='text-lg font-semibold'>
                        {title == 'Rekapitulasi' ? (
                            <label
                                htmlFor='my-modal'
                                className='btn btn-outline btn-sm btn-warning'
                            >
                                Lihat
                            </label>
                        ) : (
                            <span className='text-lg font-semibold'>
                                <Link to={href}>
                                    <button className='btn btn-outline btn-sm btn-warning'>
                                        Lihat
                                    </button>
                                </Link>
                            </span>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

export function DashboardItemCard({
    title,
    href,
    total,
    gradient,
    Icon,
    rightIcon,
}: {
    title: string;
    href: string;
    total: any;
    gradient: string;
    Icon: Icon;
    rightIcon: string;
}) {
    return (
        <div
            className={`p-5 ml-5 flex flex-col justify-between gap-3 shadow-2xl hover:shadow-yellow-500/30 w-60 rounded-xl shadow-black bg-gradient-to-bl ${gradient}`}
        >
            <div className='flex items-center justify-between'>
                <Icon className='w-12 h-12 text-yellow-500 fill-current stroke-yellow-500 ' />
                <img
                    src={rightIcon}
                    alt='two lines'
                    className={`w-8 h-8 stroke-yellow-500`}
                />
            </div>

            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <span className='text-lg font-bold'>{title}</span>
                    <span className='text-xs text-gray-300'>{total} Orang</span>
                </div>
                <div>
                    <span className='text-lg font-semibold'>
                        <Link to={href}>
                            <button className='btn btn-outline btn-sm btn-warning'>
                                Lihat
                            </button>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

function App() {
    const { totalNonStaff, user } = useLoaderData();

    return (
        <Sidebar user={user}>
            <div className='w-full'>
                <div className='flex items-center justify-between ml-5'>
                    <div className='flex items-center gap-1 border group rounded-2xl border-gray-200/10 hover:border-gray-200/30 w-60'>
                        <Search className='w-5 h-5 ml-5 text-gray-400 group-hover:stroke-yellow-500' />
                        <input
                            type='text'
                            placeholder='Cari ... '
                            className='w-full max-w-xs px-2 py-2 bg-transparent border-none group-hover:placeholder:text-yellow-500 active:border-none outline-0 rounded-xl'
                        />
                    </div>
                    <Link
                        to={'/settings'}
                        className='p-2 border rounded-full hover:border-gray-200/30 group border-gray-200/10'
                    >
                        <Settings className='w-5 h-5 text-gray-400 group-hover:stroke-yellow-500' />
                    </Link>
                </div>

                <h1 className='m-5 text-xl font-bold'>Dashboard</h1>

                <div className='flex flex-wrap gap-3'>
                    <DashboardItemCard
                        title={'Non Staff'}
                        href={'/non-staff'}
                        total={totalNonStaff}
                        gradient={
                            'from-[#312923] to-[#1B1A1F] border-[#312923] border'
                        }
                        Icon={Users}
                        rightIcon={TwoLines}
                    />

                    <DashboardItemCardSimple
                        title={'Rekapitulasi'}
                        href={'/lembur'}
                        gradient={
                            'from-[#1A373A] to-[#1B1A1F] border-[#1A373A] border'
                        }
                        Icon={DollarSign}
                        rightIcon={Note}
                    />
                    <DashboardItemCardSimple
                        title={'Lembur'}
                        href={'/lembur'}
                        gradient={
                            'from-[#324d1b] to-[#1B1A1F] border-[#1A373A] border'
                        }
                        Icon={Moon}
                        rightIcon={ClockIcon}
                    />
                    <div className='bg-[#324d1b]'></div>
                </div>
            </div>
        </Sidebar>
    );
}

export default App;
