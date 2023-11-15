import Link from "next/link";
import "../styles/globals.css";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const isActive = (path) => router.pathname === path;

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
      <nav className="flex justify-center mt-10">
        <ul className="flex justify-between space-x-10">
          <li
            className={
              isActive("/")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={
              isActive("/about")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            <Link href="/about">About Us</Link>
          </li>
          <li
            className={
              isActive("/contacts")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            <Link href="/contacts">Contact Us</Link>
          </li>
          <li
            className={
              isActive("/articles")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            <Link href="/articles">Articles</Link>
          </li>
          <li
            className={
              isActive("/use-state")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            <Link href="/use-state">Use state</Link>
          </li>
          <li
            className={
              isActive("/login")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            <Link href="/login">Login</Link>
          </li>
          <li
            className={
              isActive("/admin/contacts")
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            }
          >
            <Link href="/admin/contacts">Admin (contacts)</Link>
          </li>
        </ul>
      </nav>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
