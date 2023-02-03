import React, { useContext } from 'react';
import { UserContext } from '../settings';
import { Link } from '@remix-run/react';

function Index() {
    const userContext = useContext(UserContext);
    return (
        <div className='flex flex-col m-5 gap-y-3'>
            <h1 className='text-xl font-bold '>Settings</h1>
            <div className='flex flex-col items-start justify-center p-5 border rounded-lg from-[#1A373A] to-[#1B1A1F] border-[#1A373A] bg-gradient-to-br  hover:shadow hover:shadow-xl hover:shadow-yellow-300/50'>
                <div className='flex items-center gap-5'>
                    <img
                        src={userContext.photo}
                        alt='profile'
                        className='object-cover w-20 h-20 border border-2 border-teal-300 rounded-full'
                    />
                    <div className='flex flex-col gap-1'>
                        <span className='text-lg font-semibold'>
                            {userContext.name}
                        </span>
                        <span className='text-xs text-gray-400'>
                            {userContext.role}
                        </span>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <Link to='/settings/profile' prefetch='intent'>
                        <button className='mt-5 btn btn-sm'>
                            Edit Profile
                        </button>
                    </Link>

                    <Link to='/settings/change-password' prefetch='intent'>
                        <button className='mt-5 btn btn-sm'>
                            Ubah Password
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Index;
