import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function post() {
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
  const [posts, setpost] = useState([]);
  useEffect(() => {
    async function fetchPost() {
      const { data: posts, error } = await supabase.from("post").select("*");
      if (error) console.log("error", error);
      else setpost(posts);
    }
    fetchPost();
  }, []);

  return (
    <>
      {user ? (
        <>
          <br></br>
          <br></br>
          <div className="flex justify-center">
            <button>
              <Link
                href="/addpost"
                className={
                  "bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                }
              >
                Add a post
              </Link>
            </button>
          </div>
        </>
      ) : null}
      <div class="flex justify-center text-center mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-gray-500 darkmode:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 darkmode:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Titre
              </th>
              <th scope="col" class="px-6 py-3">
                Catégorie
              </th>
              <th scope="col" class="px-6 py-3">
                Date de Creation
              </th>
              <th scope="col" class="px-6 py-3">
                Tags
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {post.title}
                </th>
                <td class="px-6 py-4">{post.categorie}</td>
                <td class="px-6 py-4">{post.creation_date}</td>
                <td class="px-6 py-4">{post.tags}</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Open
                  </a>
                  {user?.id == post.id_user ? (
                    <>
                      {" "}
                      |{" "}
                      <a
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
