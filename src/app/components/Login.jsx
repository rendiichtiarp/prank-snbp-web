'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logo } from '../lib/utils/image';
import useFormStore from '../store/formStore';

const Login = () => {
  const router = useRouter();
  const setFormData = useFormStore((state) => state.setFormData);
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
      </form>
    </div>
  );
};

export default Login;
