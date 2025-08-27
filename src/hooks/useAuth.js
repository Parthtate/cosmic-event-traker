import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

/**
 * useAuth
 * -------
 * usage: const { session, loading } = useAuth()
 */
export const useAuth = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // initial cookie check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // listen for future login / logout events
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_evt, newSession) => setSession(newSession)
    );

    return () => subscription?.subscription.unsubscribe();
  }, []);

  return { session, loading };
};
