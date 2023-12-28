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
          setContent(data.content); // Assuming content is a JSON object or a string
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
    <div className="edit-post-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="categorie">Catégorie</label>
          <input
            id="categorie"
            type="text"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit">Sauvegarder les modifications</button>
        <Link href="/post"><a>Annuler</a></Link>
      </form>
    </div>
  );
}
