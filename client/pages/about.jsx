import { useEffect, useState } from 'react';

export default function About() {
  const [animate, setAnimate] = useState('');

  useEffect(() => {
    setAnimate('bounce');
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center mt-20 ${animate}`}>
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .bounce {
          animation: bounce 1s ease-in-out 6;
        }
      `}</style>
      <h2 className="mb-4 font-bold">Projet Webtech</h2>
      <h3 className="italic">Nous sommes des élèves de l'ECE en Ing4 système d'information.</h3>
      <h4 className="italic">Nous avons créer une application web qui permet de rechercher des films et les commenter !</h4>
      <h5 className="italic">Nous avons utilisé React, Next.js, Tailwind CSS et Supabase.</h5>
      <h6 className="italic">Ce projet est réalisé par : Abdallah Kadir Abdallah, Hamed Bamba, Ryan Bagot, Taryll Mohamed et Gregoire Petiet.</h6>
    </div>
  );
}