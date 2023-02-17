import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { SearchInput } from '../../components/input';
import { Loader } from 'react-feather';
import { Link, useLoaderData } from '@remix-run/react';
import { getEnv } from '~/env.server';

export const loader = async () => {
    const apiURL = getEnv().API;
    return {
        apiURL,
    };
};

export default function Index() {
    const loaderData = useLoaderData();

    const [isLoading, setIsLoading] = useState(true);
    const [dataNonStaff, setDataNonStaff] = useState([]);
    const [filteredDataNonStaff, setFilteredDataNonStaff] = useState([]);

    const deleteDataNonStaff = (id) => {
        const url = `${loaderData.apiURL}/non-staff/${id}`;
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
                        getDataNonStaff();
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const filterData = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const filteredData = dataNonStaff.filter((data) => {
                return (
                    data.no_payroll
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    data.nama.toLowerCase().includes(keyword.toLowerCase()) ||
                    data.nik.toLowerCase().includes(keyword.toLowerCase()) ||
                    data.jabatan.toLowerCase().includes(keyword.toLowerCase())
                );
            });
            setFilteredDataNonStaff(filteredData);
        } else {
            setFilteredDataNonStaff(dataNonStaff);
        }
    };

    const getDataNonStaff = async () => {
        setIsLoading(true);
        const url = `${loaderData.apiURL}/non-staff`;
        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setDataNonStaff(data);
                setFilteredDataNonStaff(data);
            });
        setIsLoading(false);
    };

    useEffect(() => {
        getDataNonStaff();
    }, []);

    return (
        <div className='flex flex-col gap-y-3'>
            <h1 className='m-5 text-xl font-bold'>Data Non Staff</h1>

            <div className='flex items-center justify-between gap-2 px-5'>
                <div className='flex items-center justify-start gap-2'>
                    <SearchInput filterData={filterData} />
                </div>
                <div className='flex gap-2'>
                    <label
                        htmlFor='my-modal'
                        className='btn btn-secondary btn-sm'
                    >
                        Rekapitulasi
                    </label>

                    <Link to='/non-staff/add'>
                        <button
                            type='button'
                            className='btn btn-primary btn-sm'
                        >
                            Tambah
                        </button>
                    </Link>
                </div>
            </div>

            <div className='p-2 mx-auto text-gray-100 rounded'>
                <table className='min-w-full text-xs'>
                    <colgroup>
                        <col />
                        <col className='w-40' />
                        <col className='w-40' />
                        <col className='w-52' />
                        <col className='w-40' />
                    </colgroup>
                    <thead className='bg-[#312923]'>
                        <tr className='text-left'>
                            <th className='p-3'>No Payroll</th>
                            <th className='p-3'>NIK</th>
                            <th className='p-3'>Nama</th>
                            <th className='p-3'>Jabatan</th>
                            <th className='p-3'>Gaji Pokok</th>
                            <th className='p-3 text-center'>Aksi</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <Loader className='mx-auto animate-spin' />
                    ) : (
                        <tbody>
                            {filteredDataNonStaff.map((data) => (
                                <tr
                                    key={uuid()}
                                    className='bg-black hover:bg-[#312923] border-b border-gray-700'
                                >
                                    <td className='p-3 border border-gray-200/10'>
                                        <p className='font-semibold'>
                                            {data.no_payroll}
                                        </p>
                                    </td>
                                    <td className='p-3 border border-gray-200/10'>
                                        <p>{data.nik}</p>
                                    </td>
                                    <td className='p-3 border border-gray-200/10'>
                                        <p>{data.nama}</p>
                                    </td>
                                    <td className='p-3 border border-gray-200/10'>
                                        <p>{data.jabatan}</p>
                                    </td>

                                    <td className='p-3 border border-gray-200/10 '>
                                        <p className='text-yellow-400'>
                                            {data.gaji_pokok_str}
                                        </p>
                                    </td>

                                    <td className='flex flex-col gap-2 p-3 text-sm text-right w-28'>
                                        <Link
                                            to={`/non-staff/details?id=${data.id}&no_payroll=${data.no_payroll}`}
                                            className='btn btn-xs btn-success'
                                        >
                                            Details
                                        </Link>
                                        <Link
                                            to={`/non-staff/edit?id=${data.id}`}
                                            className='btn btn-xs btn-info'
                                        >
                                            <span>Edit</span>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        'Are you sure you wish to delete this item?'
                                                    )
                                                ) {
                                                    deleteDataNonStaff(data.id);
                                                }
                                            }}
                                            className='btn btn-xs btn-error'
                                        >
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
