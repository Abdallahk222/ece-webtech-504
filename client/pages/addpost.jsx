import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function addpost() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    async function getUserProfile() {
      await supabase
        .from("profiles")
        .select("id, username, full_name")
        .then((value) => {
          if (value.data[0]) {
            setUser(value.data[0]);
          }
        });
    }
    getUserProfile();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    const { title, content, categorie, tags } = event.target.elements;
    var currentdate = new Date();
    var isoDate = currentdate.toISOString().split("T")[0];
    if (title.value === "" || content.value === "") {
      alert("Veuillez au moins remplir votre titre et votre contenu.");
      return;
    }

    await supabase.from("post").insert([
      {
        title: title.value,
        content: content.value,
        categorie: categorie.value,
        tags: tags.value,
        creation_date: isoDate,
        id_user: user?.id,
      },
    ]);
    router.push("/post");
  };

  return (
    <main className="flex">
      <form onSubmit={onSubmit} className="mt-10 mx-auto w-1/2">
        <p className="italic font-bold text-sky-500 dark:text-sky-400">
          Créer votre post
        </p>
        <br></br>
        <div className="mb-4">
          <label htmlFor="title" className="block ml-20 mr-5">
            Titre
          </label>
          <input
            className="border py-2 px-4 w-full rounded-md text-black"
            type="text"
            name="title"
            id="title"
            placeholder="Veuillez donner le nom du film s'il vous plait"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block ml-20 mr-5">
            Contenu
          </label>
          <textarea
            rows={5}
            className="border py-2 px-4 w-full rounded-md text-black"
            type="text"
            name="content"
            id="content"
            placeholder="Vous pouvez écrire votre post"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="categorie" className="block ml-20 mr-5">
            Catégorie
          </label>
          <input
            className="border py-2 px-4 w-full rounded-md text-black"
            type="text"
            name="categorie"
            id="categorie"
            placeholder="Choisissez une catégorie"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block ml-20 mr-5">
            Tags
          </label>
          <input
            className="border py-2 px-4 w-full rounded-md text-black"
            type="text"
            name="tags"
            id="tags"
            placeholder="#tags"
          />
        </div>

        <div className="mb-4 flex justify-center">
          <input
            type="submit"
            value="Envoyer"
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:from-cyan-700 hover:to-cyan-900 active:from-cyan-900 active:to-blue-700 focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </form>
    </main>
  );
}
