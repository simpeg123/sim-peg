import { Link, useLoaderData } from '@remix-run/react';
import React, { useState } from 'react';
import Logo from '../assets/hutahaean-logo.png';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { getEnv } from '~/env.server';
import { Loader } from 'react-feather';

export const loader = async () => {
    const supabaseURL = getEnv().SUPABASE_URL;
    const supabaseAnonKey = getEnv().SUPABASE_ANON_KEY;
    const baseImageURL = getEnv().SUPABASE_URL_IMAGE_PATH;
    const apiURL = getEnv().API;

    return {
        apiURL,
        baseImageURL,
        supabaseURL,
        supabaseAnonKey,
    };
};

function WrapRegister() {
    const loaderData = useLoaderData();
    const baseImageURL = loaderData.baseImageURL;
    const apiURL = loaderData.apiURL;

    const supabase = createClient(
        loaderData.supabaseURL,
        loaderData.supabaseAnonKey
    );

    return (
        <SessionContextProvider supabaseClient={supabase}>
            <Register baseImageURL={baseImageURL} apiURL={apiURL} />
        </SessionContextProvider>
    );
}

function Register({ baseImageURL, apiURL }) {
    const supabase = useSupabaseClient();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [photoUploadedMessage, setPhotoUploadedMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        password: '',
        photo: '',
    });

    async function uploadImage(e) {
        if (
            formData.name === '' ||
            formData.role === '' ||
            formData.email === '' ||
            formData.password === ''
        ) {
            alert('Mohon lengkapi data');
            return;
        }

        setIsUploading(true);
        setPhotoUploadedMessage('Sedang mengupload gambar...');

        const name = formData.name.split(' ').join('_');
        let file = e.target.files[0];

        const fileName = name + '-' + uuidv4();

        const { error } = await supabase.storage
            .from('images')
            .upload(fileName, file);
        if (error) {
            alert('terjadi masalah saat upload foto profil');
        }

        formData.photo = `https://${baseImageURL}.supabase.co/storage/v1/object/public/images/${fileName}`;
        setIsUploading(false);
        setPhotoUploadedMessage('Foto profil berhasil diupload');
    }

    const [errorMessage, setErrorMessage] = useState('');

    return (
        <div className='grid w-full min-h-screen grid-cols-1 pt-2 text-gray-400'>
            <div className='w-full max-w-xs mx-auto mt-12'>
                <h2 className='text-3xl font-bold leading-tight text-center text-gray-200 sm:text-4xl'>
                    Sign up
                </h2>
                <p className='mt-2 text-base text-center text-gray-300'>
                    Sudah punya akun?
                    <Link
                        to='/login'
                        className='font-medium text-teal-500 transition-all duration-200 hover:text-teal-700 hover:underline focus:text-teal-700'
                    >
                        {' '}
                        Sign In
                    </Link>
                </p>

                <form
                    method='POST'
                    className='mt-5'
                    onSubmit={(e) => {
                        e.preventDefault();

                        setErrorMessage('');
                        setIsSubmitting(true);

                        const URL = apiURL + '/users/register';
                        fetch(URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.error) {
                                    setErrorMessage(data.error);
                                } else {
                                    window.location.href = '/login';
                                }
                            })
                            .catch((err) => {
                                alert(err);
                            });
                        setIsSubmitting(false);
                    }}
                >
                    <div className='p-5 space-y-5 border rounded border-green-500/30'>
                        <div>
                            <img
                                src={Logo}
                                className='object-cover w-20 h-20 mx-auto mb-8'
                                alt='logo pt hutahaean'
                            />

                            <label
                                htmlFor
                                className='text-base font-medium text-gray-300'
                            >
                                {' '}
                                Nama{' '}
                            </label>
                            <div className='mt-1.5'>
                                <input
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        });
                                    }}
                                    type='text'
                                    name='name'
                                    autoFocus={true}
                                    required={true}
                                    placeholder='Masukkan Nama'
                                    className='w-full input input-success'
                                />
                            </div>
                        </div>{' '}
                        <div>
                            <label
                                htmlFor
                                className='text-base font-medium text-gray-300'
                            >
                                {' '}
                                Role{' '}
                            </label>
                            <div className='mt-1.5'>
                                <input
                                    value={formData.role}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            role: e.target.value,
                                        });
                                    }}
                                    type='text'
                                    name='role'
                                    required={true}
                                    placeholder='Masukkan Role'
                                    className='w-full input input-success'
                                />
                            </div>
                        </div>{' '}
                        <div>
                            <label
                                htmlFor
                                className='text-base font-medium text-gray-300'
                            >
                                {' '}
                                Email address{' '}
                            </label>
                            <div className='mt-1.5'>
                                <input
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        });
                                    }}
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

                            <div className='block text-xs text-error'>
                                Minimal 8, ada angka & huruf
                            </div>
                            <div className='mt-1.5'>
                                <input
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        });
                                    }}
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
                        </div>{' '}
                        <div>
                            <div className='flex items-center justify-between'>
                                <label
                                    htmlFor
                                    className='text-base font-medium text-gray-300'
                                >
                                    Masukkan Foto{' '}
                                    <span className='text-xs text-yellow-500'>
                                        {photoUploadedMessage}
                                    </span>
                                </label>
                            </div>
                            <div className='mt-1.5'>
                                <input
                                    type='file'
                                    required={true}
                                    name='photo'
                                    accept='image/*'
                                    className='w-full file file-input file-input-success'
                                    onChange={(e) => {
                                        uploadImage(e);
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            {isSubmitting || isUploading ? (
                                <button
                                    disabled={isUploading || isSubmitting}
                                    type='submit'
                                    className='w-full btn btn-success'
                                >
                                    <Loader className='w-5 h-5 animate-spin' />
                                </button>
                            ) : (
                                <button
                                    disabled={isUploading || isSubmitting}
                                    type='submit'
                                    className='w-full btn btn-success'
                                >
                                    Register
                                </button>
                            )}

                            <p className='mt-3 text-xs text-center text-error'>
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WrapRegister;
