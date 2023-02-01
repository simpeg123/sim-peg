import { logout, getUserDetails } from '~/lib/session.server';
import { getEnv } from '~/env.server';
import { Form, useActionData } from '@remix-run/react';
import { json } from 'react-router';

export const action = async ({ request }) => {
    const url = getEnv().API;
    const formData = await request.formData();
    const user = await getUserDetails(request);

    const userId = user.user_id;
    const password = formData.get('password');
    const newPassword = formData.get('newPassword');

    const reqURL = `${url}/users/change-password`;
    const response = await fetch(reqURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: userId,
            old_password: password,
            new_password: newPassword,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return {
                error: err,
            };
        });

    if (response?.error) {
        return json({ error: response.error });
    }

    return logout(request);
};

function Settings() {
    const actionData = useActionData();

    return (
        <div>
            <h1 className='m-5 text-xl font-bold'>Ubah Password</h1>

            <div className='flex gap-2'>
                <div className='flex gap-2'>
                    <Form
                        method='post'
                        className='w-full max-w-xs p-5 ml-5 space-y-3 border rounded border-gray-400/20'
                    >
                        <h3 className='text-xs text-center text-error'>
                            {actionData?.error}
                        </h3>
                        <div className='flex flex-col gap-1'>
                            <span className='text-gray-400'>
                                Password Sekarang
                            </span>
                            <input
                                required={true}
                                type='password'
                                name='password'
                                placeholder='**********'
                                minLength={8}
                                maxLength={20}
                                pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
                                className='w-full input input-sm input-primary'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <span className='text-gray-400'>Password Baru</span>
                            <div className='block text-xs text-error'>
                                Minimal 8, ada angka & huruf
                            </div>
                            <input
                                required={true}
                                type='password'
                                name='newPassword'
                                placeholder='**********'
                                className='w-full input input-sm input-primary'
                                minLength={8}
                                maxLength={20}
                                pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full btn btn-secondary'
                        >
                            Simpan
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Settings;
