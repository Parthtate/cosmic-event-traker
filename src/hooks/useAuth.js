// import { useState, useEffect } from "react";
// import { supabase } from "../services/supabaseClient";

// export const useAuth = () => {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setLoading(false);
//     });

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, newSession) =>
//       setSession(newSession)
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   return { session, loading };
// };
