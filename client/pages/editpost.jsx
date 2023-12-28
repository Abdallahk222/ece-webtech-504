import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function EditPost() {
  const router = useRouter();
  const { postId } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categorie, setCategorie] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (postId) {
      async function fetchPost() {
        const { data, error } = await supabase
          .from('post')
          .select('*')
          .eq('id', postId)
          .single();

        if (error) {
          console.error('Error fetching post', error);
        } else {
          setTitle(data.title);
          setContent(data.content); 
          setCategorie(data.categorie);
          setTags(data.tags);
        }
      }

      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('post')
      .update({ title, content, categorie, tags })
      .eq('id', postId);

    if (error) {
      console.error('Error updating post', error);
      alert('Error updating post: ' + error.message);
    } else {
      router.push('/post');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen"> {}
      <div className="w-full max-w-md"> {}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Titre</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Contenu</label>
            <input
              id="content"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categorie" className="block text-gray-700 text-sm font-bold mb-2">Catégorie</label>
            <input
              id="categorie"
              type="text"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg">
              Sauvegarder les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}