import { getEnv } from '~/env.server';
import { currentDate } from './index';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Delete, Loader } from 'react-feather';

export const loader = async ({ request }) => {
    const apiURL = getEnv().API;
    const url = new URL(request.url);

    const id = url.searchParams.get('id');
    let date = url.searchParams.get('date');
    if (date === null) {
        date = currentDate();
    }

    return {
        id,
        date,
        apiURL,
    };
};

export default function DetailsLembur() {
    const loaderData = useLoaderData();

    const [id] = useState(loaderData.id);
    const [date] = useState(loaderData.date);
    const [URL] = useState(loaderData.apiURL);

    const [tanggalLembur, setTanggalLembur] = useState([]);
    const [currentDate, setCurrentDate] = useState(null);
    const [currentJam, setCurrentJam] = useState(null);

    const [detailsLembur, setDetailsLembur] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getDetailsDataRekapLembur = async () => {
        setIsLoading(true);
        let url = `${URL}/lembur/${id}`;
        if (date && date != 'null') {
            url = `${URL}/lembur/${id}?date=${date}`;
        }

        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setDetailsLembur(data));
        setIsLoading(false);
    };

    const saveTanggalLembur = async () => {
        const url = `${URL}/tanggal_lembur?id=${id}`;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tanggalLembur),
        })
            .then((res) => res.json())
            .then(() => {
                window.location.reload();
            });
    };

    useEffect(() => {
        getDetailsDataRekapLembur();
    }, []);

    return (
        <div>
            {isLoading ? (
                <Loader className='animate-spin' />
            ) : (
                <div className='flex justify-center gap-5'>
                    <div className='flex items-start justify-center w-full gap-3 overflow-x-auto overflow-y-hidden flex-nowrap'>
                        <div className='flex flex-col h-[700px] items-center flex-shrink-0 rounded-lg px-5 py-3 bg-black space-x-2 text-gray-400'>
                            <div className='flex items-center gap-1'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    className='w-4 h-4'
                                >
                                    <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'></path>
                                </svg>

                                <span>Details Rekap Lembur</span>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='flex gap-1 mt-5'>
                                    <form className='flex flex-col gap-2 p-2 mx-auto'>
                                        <span className='text-sm font-semibold'>
                                            No Payroll
                                        </span>
                                        <input
                                            type='text'
                                            value={
                                                detailsLembur.lembur.no_payroll
                                            }
                                            placeholder='Type here'
                                            className='w-full max-w-xs input-sm input input-bordered'
                                        />
                                        <span className='text-sm font-semibold'>
                                            Nama
                                        </span>
                                        <input
                                            type='text'
                                            value={detailsLembur.lembur.nama}
                                            placeholder='Type here'
                                            className='w-full max-w-xs input-sm input input-bordered'
                                        />
                                        <span className='text-sm font-semibold'>
                                            Jabatan
                                        </span>
                                        <input
                                            type='text'
                                            value={detailsLembur.lembur.jabatan}
                                            placeholder='Type here'
                                            className='w-full max-w-xs input-sm input input-bordered'
                                        />
                                        <span className='text-sm font-semibold'>
                                            Gaji Pokok
                                        </span>
                                        <input
                                            type='text'
                                            value={
                                                detailsLembur.lembur.gaji_pokok
                                            }
                                            placeholder='Type here'
                                            className='w-full max-w-xs input-sm input input-bordered'
                                        />
                                        <span className='text-sm font-semibold'>
                                            Basis
                                        </span>
                                        <input
                                            type='text'
                                            value={detailsLembur.lembur.basis}
                                            placeholder='Type here'
                                            className='w-full max-w-xs input-sm input input-bordered'
                                        />

                                        <div className='divider'></div>

                                        <span className='text-sm font-semibold'>
                                            Total Jam Lembur
                                        </span>
                                        <input
                                            type='text'
                                            value={
                                                detailsLembur.total_jam_lembur +
                                                ' Jam'
                                            }
                                            placeholder='Type here'
                                            className='w-full max-w-xs input-sm input input-bordered'
                                        />

                                        <span className='text-sm font-semibold'>
                                            Total Gaji Lembur
                                        </span>
                                        <input
                                            type='text'
                                            value={
                                                detailsLembur.total_gaji_lembur +
                                                ' Jam'
                                            }
                                            placeholder='Type here'
                                            className='w-full max-w-xs input-sm input input-bordered'
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className='flex bg-black h-[700px] flex-col flex-shrink-0 rounded-lg px-5 py-3 space-x-2 text-gray-400'>
                            <div className='flex items-center justify-center gap-3'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    className='w-4 h-4'
                                >
                                    <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
                                </svg>
                                <span>Tambah Jam Lembur</span>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2 p-5 rounded-lg'>
                                    <span className='text-sm font-semibold'>
                                        Tanggal lembur
                                    </span>
                                    <input
                                        type='date'
                                        onChange={(e) =>
                                            setCurrentDate(e.target.value)
                                        }
                                        value={currentDate}
                                        placeholder='Type here'
                                        required={true}
                                        className='w-full max-w-xs input-sm input input-bordered'
                                    />
                                    <span className='text-sm font-semibold'>
                                        Total jam
                                    </span>
                                    <input
                                        type='number'
                                        value={currentJam}
                                        onChange={(e) =>
                                            setCurrentJam(e.target.value)
                                        }
                                        placeholder='Type here'
                                        required={true}
                                        className='w-full max-w-xs input-sm input input-bordered'
                                    />
                                    <div className='flex items-center justify-center gap-3 mt-5'>
                                        <button
                                            className='btn btn-success btn-sm'
                                            onClick={() => {
                                                // add one object to array tanggalLembur
                                                setTanggalLembur([
                                                    ...tanggalLembur,
                                                    {
                                                        tanggal: currentDate,
                                                        total_jam:
                                                            parseFloat(
                                                                currentJam
                                                            ),
                                                    },
                                                ]);
                                            }}
                                            color={'purple'}
                                        >
                                            Tambah
                                        </button>

                                        <button
                                            className='btn btn-success btn-outline btn-sm'
                                            onClick={() => {
                                                if (
                                                    tanggalLembur.length === 0
                                                ) {
                                                    alert(
                                                        'Data Lembur Tidak Boleh Kosong'
                                                    );
                                                } else {
                                                    saveTanggalLembur();
                                                }
                                            }}
                                        >
                                            Simpan
                                        </button>
                                    </div>
                                </div>

                                <div className='flex flex-col flex-wrap h-full gap-4 p-5 rounded-lg '>
                                    {tanggalLembur.map((tanggal, index) => (
                                        <div
                                            key={index}
                                            className='flex items-center justify-center gap-2'
                                        >
                                            <span className='text-xs'>
                                                {tanggal.tanggal}
                                            </span>
                                            <span className='text-xs font-semibold'>
                                                {tanggal.total_jam} Jam
                                            </span>
                                            <button
                                                onClick={() => {
                                                    setTanggalLembur(
                                                        tanggalLembur.filter(
                                                            (item) =>
                                                                item !== tanggal
                                                        )
                                                    );
                                                }}
                                                type='button'
                                                variant='danger'
                                            >
                                                <Delete className='w-4 h-4 stroke-red-500' />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col bg-black h-[700px] flex-shrink-0 rounded-lg px-5 py-3 space-x-2 rounded-t-lg text-gray-400'>
                            <div className='flex items-center gap-2'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    className='w-4 h-4'
                                >
                                    <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'></path>
                                    <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'></path>
                                </svg>
                                <span>Details Jam Lembur</span>
                            </div>
                            <div className='flex flex-col flex-wrap items-start p-5 m-5 mx-auto rounded-lg gap-x-5 gap-y-2'>
                                {detailsLembur.list_tanggal_lembur &&
                                    detailsLembur.list_tanggal_lembur.map(
                                        (data, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className='flex items-start justify-start gap-2'
                                                >
                                                    <span className='text-xs font-semibold text-white'>
                                                        {data.tanggal}
                                                    </span>
                                                    <span className='text-xs font-semibold'>
                                                        {data.total_jam} Jam
                                                    </span>
                                                </div>
                                            );
                                        }
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
