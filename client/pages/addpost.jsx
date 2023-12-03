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
            console.log(value.data[0]);
            setUser(value.data[0]);
          }
        });
    }
    getUserProfile();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    const { title, content, categorie, tags } = event.target.elements;
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
        id_user: user?.id,
      },
    ]);
    router.push("/post");
  };
  return (
    <main className="flex">
      <div className="w-1/2">
        <h2 className="mt-10 max-w-md mx-auto">
          <p className="italic font-bold text-sky-500 dark:text-sky-400">
            Tu veux laisser un post c'est par ici
          </p>
        </h2>
      </div>
      <form onSubmit={onSubmit} className="mt-10 max-w-md mx-auto w-1/2">
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
            placeholder="Vous pouvez ecrire votre post"
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
            className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700"
          />
        </div>
      </form>
    </main>
  );
}
