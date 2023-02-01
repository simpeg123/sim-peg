import { Form, Link, useActionData } from '@remix-run/react';
import Logo from '../assets/hutahaean-logo.png';
import { getEnv } from '~/env.server';
import { createUserSession } from '../lib/session.server';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const apiURL = getEnv().API;

    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch(`${apiURL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return {
                error: err.message,
            };
        });

    if (response.error) {
        return {
            errMessage: response.error,
        };
    }

    return createUserSession(
        {
            token: response.access_token,
            user_id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            photo: response.user.photo,
        },
        '/'
    );
};

function Login() {
    const actionData = useActionData();

    return (
        <div className='grid w-full min-h-screen grid-cols-1 pt-2 text-gray-400'>
            <div className='w-full max-w-xs mx-auto mt-12'>
                <h2 className='text-3xl font-bold leading-tight text-center text-gray-200 sm:text-4xl'>
                    Sign in
                </h2>
                <p className='mt-2 text-base text-center text-gray-300'>
                    Belum punya akun?
                    <Link
                        to='/register'
                        className='font-medium text-green-500 transition-all duration-200 hover:text-teal-700 hover:underline focus:text-teal-700'
                    >
                        {' '}
                        Sign Up
                    </Link>
                </p>

                <Form method='post' className='mt-5'>
                    <div className='p-5 space-y-5 border rounded border-green-500/30'>
                        <div>
                            <img
                                src={Logo}
                                className='object-cover w-20 h-20 mx-auto mb-8'
                                alt='logo pt hutahaean'
                            />

                            <label className='text-base font-medium text-gray-300 '>
                                Email address
                            </label>
                            <div className='mt-1.5'>
                                <input
                                    autoFocus={true}
                                    type='email'
                                    name='email'
                                    required={true}
                                    placeholder='Masukkan Email'
                                    className='w-full input input-success'
                                />
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center justify-between'>
                                <label
                                    htmlFor
                                    className='text-base font-medium text-gray-300'
                                >
                                    Password
                                </label>
                            </div>
                            <div className='mt-1.5'>
                                <input
                                    type='password'
                                    required={true}
                                    name='password'
                                    placeholder='Masukkan Password'
                                    className='w-full input input-success'
                                    minLength={8}
                                    maxLength={20}
                                    pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='w-full btn btn-success'
                            >
                                Log In
                            </button>
                            <p className='mt-3 text-xs text-center text-error'>
                                {actionData?.errMessage}
                            </p>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
