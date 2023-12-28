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

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [categorie, setCategorie] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        const { data, error } = await supabase
          .from('post')
          .select('*')
          .eq('id', postId)
          .single();

        if (error) {
          console.error('Erreur lors de la récupération du post', error);
        } else {
          setPost(data);
          setTitle(data.title);
          setCategorie(data.categorie);
          setTags(data.tags);
        }
      };

      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('post')
      .update({ title, categorie, tags })
      .eq('id', postId);

    if (error) {
      console.error('Erreur lors de la mise à jour du post', error);
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
