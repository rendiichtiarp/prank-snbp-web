'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logo } from '../lib/utils/image';
import useFormStore from '../store/formStore';

const Login = () => {
  const router = useRouter();
  const setFormData = useFormStore((state) => state.setFormData);
  
  useEffect(() => {
    // Skip verifikasi jika dalam mode development
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    // Periksa token Turnstile dan waktu verifikasinya
    const turnstileData = sessionStorage.getItem('turnstileData');
    
    if (!turnstileData) {
      router.push('/');
      return;
    }

    try {
      const { timestamp, token } = JSON.parse(turnstileData);
      const currentTime = new Date().getTime();
      const oneHour = 60 * 60 * 1000; // 1 jam dalam milidetik
      
      // Jika waktu verifikasi sudah lebih dari 1 jam
      if (currentTime - timestamp > oneHour) {
        sessionStorage.removeItem('turnstileData');
        router.push('/');
        return;
      }
    } catch (error) {
      sessionStorage.removeItem('turnstileData');
      router.push('/');
      return;
    }
  }, [router]);

  const [formData, setFormDataState] = useState({
    nisn: '',
    noRegist: '',
    nama: '',
    jurusan: '',
    universitas: '',
    date: '',
    month: '',
    year: '',
    kabupaten: '',
    sekolah: '',
    provinsi: '',
    status: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Validasi NISN
    if (!formData.nisn.trim()) {
      newErrors.nisn = 'NISN harus diisi';
    } else if (!/^\d+$/.test(formData.nisn)) {
      newErrors.nisn = 'NISN hanya boleh berisi angka';
    } else if (formData.nisn.length !== 10) {
      newErrors.nisn = 'NISN harus 10 digit';
    }

    // Validasi No Peserta
    if (!formData.noRegist.trim()) {
      newErrors.noRegist = 'Nomor Peserta harus diisi';
    } else if (!/^\d+$/.test(formData.noRegist)) {
      newErrors.noRegist = 'Nomor Peserta hanya boleh berisi angka';
    } else if (formData.noRegist.length !== 9) {
      newErrors.noRegist = 'Nomor Peserta harus 9 digit';
    }

    if (!formData.nama.trim()) newErrors.nama = 'Nama Lengkap harus diisi';
    if (!formData.jurusan.trim()) newErrors.jurusan = 'Program Studi harus diisi';
    if (!formData.universitas.trim()) newErrors.universitas = 'Universitas harus diisi';
    
    // Validasi tanggal lahir yang lebih detail
    const date = parseInt(formData.date);
    const month = parseInt(formData.month);
    const year = parseInt(formData.year);

    if (!formData.date.trim()) {
      newErrors.date = 'Tanggal harus diisi';
    } else if (isNaN(date) || date < 1 || date > 31) {
      newErrors.date = 'Tanggal tidak valid (1-31)';
    }

    if (!formData.month.trim()) {
      newErrors.month = 'Bulan harus diisi';
    } else if (isNaN(month) || month < 1 || month > 12) {
      newErrors.month = 'Bulan tidak valid (1-12)';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Tahun harus diisi';
    } else if (isNaN(year) || year < 1990 || year > 2024) {
      newErrors.year = 'Tahun tidak valid (1990-2024)';
    }

    // Validasi tanggal yang lebih spesifik berdasarkan bulan
    if (!newErrors.date && !newErrors.month && !newErrors.year) {
      const maxDays = new Date(year, month, 0).getDate();
      if (date > maxDays) {
        newErrors.date = `Tanggal tidak valid untuk bulan ${month}`;
      }
    }

    if (!formData.kabupaten.trim()) newErrors.kabupaten = 'Kabupaten/Kota harus diisi';
    if (!formData.sekolah.trim()) newErrors.sekolah = 'Asal Sekolah harus diisi';
    if (!formData.provinsi.trim()) newErrors.provinsi = 'Provinsi harus diisi';
    if (!formData.status) newErrors.status = 'Status Kelulusan harus dipilih';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setFormData(formData);
      router.push(`/${formData.status}`);
    } else {
      // Scroll ke error pertama
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validasi input untuk NISN dan No Peserta
    if (name === 'nisn') {
      // Hanya memperbolehkan angka
      if (value && !/^\d+$/.test(value)) return;
      // Maksimal 10 digit
      if (value.length > 10) return;
    }
    
    if (name === 'noRegist') {
      // Hanya memperbolehkan angka
      if (value && !/^\d+$/.test(value)) return;
      // Maksimal 9 digit
      if (value.length > 9) return;
    }

    // Mengubah nama, jurusan, dan universitas menjadi capslock
    if (name === 'nama' || name === 'jurusan' || name === 'universitas') {
      setFormDataState(prev => ({
        ...prev,
        [name]: value.toUpperCase()
      }));
      return;
    }

    // Validasi input untuk tanggal, bulan, dan tahun
    if (name === 'date') {
      // Hanya memperbolehkan 2 digit
      if (value.length > 2) return;
      // Hanya memperbolehkan angka
      if (value && !/^\d+$/.test(value)) return;
      // Maksimal 31
      if (parseInt(value) > 31) return;
      
      // Auto focus ke input bulan jika sudah 2 digit
      if (value.length === 2) {
        document.getElementById('month').focus();
      }
    }
    
    if (name === 'month') {
      // Hanya memperbolehkan 2 digit
      if (value.length > 2) return;
      // Hanya memperbolehkan angka
      if (value && !/^\d+$/.test(value)) return;
      // Maksimal 12
      if (parseInt(value) > 12) return;
      
      // Auto focus ke input tahun jika sudah 2 digit
      if (value.length === 2) {
        document.getElementById('year').focus();
      }
    }
    
    if (name === 'year') {
      // Hanya memperbolehkan 4 digit
      if (value.length > 4) return;
      // Hanya memperbolehkan angka
      if (value && !/^\d+$/.test(value)) return;
      // Tahun antara 1990-2024
      if (value.length === 4 && (parseInt(value) < 1990 || parseInt(value) > 2024)) return;
      
      // Auto focus ke input berikutnya (kabupaten) jika sudah 4 digit
      if (value.length === 4) {
        document.getElementById('kabupaten').focus();
      }
    }

    setFormDataState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-background flex justify-center items-center min-h-screen py-8">
      <form onSubmit={handleSubmit} className="bg-primary p-6 sm:p-8 md:p-9 w-full max-w-[700px] rounded-md mx-4">
        <div className="flex">
          <Image className="h-[40px] sm:h-[70px] w-auto mb-5" src={logo} alt="Logo" />
        </div>
        <div className="text-left">
          <h1 className="text-[34px] font-extrabold sm:text-[2.5rem] ">HASIL SELEKSI SNBP 2025</h1>
          <p className="text-font mb-6 sm:mb-8">Masukkan data diri Anda dengan lengkap.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="nisn" className="text-label font-extrabold text-sm sm:text-base">
              NISN
            </label>
            <input
              className={`bg-input text-[1rem] py-3 px-4 rounded-md font-semibold placeholder-neutral-500 ${
                errors.nisn ? 'border-2 border-red-500' : ''
              }`}
              type="text"
              name="nisn"
              id="nisn"
              placeholder="Masukkan NISN Anda"
              value={formData.nisn}
              onChange={handleChange}
              maxLength="10"
            />
            {errors.nisn && (
              <span className="error-message text-red-500 text-sm">{errors.nisn}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="noRegist" className="text-label font-extrabold text-sm sm:text-base">
              Nomor Peserta
            </label>
            <input
              className={`bg-input text-[1rem] py-3 px-4 rounded-md font-semibold placeholder-neutral-500 ${
                errors.noRegist ? 'border-2 border-red-500' : ''
              }`}
              type="text"
              name="noRegist"
              id="noRegist"
              placeholder="Nomor registrasi pada kartu SNBP"
              value={formData.noRegist}
              onChange={handleChange}
              maxLength="9"
            />
            {errors.noRegist && (
              <span className="error-message text-red-500 text-sm">{errors.noRegist}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nama" className="text-label font-extrabold text-sm sm:text-base">
              Nama Lengkap
            </label>
            <input
              className={`bg-input text-[1rem] py-3 px-4 rounded-md font-semibold placeholder-neutral-500 ${
                errors.nama ? 'border-2 border-red-500' : ''
              }`}
              type="text"
              name="nama"
              id="nama"
              placeholder="Masukkan nama lengkap Anda"
              value={formData.nama}
              onChange={handleChange}
              style={{ textTransform: 'uppercase' }}
            />
            {errors.nama && (
              <span className="error-message text-red-500 text-sm">{errors.nama}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="jurusan" className="text-label font-extrabold text-sm sm:text-base">
              Program Studi
            </label>
            <input
              className={`bg-input text-[1rem] py-3 px-4 rounded-md font-semibold placeholder-neutral-500 ${
                errors.jurusan ? 'border-2 border-red-500' : ''
              }`}
              type="text"
              name="jurusan"
              id="jurusan"
              placeholder="Program studi yang dipilih"
              value={formData.jurusan}
              onChange={handleChange}
              style={{ textTransform: 'uppercase' }}
            />
            {errors.jurusan && (
              <span className="error-message text-red-500 text-sm">{errors.jurusan}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="universitas" className="text-label font-extrabold text-sm sm:text-base">
              Universitas
            </label>
            <input
              className={`bg-input text-[1rem] py-3 px-4 rounded-md font-semibold placeholder-neutral-500 ${
                errors.universitas ? 'border-2 border-red-500' : ''
              }`}
              type="text"
              name="universitas"
              id="universitas"
              placeholder="Universitas tujuan"
              value={formData.universitas}
              onChange={handleChange}
              style={{ textTransform: 'uppercase' }}
            />
            {errors.universitas && (
              <span className="error-message text-red-500 text-sm">{errors.universitas}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-label font-extrabold text-sm sm:text-base">
              Tanggal Lahir
            </label>
            <div className="flex gap-2 items-center">
              <input
                className={`bg-input w-[60px] sm:w-[80px] text-[1rem] py-3 px-2 rounded-md font-semibold placeholder-neutral-500 text-center ${
                  errors.date ? 'border-2 border-red-500' : ''
                }`}
                type="text"
                name="date"
                id="date"
                placeholder="Tgl"
                maxLength="2"
                value={formData.date}
                onChange={handleChange}
              />
              <span className="text-[20px] font-bold text-font">/</span>
              <input
                className={`bg-input w-[60px] sm:w-[80px] text-[1rem] py-3 px-2 rounded-md font-semibold placeholder-neutral-500 text-center ${
                  errors.month ? 'border-2 border-red-500' : ''
                }`}
                type="text"
                name="month"
                id="month"
                placeholder="Bln"
                maxLength="2"
                value={formData.month}
                onChange={handleChange}
              />
              <span className="text-[20px] font-bold text-font">/</span>
              <input
                className={`bg-input w-[60px] sm:w-[80px] text-[1rem] py-3 px-2 rounded-md font-semibold placeholder-neutral-500 text-center ${
                  errors.year ? 'border-2 border-red-500' : ''
                }`}
                type="text"
                name="year"
                id="year"
                placeholder="Thn"
                maxLength="4"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
            {errors.date && (
              <span className="error-message text-red-500 text-sm">{errors.date}</span>
            )}
            {errors.month && (
              <span className="error-message text-red-500 text-sm">{errors.month}</span>
            )}
            {errors.year && (
              <span className="error-message text-red-500 text-sm">{errors.year}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="kabupaten" className="text-label font-extrabold text-sm sm:text-base">
              Kabupaten/Kota
            </label>
            <input
              className={`bg-input text-[1rem] py-3 px-4 rounded-md font-semibold placeholder-neutral-500 ${
                errors.kabupaten ? 'border-2 border-red-500' : ''
              }`}
              type="text"
              name="kabupaten"
              id="kabupaten"
              placeholder="Kabupaten/Kota asal"
              value={formData.kabupaten}
              onChange={handleChange}
            />
            {errors.kabupaten && (
              <span className="error-message text-red-500 text-sm">{errors.kabupaten}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="sekolah" className="text-label font-extrabold text-sm sm:text-base">
              Asal Sekolah
            </label>
            <input
              className={`bg-input text-[1rem] py-3 px-4 rounded-md font-semibold placeholder-neutral-500 ${
                errors.sekolah ? 'border-2 border-red-500' : ''
              }`}
              type="text"
              name="sekolah"
              id="sekolah"
              placeholder="Nama sekolah asal"
              value={formData.sekolah}
              onChange={handleChange}
            />
            {errors.sekolah && (
              <span className="error-message text-red-500 text-sm">{errors.sekolah}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="provinsi" className="text-label font-extrabold text-sm sm:text-base">
              Provinsi
            </label>
            <input
              className={`bg-input text-[1rem] py-3 px-4 rounded-md font-semibold placeholder-neutral-500 ${
                errors.provinsi ? 'border-2 border-red-500' : ''
              }`}
              type="text"
              name="provinsi"
              id="provinsi"
              placeholder="Provinsi asal"
              value={formData.provinsi}
              onChange={handleChange}
            />
            {errors.provinsi && (
              <span className="error-message text-red-500 text-sm">{errors.provinsi}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-label font-extrabold text-sm sm:text-base">
              Status Kelulusan
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="accepted"
                  className={`w-4 h-4 accent-accepted ${
                    errors.status ? 'border-2 border-red-500' : ''
                  }`}
                  onChange={handleChange}
                  checked={formData.status === 'accepted'}
                />
                <span className="text-font">Lulus</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="rejected"
                  className={`w-4 h-4 accent-red-600 ${
                    errors.status ? 'border-2 border-red-500' : ''
                  }`}
                  onChange={handleChange}
                  checked={formData.status === 'rejected'}
                />
                <span className="text-font">Tidak Lulus</span>
              </label>
            </div>
            {errors.status && (
              <span className="error-message text-red-500 text-sm">{errors.status}</span>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4">
          <button 
            type="submit"
            className="bg-accepted w-full sm:w-auto rounded-full font-extrabold text-sm py-3 px-6 tracking-wide shadow-md"
          >
            LIHAT HASIL SELEKSI
          </button>
        </div>

        <div className="mt-6 text-center">
          <a href="https://instagram.com/rendiichtiar" target="_blank" className="text-xs text-font flex items-center justify-center gap-1">
            Created by <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> <span className="underline">@rendiichtiar</span> with ❤️
          </a>
          <div className="mt-2">
            <a href="https://saweria.co/rendiichtiar" target="_blank" className="text-xs text-font flex items-center justify-center gap-1">
              Support me on 🎁<span className="underline">Saweria</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
