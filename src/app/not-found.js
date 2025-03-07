'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logo } from './lib/utils/image';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="bg-background flex justify-center items-center min-h-screen py-8">
      <div className="bg-primary p-6 sm:p-8 md:p-9 w-full max-w-[500px] rounded-md mx-4 text-center">
        <div className="flex justify-center mb-6">
          <Image className="h-[40px] sm:h-[70px] w-auto" src={logo} alt="Logo" />
        </div>
        
        <h1 className="text-[24px] font-extrabold sm:text-[1.8rem] mb-4">
          404 - Halaman Tidak Ditemukan
        </h1>
        
        <p className="text-font mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Silakan kembali ke halaman utama.
        </p>

        <div className="flex justify-center">
          <button 
            onClick={() => router.push('/')}
            className="bg-accepted rounded-full font-extrabold text-sm py-3 px-6 tracking-wide shadow-md hover:opacity-90 transition-opacity"
          >
            KEMBALI KE HALAMAN UTAMA
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
      </div>
    </div>
  );
} 