// Import des dépendances nécessaires depuis React et Next.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

// Initialisation du client Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Définition du composant PostComplet
export default function PostComplet() {
  const router = useRouter();
  const { postId } = router.query; // Récupération de l'ID du post depuis l'URL
  const [postContent, setPostContent] = useState(""); // État pour stocker le contenu du post
  const [postTitle, setPostTitle] = useState("");
  const [comment, setComment] = useState(""); // État pour stocker le commentaire saisi par l'utilisateur
  const [comments, setComments] = useState([]); // État pour stocker tous les commentaires associés au post

  // Fonction pour récupérer le contenu du post et les commentaires associés
  useEffect(() => {
    async function fetchPostData() {
      if (postId) {
        const { data: postData, error: postError } = await supabase
          .from("post")
          .select("title,content")
          .eq("id", postId)
          .single();

        if (postError) {
          console.error("Error fetching post:", postError);
        } else {
          const title = postData ? postData.title : "";
          const content = postData ? postData.content : "";
          setPostTitle(title);
          setPostContent(content);
        }
      }

      // Récupération des commentaires associés au post
      if (postId) {
        const { data: commentsData, error: commentsError } = await supabase
          .from("comments")
          .select("*")
          .eq("post_id", postId);

        if (commentsError) {
          console.error("Error fetching comments:", commentsError);
        } else {
          setComments(commentsData || []);
        }
      }
    }

    fetchPostData();
  }, [postId]); // Déclenchement de l'effet lors du changement de l'ID du post

  // Fonction pour soumettre un nouveau commentaire

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log("handleCommentSubmit function called");

    const form = new FormData(e.target);
    const commentInput = form.get("commentary");
    const { commentary } = e.target.elements;

    // Vérifie si commentary existe et s'il contient la référence à l'élément textarea
    if (commentary && commentary.value.trim() !== "") {
      const commentInput = commentary.value.trim();

      try {
        const { data: insertedComment, error } = await supabase
          .from("comments")
          .insert([{ commentary: commentInput }]);

        if (error) {
          console.error("Error adding comment:", error);
        } else {
          setComments([...comments, insertedComment[0]]);
          setComment("");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  // Affichage du composant
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">{postTitle}</h1>
        <p className="text-lg">{postContent}</p>

        <div className="mt-8 ml-4">
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              name="commentary"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="block w-full border border-gray-300 rounded-md p-2 text-black"
            ></textarea>
            <button
              type="submit"
              /*value="commenter"*/
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
            >
              commenter
            </button>
          </form>

          <div>
            <h3 className="text-lg font-bold">Commentaires</h3>
            {/* Affichage des commentaires */}
            {/* ... */}
          </div>
        </div>
      </div>
    </div>
  );
}
