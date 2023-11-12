import Link from 'next/link';
import '../styles/globals.css';
import { UserProvider } from '../components/UserContext'; 
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <UserProvider>
      <header className="flex justify-center mt-6">
        <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">WhatFilm</h1>
      </header>
      <nav className='flex justify-center mt-10'>
        <ul className='flex justify-between space-x-10'> 
          <li className={isActive('/') ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg' : 'bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300'}>
            <Link href="/">Home</Link>
          </li>
          <li className={isActive('/about') ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg' : 'bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300'}>
            <Link href="/about">About Us</Link>
          </li>
          <li className={isActive('/contacts') ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg' : 'bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300'}>
            <Link href="/contacts">Contact Us</Link>
          </li>
          <li className={isActive('/articles') ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg' : 'bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300'}>
            <Link href="/articles">Articles</Link>
          </li>
          <li className={isActive('/use-state') ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg' : 'bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300'}>
            <Link href="/use-state">Use state</Link>
          </li>
          <li className={isActive('/login-native') ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg' : 'bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300'}>
            <Link href="/login-native">Login</Link>
          </li>
        </ul>
      </nav>
      <Component {...pageProps} />
    </UserProvider>
  );
}