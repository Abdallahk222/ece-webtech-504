import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import SearchBarPost from '../components/searchBarPost';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Post() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    supabase
      .from('profiles')
      .select('id, username, full_name')
      .then(({ data }) => {
        if (data?.length) {
          setUser(data[0]);
        }
      });
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      const { data: posts, error } = await supabase.from('post').select('*');
      if (error) {
        console.log('error', error);
      } else {
        const filteredPosts = searchTerm
          ? posts.filter((post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : posts;
        setPosts(filteredPosts);
      }
    }
    fetchPosts();
  }, [searchTerm]);

  const handleDelete = async (postId) => {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce post ?');
    if (confirmDelete) {
      const { error } = await supabase
        .from('post')
        .delete()
        .match({ id: postId });
      if (error) {
        console.error('Erreur lors de la suppression du post', error);
      } else {
        setPosts(posts.filter((post) => post.id !== postId));
      }
    }
  };

  return (
    <>
      {user && (
        <>
          <br />
          <div className="flex justify-center mt-10">
            <Link href="/addpost" className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg">
              Ajouter un post
            </Link>
          </div>
          <br />
        </>
      )}
      <div className="flex justify-center mt-10">
        <SearchBarPost onSearch={setSearchTerm} />
      </div>
      <div className="flex justify-center text-center mt-20 relative overflow-x-auto shadow-md sm:rounded-lg w-1/2 mx-auto">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 table-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-white dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Titre
              </th>
              <th scope="col" className="px-6 py-3">
                Catégorie
              </th>
              <th scope="col" className="px-6 py-3">
                Date de Création
              </th>
              <th scope="col" className="px-6 py-3">
                Tags
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {post.title}
                </th>
                <td className="px-6 py-4">{post.categorie}</td>
                <td className="px-6 py-4">{post.creation_date}</td>
                <td className="px-6 py-4">{post.tags}</td>
                <td className="px-6 py-4">
                  <Link href={`/postcomplet?postId=${post.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Ouvrir
                  </Link>
                  {user?.id === post.id_user && (
                    <>
                      <span>
                        {' | '}
                        <Link href={`/editpost?postId=${post.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Éditer
                        </Link>
                      </span>
                      <button onClick={() => handleDelete(post.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Supprimer
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
