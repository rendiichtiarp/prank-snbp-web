'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { logo, qr } from '@/app/lib/utils/image';
import useFormStore from '@/app/store/formStore';
import { useRouter } from 'next/navigation';

const Accepted = () => {
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
        <div className='bg-background font-lato flex justify-center h-full  min-h-screen'>
            <div className='w-full h-screen bg-black backdrop-brightness-100 flex flex-col justify-between '>
                <div className='flex flex-col-reverse md:flex-row justify-between md:items-center items-start p-4 md:p-8 bg-from-90-to-blue-green'>
                    <h1 className='text-2xl md:text-3xl font-bold tracking-wide text-white '>
                        SELAMAT! ANDA DINYATAKAN LULUS SELEKSI SNBP 2025
                    </h1>
                    <Image
                        className='w-48 h-24'
                        src={logo}
                        alt="Logo"
                    />
                </div>

                <div className='p-4 md:p-8'>
                    <div className='flex flex-col-reverse md:flex-row justify-between gap-4 items-start mb-8'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-label text-sm font-bold'>
                                NISN {formData.nisn} - NOREG {formData.noRegist}
                            </span>
                            <span className='text-3xl md:text-4xl text-white font-bold'>
                                {formData.nama}
                            </span>
                            <div className=' flex flex-col font-medium'>
                                <p className='text-xl md:text-2xl'>{formData.jurusan}</p>
                                <p className='text-lg md:text-xl'>{formData.universitas}</p>
                            </div>
                        </div>
                        <Image
                            className='w-32 h-32 md:w-40 md:h-40'
                            src={qr}
                            alt="QR Code"
                        />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className='flex flex-col md:flex-row gap-8'>
                            <div className='flex flex-col gap-5'>
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
                            <div className='flex flex-col gap-5'>
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

                        <div className='bg-white p-4 rounded-lg flex flex-col gap-3'>
                            <div className='flex flex-col'>
                                <span className='text-blackFont text-lg font-bold'>
                                    Silahkan lakukan pendaftaran ulang.
                                </span>
                                <span className='text-sm text-blackFont font-light'>
                                    Informasi pendaftaran ulang di PTN/Politeknik Negeri dapat dilihat dari link berikut:
                                </span>
                            </div>
                            <a
                                className='text-accepted text-lg font-bold break-words'
                                href="https://um.undip.ac.id/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://prank-snbp.rendiichtiar.xyz/
                            </a>
                        </div>
                    </div>
                </div>

                <div className='p-4 md:p-8'>
                    <p className='text-sm font-light text-font text-justify'>
                        Status penerimaan Anda sebagai mahasiswa akan ditetapkan setelah PTN tujuan melakukan verifikasi data akademik (rapor dan/atau portofolio). Silakan Anda membaca peraturan tentang penerimaan mahasiswa baru di laman PTN tujuan.
                    </p>
                    <p className='text-sm font-light text-font text-justify mt-3'>
                        Khusus peserta KIP Kuliah, PTN tujuan juga dapat melakukan verifikasi data ekonomi dan/atau kunjungan ke tempat tinggal Anda sebelum menetapkan status penerimaan Anda.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Accepted;
