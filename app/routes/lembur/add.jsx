import { useLoaderData } from '@remix-run/react';
import React, { useState } from 'react';
import { Delete } from 'react-feather';
import { getEnv } from '~/env.server';

export const loader = async ({ request }) => {
    const apiURL = getEnv().API;
    return {
        apiURL,
    };
};

export default function Add() {
    const loaderData = useLoaderData();

    const [tanggalLembur, setTanggalLembur] = useState([]);

    const [currentDate, setCurrentDate] = useState(null);
    const [currentJam, setCurrentJam] = useState(null);

    const [role, setRole] = useState(null);
    const [employees, setEmployees] = useState([]);

    const [formData, setFormData] = useState({
        basis: null,
        tanggal_lembur: [],
    });

    const addDataRequest = async () => {
        const url = `${loaderData.apiURL}/lembur`;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .catch((err) => {
                alert(err);
            });

        window.location.href = '/lembur';
    };

    function fetchDataBasedOnRole(role) {
        if (role == 'non-staff') {
            const url = `${loaderData.apiURL}/non-staff`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setEmployees(data);
                });
        }
    }

    return (
        <div className='flex items-center justify-center w-full m-5'>
            <div className='justify-center'>
                <h1 className='text-xl font-bold'>Tambah Data Lembur</h1>
                <div className='flex items-center justify-center w-full gap-5 mx-auto mt-12'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (
                                formData.no_payroll == null ||
                                formData.no_payroll == ''
                            ) {
                                alert('Nama Karyawan tidak boleh kosong');
                                return;
                            }

                            // remove all character without number in formData.basis
                            // change basis to string
                            // let basis = formData.basis.toString();

                            // replace all character that is not number with empty string
                            // formData.basis = basis.replace(/\D/g, '');
                            // formData.basis = parseFloat(basis);
                            // alert(formData.basis);

                            if (tanggalLembur.length != 0) {
                                addDataRequest();
                            } else {
                                alert('Tanggal Lembur tidak boleh kosong');
                            }
                        }}
                        className='flex w-full max-w-lg gap-3 '
                    >
                        <div className='flex flex-col gap-3'>
                            <select
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    fetchDataBasedOnRole(e.target.value);
                                }}
                                className='w-full max-w-xs select select-accent'
                            >
                                <option disabled selected>
                                    Pilih Role
                                </option>
                                <option value={'non-staff'}>Non Staff</option>
                            </select>

                            <select
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        no_payroll: e.target.value,
                                    });
                                }}
                                className='w-full max-w-xs select select-accent '
                            >
                                <option disabled selected>
                                    Pilih nama karyawan
                                </option>
                                {employees.map((employee) => {
                                    return (
                                        <option
                                            key={employee.no_payroll}
                                            value={employee.no_payroll}
                                        >
                                            {employee.nama}
                                        </option>
                                    );
                                })}
                            </select>

                            <input
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        basis: parseFloat(e.target.value),
                                    });
                                }}
                                value={formData.basis}
                                placeholder='Basis'
                                type='number'
                                required={true}
                                className='w-full max-w-xs input input-bordered input-success'
                            />

                            <span className='flex items-center gap-2 mb-4 -mt-1 text-xs text-red-600'>
                                Tanpa titik
                                <span className='text-xs text-yellow-300'>
                                    Contoh: 24500
                                </span>
                            </span>

                            <input
                                className='w-full max-w-xs input input-bordered input-success'
                                onChange={(e) => setCurrentDate(e.target.value)}
                                value={currentDate}
                                id='tanggalLembur'
                                type='date'
                                required={true}
                            />

                            <input
                                value={currentJam}
                                onChange={(e) => setCurrentJam(e.target.value)}
                                id='totalJam'
                                type='number'
                                placeholder='Total Jam Lembur'
                                required={true}
                                className='w-full max-w-xs input input-bordered input-success'
                            />

                            <button
                                type='button'
                                className='btn btn-info btn-outline'
                                onClick={() => {
                                    if (
                                        currentJam == null ||
                                        currentDate == null
                                    ) {
                                        alert(
                                            'Tanggal dan Jam tidak boleh kosong'
                                        );
                                        return;
                                    }

                                    // add one object to array tanggalLembur
                                    setTanggalLembur([
                                        ...tanggalLembur,
                                        {
                                            tanggal: currentDate,
                                            total_jam: parseFloat(currentJam),
                                        },
                                    ]);

                                    // add to formData
                                    setFormData({
                                        ...formData,
                                        tanggal_lembur: [
                                            ...tanggalLembur,
                                            {
                                                tanggal: currentDate,
                                                total_jam:
                                                    parseFloat(currentJam),
                                            },
                                        ],
                                    });
                                }}
                            >
                                Tambah Tanggal Lembur
                            </button>

                            <button className='btn btn-success' type={'submit'}>
                                Simpan Data
                            </button>
                        </div>
                        <div className='flex flex-col items-center gap-4 pt-5 overflow-auto rounded-lg border-gray-500/30'>
                            {tanggalLembur.map((tanggal, index) => (
                                <div
                                    className='flex items-center gap-2 pl-5 border-l-2 border-green-300/20'
                                    key={index}
                                >
                                    <span className='text-xs'>
                                        {tanggal.tanggal}
                                    </span>
                                    <span className='text-xs font-semibold'>
                                        {tanggal.total_jam} Jam
                                    </span>
                                    <button
                                        type='button'
                                        onClick={(e) => {
                                            e.preventDefault();

                                            setTanggalLembur(
                                                tanggalLembur.filter(
                                                    (item) => item !== tanggal
                                                )
                                            );

                                            setFormData({
                                                ...formData,
                                                tanggal_lembur:
                                                    tanggalLembur.filter(
                                                        (item) =>
                                                            item !== tanggal
                                                    ),
                                            });
                                        }}
                                    >
                                        <Delete className='w-5 h-5 stroke-red-500' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
