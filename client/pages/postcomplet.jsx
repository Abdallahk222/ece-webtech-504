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

  // ... (importations et initialisations inchangées)

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">{postTitle}</h1>
        <p className="text-lg">{postContent}</p>

        <div className="mt-8 ml-4">
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <input
              className="block w-full border border-gray-300 rounded-md p-2 text-black mb-4"
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
              className="block w-full border border-gray-300 rounded-md p-2 text-black mb-4"
            ></textarea>
            <button
              type="submit"
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:from-cyan-700 hover:to-cyan-900 active:from-cyan-900 active:to-blue-700 focus:ring-2 focus:ring-cyan-400"
            >
              Commenter
            </button>
          </form>

          <div>
            <h3 className="text-lg font-bold">Commentaires</h3>
            {comments.map((com) => (
              <div
                style={{
                  border: "1px solid cyan",
                  marginBottom: "16px",
                  padding: "8px",
                }}
              >
                <p style={{ marginBottom: "8px", fontWeight: "bold" }}>
                  {com.email}
                </p>
                <p>{com.commentary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
