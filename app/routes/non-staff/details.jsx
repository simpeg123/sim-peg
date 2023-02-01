import { useEffect, useState } from 'react';
import { getEnv } from '~/env.server';
import { useLoaderData } from '@remix-run/react';
import { getCurrentDate } from '~/lib/utils';
import { Loader } from 'react-feather';

export const loader = async ({ request }) => {
    const apiURL = getEnv().API;
    const url = new URL(request.url);

    const id = url.searchParams.get('id');
    let noPayroll = url.searchParams.get('no_payroll');
    let date = url.searchParams.get('date');
    if (date === null) {
        date = getCurrentDate();
    }

    return {
        id,
        noPayroll,
        date,
        apiURL,
    };
};

export default function Details() {
    const loaderData = useLoaderData();

    const id = loaderData.id;
    const noPayroll = loaderData.noPayroll;
    const [date, setDate] = useState(loaderData.date);
    const URL = loaderData.apiURL;

    const [detailsRekapNonStaff, setDetailsRekapNonStaff] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getDetailsDataNonStaff = async () => {
        setIsLoading(true);
        let url = `${URL}/non-staff/details?id=${id}&no_payroll=${noPayroll}&date=${date}`;
        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setDetailsRekapNonStaff(data);
            })
            .catch((err) => {
                alert('terjadi kesalahan hehehe');
                setDetailsRekapNonStaff({});
            });

        setIsLoading(false);
    };

    const generateSlipGaji = async () => {
        let url = `${URL}/non-staff/slip-gaji?id=${id}&no_payroll=${noPayroll}&date=${date}`;
        window.open(url, '_blank');
    };

    useEffect(() => {
        getDetailsDataNonStaff();
    }, []);

    return (
        <div>
            {isLoading ? (
                <Loader className='w-10 h-10 mx-auto my-10 animate-spin' />
            ) : (
                <div className='flex flex-col items-center flex-shrink-0 h-full px-5 py-3 space-x-2 text-gray-300 bg-transparent rounded-lg'>
                    <div className='grid grid-cols-3 gap-1 place-items-start'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs font-semibold'>
                                No Payroll
                            </span>
                            <input
                                type='text'
                                value={detailsRekapNonStaff.rekapitulasi.kode}
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />
                            <span className='text-xs font-semibold'>Nama</span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .nama_karyawan
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />
                            <span className='text-xs font-semibold'>
                                Golongan
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi.golongan
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />
                            <span className='text-xs font-semibold'>
                                Kode TNG (Tunjangan Non Gaji)
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi.kode_tng
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />
                            <span className='text-xs font-semibold'>
                                Gaji Pokok
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi.gaji_pokok
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />
                            <div className='divider'></div>
                            <span className='text-xs font-semibold'>
                                Tunjangan Kemahalan
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .tunjangan_kemahalan
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>
                                Tunjangan Perumahan
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .tunjangan_perumahan
                                        ? detailsRekapNonStaff.rekapitulasi
                                              .tunjangan_perumahan
                                        : '-'
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />
                            <span className='text-xs font-semibold'>
                                Tunjangan Jabatan
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .tunjangan_jabatan
                                        ? detailsRekapNonStaff.rekapitulasi
                                              .tunjangan_jabatan
                                        : '-'
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />
                            <span className='text-xs font-semibold'>
                                Tunjangan Lain Lain / PPH21
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .tunjangan_lain_pph21
                                        ? detailsRekapNonStaff.rekapitulasi
                                              .tunjangan_lain_pph21
                                        : '-'
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <div className='divider '></div>
                            <span className='text-xs font-semibold'>JKK</span>
                            <input
                                type='text'
                                value={detailsRekapNonStaff.rekapitulasi.jkk}
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>JKM</span>
                            <input
                                type='text'
                                value={detailsRekapNonStaff.rekapitulasi.jkm}
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>
                                Kesehatan P
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .kesehatan_p
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />
                        </div>

                        <div className='flex flex-col gap-2 p-2'>
                            <span className='text-xs font-semibold'>
                                Lembur
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi.lembur
                                        ? detailsRekapNonStaff.rekapitulasi
                                              .lembur
                                        : '-'
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>
                                Gaji Bruto
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi.gaji_bruto
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>
                                PPH 21 Perbulan
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .pph_21_perbulan
                                        ? detailsRekapNonStaff.rekapitulasi
                                              .pph_21_perbulan
                                        : '-'
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <div className='divider '></div>

                            <span className='text-xs font-semibold'>
                                Pinjaman Tunai
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .pinjaman_tunai
                                        ? detailsRekapNonStaff.rekapitulasi
                                              .pinjaman_tunai
                                        : '-'
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>
                                Pinjaman Koperasi
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .pinjaman_koperasi
                                        ? detailsRekapNonStaff.rekapitulasi
                                              .pinjaman_koperasi
                                        : '-'
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>
                                Pinjaman Lain Lain
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .pinjaman_lain_lain
                                        ? detailsRekapNonStaff.rekapitulasi
                                              .pinjaman_lain_lain
                                        : '-'
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>
                                BPJS tk jht
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .bpjs_tk_jht
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>
                                BPJS tk jpn
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .bpjs_tk_jpn
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>
                                BPJS Kesehatan K
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .bpjs_kesehatan_k
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>
                                BPJS Kesehatan P
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .bpjs_kesehatan_p
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>
                                BPJS TK JKK
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .bpjs_tk_jkk
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />
                            <span className='text-xs font-semibold'>
                                BPJS TK JKM
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .bpjs_tk_jkm
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />
                        </div>

                        <div className='flex flex-col gap-2 p-2'>
                            <span className='text-xs font-semibold'>
                                Jumah Potongan
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi
                                        .jumlah_potongan
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <span className='text-xs font-semibold'>
                                Gaji Netto
                            </span>
                            <input
                                type='text'
                                value={
                                    detailsRekapNonStaff.rekapitulasi.gaji_netto
                                }
                                placeholder='Type here'
                                className='w-full max-w-xs input-sm input input-bordered'
                            />

                            <div className='divider '></div>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    getDetailsDataNonStaff();
                                }}
                                className='flex flex-col items-end gap-2'
                            >
                                <div className=''>
                                    <h1 className='text-sm'>Masukkan Bulan</h1>
                                    <input
                                        value={date}
                                        onChange={(e) =>
                                            setDate(e.target.value)
                                        }
                                        type={'text'}
                                        className='input input-sm'
                                        placeholder='Contoh: 2023-10'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='w-full btn btn-sm btn-info'
                                >
                                    Ambil Data
                                </button>
                            </form>
                            <button
                                onClick={() => {
                                    generateSlipGaji();
                                }}
                                type='button'
                                className='w-full btn btn-sm btn-success'
                            >
                                Slip Gaji
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
