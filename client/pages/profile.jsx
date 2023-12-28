import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Profile() {
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

  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    async function getUserProfile() {
      await supabase
        .from("profiles")
        .select("id, username, full_name")
        .then((value) => {
          if (value.data[0]) {
            console.log(value.data[0]);
            setUser(value.data[0]);
          }
        });
    }
    getUserProfile();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { username, full_name } = event.target.elements;
    if (username.value === "") {
      username.value = user?.username;
    }
    if (full_name.value === "") {
      full_name.value = user?.full_name;
    }
    await supabase
      .from("profiles")
      .update({
        username: username.value,
        full_name: full_name.value,
      })
      .eq("id", user?.id)
      .then(() => {
        location.reload();
      });
  };

  const sha256 = require("js-sha256");

  function getGravatarURL(email) {
    const address = String(email).trim().toLowerCase();
    const hash = sha256(address);
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <br></br>
      <br></br>
      <h1 className="text-xl font-bold">
        Bienvenue {user?.username ? user?.username : userT?.email}
      </h1>
      <br></br>
      <img
        src={getGravatarURL(userT?.email)}
        alt="avatar"
        className="w-20 h-20 rounded-full"
      />
      <br></br>
      <p>
        Modifier votre photo de profil sur{" "}
        <a
          href="https://gravatar.com/connect/"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Gravatar
        </a>
        .
      </p>
      <br></br>
      <p className="text-xl font-bold mb-5">Votre profil :</p>
      <form onSubmit={onSubmit} className="max-w-md mx-auto w-1/2">
        <div className="mb-4">
          <label htmlFor="username" className="block ml-20 mr-5">
            Votre pseudo :
          </label>
          <input
            className="border py-2 px-4 w-full rounded-md text-black"
            type="text"
            name="username"
            id="username"
            placeholder={user?.username}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="full_name" className="block ml-20 mr-5">
            Votre Nom :
          </label>
          <input
            className="border py-2 px-4 w-full rounded-md text-black"
            type="text"
            name="full_name"
            id="full_name"
            placeholder={user?.full_name}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="full_name" className="block ml-20 mr-5">
            Votre langue :
          </label>
          <br></br>
          <div className="flex items-center mb-3">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="default-radio-1" className="block ml-5 mr-5">
              Français
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="default-radio-2" className="block ml-5 mr-5">
              Anglais
            </label>
          </div>
        </div>
        <div className="mb-4 flex justify-center">
          <input
            type="submit"
            value="Mofifier"
            className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg cursor-pointer hover:from-cyan-700 hover:to-cyan-900 active:from-cyan-900 active:to-blue-700 focus:ring-2 focus:ring-cyan-400 "
          />
        </div>
      </form>
    </div>
  );
}
