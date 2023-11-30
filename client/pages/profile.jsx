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
        .select("id, username, full_name, avatar_url")
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
    const { username, full_name, avatar_url } = event.target.elements;
    if (username.value === "") {
      username.value = user?.username;
    }
    if (full_name.value === "") {
      full_name.value = user?.full_name;
    }
    if (avatar_url.value === "") {
      avatar_url.value = user?.avatar_url;
    }
    await supabase
      .from("profiles")
      .update({
        username: username.value,
        full_name: full_name.value,
        avatar_url: avatar_url.value,
      })
      .eq("id", user?.id)
      .then(() => {
        router.push("/profile");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <br></br>
      <br></br>
      <h1 className="text-xl font-bold">
        Bienvenue {user?.username ? user?.username : userT?.email}
      </h1>
      <br></br>
      <br></br>
      <p className="text-xl font-bold mb-5">Votre profil :</p>
      <form onSubmit={onSubmit} className="max-w-md mx-auto w-1/2">
        <div className="mb-4">
          <label htmlFor="subject" className="block ml-20 mr-5">
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
          <label htmlFor="lastname" className="block ml-20 mr-5">
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
          <label htmlFor="firstname" className="block ml-20 mr-5">
            Votre avatar :
          </label>
          <input
            className="border py-2 px-4 w-full rounded-md text-black"
            type="text"
            name="avatar_url"
            id="avatar_url"
            placeholder={user?.avatar_url}
          />
        </div>
        <div className="mb-4 flex justify-center">
          <input
            type="submit"
            value="Mofifier"
            className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700"
          />
        </div>
      </form>
    </div>
  );
}
