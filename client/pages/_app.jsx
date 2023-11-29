import Link from "next/link";
import "../styles/globals.css";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const [darkMode, setDarkMode] = useState(false); 
  const isActive = (path) => router.pathname === path;

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <header className="flex justify-center mt-6">
        <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          WhatFilm
        </h1>
      </header>
      <nav className="flex justify-center mt-12">
        <ul className="flex justify-between space-x-10">
        <li>
        <Link href="/"
            className={
              isActive("/")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            Home</Link>
          </li>
          <li>
          <Link href="/about"
            className={
              isActive("/about")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            About Us</Link>
          </li>
          <li>
          <Link href="/contacts"
            className={
              isActive("/contacts")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            Contact Us</Link>
          </li>
          <li>
          <Link href="/articles"
            className={
              isActive("/articles")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            Articles</Link>
          </li>
          <li>
          <Link href="/use-state"
            className={
              isActive("/use-state")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            Use state</Link>
          </li>
          <li>
          <Link href="/login"
            className={
              isActive("/login")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            Login</Link>
          </li>
          <li>
          <Link href="/admin/contacts"
            className={
              isActive("/admin/contacts")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            Admin (contacts)</Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={toggleDarkMode}
        className={`fixed top-5 right-5 py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out ${
          darkMode
            ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white'
            : 'bg-gradient-to-r from-gray-200 to-gray-300 text-black'
        }`}
      >
        {darkMode ? 'Mode Lumineux' : 'Mode Sombre'}
      </button>

      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
