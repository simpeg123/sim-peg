import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { getEnv } from '~/env.server';

export const loader = async ({ request }) => {
    const apiURL = getEnv().API;
    return {
        apiURL,
    };
};

export default function Add() {
    const loaderData = useLoaderData();
    const URL = loaderData.apiURL;

    const addDataRequest = async () => {
        formData.awal_kerja = parseInt(formData.awal_kerja);
        formData.akhir_kerja = parseInt(formData.akhir_kerja);

        formData.gaji_pokok = parseFloat(formData.gaji_pokok);
        formData.tunjangan_kemahalan = parseFloat(formData.tunjangan_kemahalan);
        formData.tunjangan_perumahan = parseFloat(formData.tunjangan_perumahan);
        formData.tunjangan_perumahan = parseFloat(formData.tunjangan_perumahan);
        formData.tunjangan_jabatan = parseFloat(formData.tunjangan_jabatan);
        formData.tunjangan_lain_pph21 = parseFloat(
            formData.tunjangan_lain_pph21
        );

        const url = `${URL}/non-staff`;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .catch((err) => {
                alert('ups:' + err);
            });

        window.location.href = '/non-staff';
    };

    const [gender, setGender] = useState('M');
    const [pph21, setPph21] = useState('Beban Karyawan');
    const [golongan, setGolongan] = useState('PKWT');
    const [expat, setExpat] = useState('L');
    const [ptkp, setPtkp] = useState('K/0');
    const [statusKerja, setStatusKerja] = useState('Aktif');

    const [formData, setFormData] = useState({
        foto: 'https://sammidev.codes/sammi.png',
        status_pph_21: pph21,
        golongan: golongan,
        expat: expat,
        ptkp: ptkp,
        status_kerja: statusKerja,
        gender: gender,
        awal_kerja: 1,
        akhir_kerja: 12,
        tunjangan_kemahalan: 0.0,
        tunjangan_perumahan: 0.0,
        tunjangan_jabatan: 0.0,
        tunjangan_lain_pph21: 0.0,
    });

    return (
        <div className='ml-5'>
            <h1 className='my-5 text-xl font-bold'>Tambah Non Staff</h1>
            <div className='flex flex-col items-center justify-center w-full space-x-2 space-y-2'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addDataRequest();
                    }}
                    className='flex w-full gap-3 p-5 mx-auto place-content-center rounded-2xl'
                >
                    <div className='space-y-3'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Nomor Payroll</span>
                            <input
                                required={true}
                                type='text'
                                maxLength={'5'}
                                minLength={'5'}
                                className='w-56 input input-sm input-bordered'
                                placeholder='500123'
                                autoFocus={true}
                                value={formData.no_payroll}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        no_payroll: e.target.value,
                                    });
                                }}
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Nama</span>
                            <input
                                required={true}
                                type='text'
                                className='w-56 input input-sm input-bordered'
                                placeholder='Otong Surotong'
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        nama: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Status Pph 21</span>
                            <select
                                value={pph21}
                                required={true}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        status_pph_21: e.target.value,
                                    });
                                    setPph21(e.target.value);
                                }}
                                className='w-56 select select-sm select-bordered'
                            >
                                <option value='Beban Karyawan'>
                                    Beban Karyawan
                                </option>
                                <option value='Beban Perusahaan'>
                                    Beban Perusahaan
                                </option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Alamat</span>
                            <input
                                required={true}
                                type='text'
                                className='w-56 input input-sm input-bordered'
                                placeholder='JL Kenangan'
                                value={formData.alamat}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        alamat: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>NIK</span>
                            <input
                                required={true}
                                type='text'
                                maxLength={'16'}
                                minLength={'16'}
                                className='w-56 input input-sm input-bordered'
                                placeholder='1324323123131231'
                                value={formData.nik}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        nik: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>NPWP</span>
                            <input
                                required={true}
                                type='text'
                                maxLength={'15'}
                                minLength={'15'}
                                value={formData.npwp}
                                className='w-56 input input-sm input-bordered'
                                placeholder='142342342342342'
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        npwp: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className='space-y-3'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Jenis Kelamin</span>
                            <select
                                required={true}
                                value={gender}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        gender: gender,
                                    });
                                    setGender(e.target.value);
                                }}
                                className='w-56 select select-sm select-bordered'
                            >
                                <option value='M'>Laki-Laki</option>
                                <option value='F'>Perempuan</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Jabatan</span>
                            <input
                                required={true}
                                type='text'
                                value={formData.jabatan}
                                className='w-56 input input-sm input-bordered'
                                placeholder='Patroli Satpam'
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        jabatan: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Golongan</span>
                            <select
                                required={true}
                                value={golongan}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        gender: e.target.value,
                                    });
                                    setGolongan(e.target.value);
                                }}
                                className='w-56 select select-sm select-bordered'
                            >
                                <option value='PKWT'>PKWT</option>
                                <option value='I-1'>I-1</option>
                                <option value='I-2'>I-2</option>
                                <option value='I-3'>I-3</option>
                                <option value='I-4'>I-4</option>
                                <option value='I-5'>I-5</option>
                                <option value='I-6'>I-6</option>
                                <option value='I-7'>I-7</option>
                                <option value='I-8'>I-8</option>
                                <option value='I-9'>I-9</option>
                                <option value='II-1'>II-1</option>
                                <option value='II-2'>II-2</option>
                                <option value='II-3'>II-3</option>
                                <option value='II-4'>II-4</option>
                                <option value='II-5'>II-5</option>
                                <option value='II-6'>II-6</option>
                                <option value='II-7'>II-7</option>
                                <option value='II-8'>II-8</option>
                                <option value='II-9'>II-9</option>
                                <option value='III-1'>III-1</option>
                                <option value='III-2'>III-2</option>
                                <option value='III-3'>III-3</option>
                                <option value='III-4'>III-4</option>
                                <option value='III-5'>III-5</option>
                                <option value='III-6'>III-6</option>
                                <option value='III-7'>III-7</option>
                                <option value='III-8'>III-8</option>
                                <option value='III-9'>III-9</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-1'>
                            {/*
                                    Expat L: Expat ini dipekerjakan oleh perusahaan dari negara asalnya, tetapi dipekerjakan di luar negara tersebut.
                                    Expat F: Expat yang dipekerjakan oleh perusahaan asing di negara yang berbeda dari negara asalnya.
                                */}

                            <span className='text-xs'>Expat</span>
                            <select
                                required={true}
                                value={expat}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        expat: e.target.value,
                                    });
                                    setExpat(e.target.value);
                                }}
                                className='w-56 select select-sm select-bordered'
                            >
                                <option value='L'>L</option>
                                <option value='F'>F</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>PTKP</span>
                            <select
                                required={true}
                                value={ptkp}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        ptkp: e.target.value,
                                    });
                                    setPtkp(e.target.value);
                                }}
                                className='w-56 select select-sm select-bordered'
                            >
                                <option value='K/0'>K/0</option>
                                <option value='K/1'>K/1</option>
                                <option value='K/2'>K/2</option>
                                <option value='K/3'>K/3</option>
                                <option value='TK/0'>TK/0</option>
                                <option value='TK/1'>TK/1</option>
                                <option value='TK/2'>TK/2</option>
                                <option value='TK/3'>TK/3</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Status Kerja</span>
                            <select
                                required={true}
                                value={statusKerja}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        status_kerja: e.target.value,
                                    });
                                    setStatusKerja(e.target.value);
                                }}
                                className='w-56 select select-sm select-bordered'
                            >
                                <option value='Aktif'>Aktif</option>
                                <option value='Tidak Aktif'>Tidak Aktif</option>
                            </select>
                        </div>
                    </div>

                    <div className='space-y-3'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Awal Kerja</span>
                            <input
                                required={true}
                                type='number'
                                className='w-56 input input-sm input-bordered'
                                placeholder={1}
                                value={formData.awal_kerja}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        awal_kerja: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Akhir Kerja</span>
                            <input
                                required={true}
                                type='number'
                                className='w-56 input input-sm input-bordered'
                                placeholder={12}
                                value={formData.akhir_kerja}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        akhir_kerja: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Gaji Pokok</span>
                            <input
                                required={true}
                                type='number'
                                className='w-56 input input-sm input-bordered'
                                placeholder='5000000'
                                value={formData.gaji_pokok}
                                onChange={(e) => {
                                    const target = e.target.value;
                                    const targetWithoutDotAndComma =
                                        target.replace(/[,]/g, '');
                                    setFormData({
                                        ...formData,
                                        gaji_pokok: targetWithoutDotAndComma,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className='space-y-3'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Tunjangan Kemahalan</span>
                            <input
                                required={true}
                                type='text'
                                className='w-56 input input-sm input-bordered'
                                placeholder='50000'
                                value={formData.tunjangan_kemahalan}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        tunjangan_kemahalan: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Tunjangan Perumahan</span>

                            <input
                                required={true}
                                className='w-56 input input-sm input-bordered'
                                placeholder='20000'
                                value={formData.tunjangan_perumahan}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        tunjangan_perumahan: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Tunjangan Jabatan</span>
                            <input
                                required={true}
                                className='w-56 input input-sm input-bordered'
                                placeholder='35000'
                                value={formData.tunjangan_jabatan}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        tunjangan_jabatan: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs'>Tunjangan Lain lain</span>
                            <input
                                required={true}
                                className='w-56 input input-sm input-bordered'
                                placeholder='55000'
                                value={formData.tunjangan_lain_pph21}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        tunjangan_lain_pph21: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <button
                            type='submit'
                            className='w-56 btn btn-success btn-sm'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
