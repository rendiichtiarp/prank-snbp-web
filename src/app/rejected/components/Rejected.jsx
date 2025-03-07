'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { logo } from '@/app/lib/utils/image';
import useFormStore from '@/app/store/formStore';
import { useRouter } from 'next/navigation';

const Rejected = () => {
    const router = useRouter();
    const formData = useFormStore((state) => state.formData);

    useEffect(() => {
        if (!formData) {
            router.push('/');
            return;
        }
    }, [formData, router]);

    if (!formData) return null;

    return (
        <div className='bg-background font-lato flex justify-center items-center h-screen'>
            <div className='w-full h-full bg-black backdrop-brightness-100 shadow-xl md:rounded-lg overflow-hidden flex flex-col'>
                <div className='flex flex-col-reverse md:flex-row justify-between md:items-center items-start p-8 bg-red-600'>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-bold tracking-wide text-white mb-4 md:mb-0'>
                            ANDA DINYATAKAN TIDAK LULUS SELEKSI SNBP 2024
                        </h1>
                        <h1 className='text-xs md:text-base font-medium tracking-wide text-white mb-4 md:mb-0'>
                            MASIH ADA KESEMPATAN MENDAFTAR DAN MENGIKUTI SNBP 2024 ATAU SELEKSI MANDIRI PTN
                        </h1>
                    </div>
                    <Image
                        className='w-48 h-24'
                        src={logo}
                        alt="Logo"
                    />
                </div>

                <div className='p-12 flex-grow'>
                    <div className='flex flex-col md:flex-row justify-between gap-6 items-start mb-12'>
                        <div className='flex flex-col gap-8'>
                            <div className='flex flex-col'>
                                <span className='text-label text-lg font-bold'>
                                    NISN {formData.nisn} - NOREG {formData.noRegist}
                                </span>
                                <span className='text-3xl md:text-4xl text-white font-bold'>
                                    {formData.nama}
                                </span>
                            </div>
                            <div className='flex flex-col md:flex-row gap-12'>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-accepted text-sm'>Tanggal Lahir</span>
                                        <span className='font-bold text-white text-lg'>
                                            {formData.date}/{formData.month}/{formData.year}
                                        </span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-accepted text-sm'>Asal Sekolah</span>
                                        <span className='font-bold text-white text-lg'>{formData.sekolah}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-accepted text-sm'>Kabupaten/Kota</span>
                                        <span className='font-bold text-white text-lg'>{formData.kabupaten}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-accepted text-sm'>Provinsi</span>
                                        <span className='font-bold text-white text-lg'>{formData.provinsi}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rejected;
