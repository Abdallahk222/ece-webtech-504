import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function PostComplet() {
  const router = useRouter();
  const { postId } = router.query;
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

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

      if (postId) {
        const { data: commentsData, error: commentsError } = await supabase
          .from("comments")
          .select("*")
          .eq("id_post", postId);

        if (commentsError) {
          console.error("Error fetching comments:", commentsError);
        } else {
          setComments(commentsData);
        }
      }
    }

    fetchPostData();
  }, [postId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const { email, commentary } = event.target.elements;
    if (commentary.value === "" || email.value === "") {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    await supabase.from("comments").insert([
      {
        id_post: postId,
        commentary: commentary.value,
        email: email.value,
      },
    ]);
    router.push(`/postcomplet?postId=${postId}`);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">{postTitle}</h1>
        <p className="text-lg">{postContent}</p>

        <div className="mt-8 ml-4">
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <input
              className="block w-full border border-gray-300 rounded-md p-2 text-black"
              type="text"
              name="email"
              id="email"
              placeholder="veillez renseigner votre email"
            />
            <textarea
              name="commentary"
              id="commentary"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="block w-full border border-gray-300 rounded-md p-2 text-black">
              </textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
              Commenter
            </button>
          </form>

          <div>
            <h3 className="text-lg font-bold">Commentaires</h3>
            <table>
              <thead>
                <tr>
                  {" "}
                  <th>Utilisateur</th>
                  <th>Commentaire</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((com) => (
                  <tr>
                    <th>{com.email}</th>
                    <th>{com.commentary}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
