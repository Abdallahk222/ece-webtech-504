import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
        return router.push("/login");
      }
      setUser(user);
    };
    fetchUser();
  }, [router]);

  const SignOut = () => {
    supabase.auth.signOut().then(() => {
      router.push("/login");
    });
  };

  return (
    <div>
      <h1>Bienvenue {user?.email}</h1>
      <button onClick={SignOut}>Sign Out</button>
    </div>
  );
}
