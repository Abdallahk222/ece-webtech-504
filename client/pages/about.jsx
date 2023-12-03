import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function commentaire() {
  const supabaseClient = useSupabaseClient();
  const onSubmit = async (event) => {
    event.preventDefault();
    const { title, content, categorie, tags, message } =
      event.target.elements;
    if (tags.value === "" || message.value === "") {
      alert("Veuillez au moins remplir votre tags et votre message.");
      return;
    }

    await supabaseClient.from("commentaire").insert([
      {
        title: title.value,
        content: content.value,
        categorie: categorie.value,
        tags: tags.value,
        message: message.value,
      },
    ]);
    alert("Votre message a bien été envoyé");
  };
  return (
    <main className="flex">
      <div className="w-1/2"> 

        <h2 className="mt-10 max-w-md mx-auto"><p className="italic font-bold text-sky-500 dark:text-sky-400">
          tu veux laisser un commentaire c'est par ici</p></h2> 
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h2 className="mt-10 max-w-md mx-auto"><p className="text-red-500">
            Attention, soyez indulgent dans vos propos.</p></h2>
 

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
            placeholder="veillez donner le nom du film s'il vous plait"
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
            placeholder="vous pouvez ecrire votre commentaire"
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
            placeholder="de quelle catégorie est ce film?"
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
