import { Briefcase, Home, LogOut, Moon, Settings } from 'react-feather';

import { Link } from '@remix-run/react';

export default function Sidebar({
    user = {
        name: 'Anonymous',
        role: 'Guest',
        photo: 'https://i.pravatar.cc/300',
    },
    active = 'dashboard',
    children,
}) {
    const activeLinkStyle =
        'group border-teal-400 text-teal-400 font-semibold border-l-2';
    const activeIconStyle = '';

    return (
        // h-screen sticky top-0
        <div className='flex w-full text-white bg-transparent'>
            <div className='sticky top-0 h-screen p-3 space-y-8 shadow shadow-xl shadow-white/10 w-52'>
                <div className=''>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <div className='avatar online'>
                            <div className='w-16 rounded-full'>
                                <img src={user.photo} alt='zulham' />
                            </div>
                        </div>

                        <div>
                            <h1 className='text-sm font-bold text-center text-white'>
                                {user.name}
                            </h1>
                            <h2 className='text-xs text-center text-gray-300'>
                                {user.role}
                            </h2>
                        </div>
                    </div>
                </div>

                <ul className='space-y-1 text-sm '>
                    <li>
                        <Link
                            prefetch='intent'
                            to='/'
                            className={`flex items-center p-2 group space-x-3 hover:border-l hover:border-l-gray-200 text-white  ${
                                active === 'dashboard' && activeLinkStyle
                            }`}
                        >
                            <Home
                                className={`w-4 h-4 group-hover:transform group-hover:rotate-12  ${
                                    active === 'dashboard'
                                        ? activeIconStyle
                                        : 'stroke-gray-400'
                                }`}
                            />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            prefetch='intent'
                            to='/non-staff'
                            className={`flex items-center p-2 group space-x-3 hover:border-l hover:border-l-gray-200 text-white  ${
                                active === 'non-staff' && activeLinkStyle
                            }`}
                        >
                            <Briefcase
                                className={`w-4 h-4 group-hover:transform group-hover:rotate-12  ${
                                    active === 'non-staff'
                                        ? activeIconStyle
                                        : 'stroke-gray-400'
                                }`}
                            />
                            <span>Non Staff</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            prefetch='intent'
                            to='/lembur'
                            className={`flex items-center p-2 group space-x-3 hover:border-l hover:border-l-gray-200 text-white  ${
                                active === 'lembur' && activeLinkStyle
                            }`}
                        >
                            <Moon
                                className={`w-4 h-4 group-hover:transform group-hover:rotate-12  ${
                                    active === 'lembur'
                                        ? activeIconStyle
                                        : 'stroke-gray-400'
                                }`}
                            />
                            <span>Lembur</span>
                        </Link>
                    </li>
                    <div className='divider'></div>
                    <li>
                        <Link
                            prefetch='intent'
                            to='/settings'
                            className={`flex items-center p-2 group space-x-3 hover:border-l hover:border-l-gray-200 text-white  ${
                                active === 'settings' && activeLinkStyle
                            }`}
                        >
                            <Settings
                                className={`w-4 h-4 group-hover:transform group-hover:rotate-12  ${
                                    active === 'settings'
                                        ? activeIconStyle
                                        : 'stroke-gray-400'
                                }`}
                            />
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li>
                        <form
                            action='/logout'
                            method='post'
                            className={`hover:cursor-pointer p-2 group group space-x-3 hover:text-red-600 text-red-400  ${
                                active === 'logout' && activeLinkStyle
                            }`}
                        >
                            <button
                                type='submit'
                                className='flex items-center gap-2'
                            >
                                <LogOut className='w-4 h-4 stroke-red-400 group-hover:stroke-red-600 ' />
                                Log Out
                            </button>
                        </form>
                    </li>
                </ul>
            </div>

            <div>
                <div className='w-full pt-5 pb-12 pl-5 my-4 ml-8 rounded-3xl'>
                    {children}
                </div>
            </div>
        </div>
    );
}
