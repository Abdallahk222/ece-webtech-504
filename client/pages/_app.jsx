import Link from 'next/link';
import '../styles/globals.css';
import { UserProvider } from '../components/UserContext'; 
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <UserProvider>
      <header className="flex justify-center mt-5 ">
        <h1 class="text-gradient font-bold ">WhatFilm</h1>
      </header>
      <nav className='flex justify-center mt-5'>
        <ul className='flex justify-between'>
          <li className={`mr-10 ${isActive('/') ? 'font-bold text-blue-500' : ''}`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`mr-10 ${isActive('/about') ? 'font-bold text-blue-500' : ''}`}>
            <Link href="/about">About Us</Link>
          </li>
          <li className={`mr-10 ${isActive('/contacts') ? 'font-bold text-blue-500' : ''}`}>
            <Link href="/contacts">Contact Us</Link>
          </li>
          <li className={`mr-10 ${isActive('/articles') ? 'font-bold text-blue-500' : ''}`}>
            <Link href="/articles">Articles</Link>
          </li>
          <li className={`mr-10 ${isActive('/use-state') ? 'font-bold text-blue-500' : ''}`}>
            <Link href="/use-state">Use state</Link>
          </li>
          <li className={`mr-10 ${isActive('/login-native') ? 'font-bold text-blue-500' : ''}`}>
            <Link href="/login-native">Login</Link>
          </li>
        </ul>
      </nav>
      <Component {...pageProps} />
    </UserProvider>
  );
}