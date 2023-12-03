import Link from "next/link";
import "../styles/globals.css";
import { createClient } from "@supabase/supabase-js";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const [darkMode, setDarkMode] = useState(true);
  const isActive = (path) => router.pathname === path;
  const [session, setSession] = useState(null);
  const [userT, setUserT] = useState(null);
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUserT(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription;
  }, [setSession]);

  const SignOut = () => {
    supabase.auth.signOut().then(() => {
      router.push("/login");
    });
  };

  const sha256 = require("js-sha256");
  function getGravatarURL(email) {
    const address = String(email).trim().toLowerCase();
    const hash = sha256(address);
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <header className="flex justify-center mt-6">
        <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          WhatFilm
        </h1>
        <button
          onClick={toggleDarkMode}
          className={`fixed top-5 left-5 py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out ${
            darkMode
              ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white"
              : "bg-gradient-to-r from-gray-200 to-gray-300 text-black"
          }`}
        >
          {darkMode ? "Mode Lumineux" : "Mode Sombre"}
        </button>
        {!session ? (
          <button>
            <Link
              href="/login"
              className={`fixed top-5 right-7 ${
                isActive("/login")
                  ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                  : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
              }`}
            >
              Login
            </Link>
          </button>
        ) : (
          <>
            <button>
              <Link
                href="/profile"
                className={`fixed top-5 right-7 ${
                  isActive("/profile")
                    ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                    : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
                }`}
              >
                Profile
              </Link>
            </button>
            <img
              src={getGravatarURL(userT?.email)}
              alt="avatar"
              className="fixed top-11 right-3 w-7 h-7 rounded-full"
            />
            <button
              onClick={SignOut}
              className="fixed top-5 right-40 bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Log Out
            </button>
          </>
        )}
      </header>
      <br></br>
      <nav className="flex justify-center mt-12">
        <ul className="flex justify-between space-x-10">
          <li>
            <Link
              href="/"
              className={
                isActive("/")
                  ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                  : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/post"
              className={
                isActive("/post")
                  ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                  : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
              }
            >
              Post
            </Link>
          </li>
          <li>
            <Link
              href="/contacts"
              className={
                isActive("/contacts")
                  ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                  : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
              }
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href="/admin/contacts"
              className={
                isActive("/admin/contacts")
                  ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                  : "bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300"
              }
            >
              Admin (contacts)
            </Link>
          </li>
        </ul>
      </nav>

      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
