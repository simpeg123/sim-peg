import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { Loader } from 'react-feather';
import { Link, useLoaderData } from '@remix-run/react';
import { FilterInput, SearchInput } from '~/components/input';
import { getEnv } from '~/env.server';

export const currentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month < 10 ? `0${month}` : month}`;
};

export const formattedDate = (date) => {
    return new Date(date.split('-')[0], date.split('-')[1] - 1).toLocaleString(
        'default',
        {
            month: 'long',
            year: 'numeric',
        }
    );
};

export const loader = async ({ request }) => {
    const apiURL = getEnv().API;
    const url = new URL(request.url);
    let date = url.searchParams.get('date');
    if (date === null) {
        date = currentDate();
    }

    return {
        date,
        apiURL,
    };
};

export default function Index() {
    const loaderData = useLoaderData();
    const [date, setDate] = useState(loaderData.date);
    const [apiURL, setApiURL] = useState(loaderData.apiURL);

    const [isLoading, setIsLoading] = useState(true);
    const [dataRekapLembur, setDataRekapLembur] = useState([]);
    const [filteredDataRekapLembur, setFilteredDataRekapLembur] = useState([]);

    const filterData = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const filteredData = dataRekapLembur.filter((data) => {
                return (
                    data.lembur.no_payroll
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    data.lembur.nama
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    data.lembur.jabatan
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    data.lembur.gaji_pokok
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    data.lembur.basis
                        .toLowerCase()
                        .includes(keyword.toLowerCase())
                );
            });
            setFilteredDataRekapLembur(filteredData);
        } else {
            setFilteredDataRekapLembur(dataRekapLembur);
        }
    };

    const deleteDataLembur = (id) => {
        const url = `${apiURL}/lembur/${id}`;
        try {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.error) {
                        getDataRekapLembur();
                    }
                });
        } catch (error) {
            alert(error);
        }
    };

    const getDataRekapLembur = async () => {
        setIsLoading(true);

        const url = `${apiURL}/lembur?date=${date}`;
        try {
            await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.error) {
                        setDataRekapLembur(data);
                        setFilteredDataRekapLembur(data);
                    }
                });
        } catch (err) {
            setIsLoading(false);
            alert(err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getDataRekapLembur();
    }, []);

    return (
        <>
            <div className='flex items-center justify-between m-5'>
                <div>
                    <h1 className='text-xl font-bold'>Lembur</h1>
                    <span className='text-sm font-semibold leading-tight text-gray-300'>
                        # {formattedDate(date)}
                    </span>
                </div>

                <Link to='/lembur/add'>
                    <button className='btn btn-success btn-sm'>Tambah</button>
                </Link>
            </div>

            <div className='flex flex-col gap-y-3'>
                <div className='container p-2 mx-auto text-gray-100 sm:p-4'>
                    <div className='flex items-center justify-between mb-3'>
                        <SearchInput filterData={filterData} />
                        <FilterInput date={date} setDate={setDate} />
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='min-w-full text-xs'>
                            <colgroup>
                                <col />
                                <col className='w-40' />
                                <col className='w-40' />
                                <col className='w-40' />
                                <col className='w-40' />
                                <col className='w-24' />
                            </colgroup>
                            <thead className='bg-[#312923]'>
                                <tr className='text-left'>
                                    <th className='p-3'>No Payroll</th>
                                    <th className='p-3'>Nama</th>
                                    <th className='p-3'>Jabatan</th>
                                    <th className='p-3'>Gaji Pokok</th>
                                    <th className='p-3'>Basis</th>
                                    <th className='p-3'>Aksi</th>
                                </tr>
                            </thead>

                            {isLoading ? (
                                <Loader className='mx-auto animate-spin' />
                            ) : (
                                <tbody>
                                    {filteredDataRekapLembur.map((data) => (
                                        <tr
                                            key={uuid()}
                                            className='bg-black border-b border-gray-700 hover:bg-black border-opacity-20'
                                        >
                                            <td className='p-3 border border-gray-200/10'>
                                                <p>{data.lembur.no_payroll}</p>
                                            </td>
                                            <td className='p-3 border border-gray-200/10'>
                                                <p>{data.lembur.nama}</p>
                                            </td>
                                            <td className='p-3 border border-gray-200/10'>
                                                <p>{data.lembur.jabatan}</p>
                                            </td>
                                            <td className='p-3 border border-gray-200/10'>
                                                <p className='text-yellow-500'>
                                                    {data.lembur.gaji_pokok}
                                                </p>
                                            </td>
                                            <td className='p-3 border border-gray-200/10'>
                                                <p className='text-green-500'>
                                                    {data.lembur.basis}
                                                </p>
                                            </td>

                                            <td className='flex flex-col gap-2 p-3 text-right'>
                                                <Link
                                                    to={`/lembur/details?id=${data.lembur.id}&date=${date}`}
                                                    className='btn btn-sm btn-info'
                                                >
                                                    <span>Details</span>
                                                </Link>
                                                <Link
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Are you sure you wish to delete this item?'
                                                            )
                                                        ) {
                                                            deleteDataLembur(
                                                                data.lembur.id
                                                            );
                                                        }
                                                    }}
                                                    className='btn btn-error btn-sm'
                                                >
                                                    <span>Hapus</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
