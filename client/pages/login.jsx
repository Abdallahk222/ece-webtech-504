import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/router";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Login = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    // valeur initiale de session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    // mise à jour de valeur de session
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription;
  }, [setSession]);

  const router = useRouter();
  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
      />
    );
  } else {
    router.push("/profile");
    return null;
  }
};
export default Login;