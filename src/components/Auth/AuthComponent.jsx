import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../services/supabaseClient";

/**
 * Renders the full Supabase login form.
 * Shows email-magic-link + Google & GitHub OAuth buttons out-of-the-box.
 */
export default function AuthComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "github"]}
        localization={{
          variables: { sign_in: { email_label: "Work email" } },
        }}
      />
    </div>
  );
}
