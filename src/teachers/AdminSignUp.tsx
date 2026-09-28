import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { CONTACT_EMAIL } from "@/lib/forms";
import { useAuth } from "./auth";
import { AuthCard, ErrorNote, Field, friendlyError, goldButton } from "./ui";

// One-time setup of the shared FSA admin account. Not linked from anywhere.
// The database decides who is an admin (by email), so this page grants nothing on its own.
const AdminSignUp = () => {
  const { session } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (session) return <Navigate to="/teachers/admin" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Your password needs to be at least 8 characters.");
      return;
    }
    setSending(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: CONTACT_EMAIL,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/teachers/admin`,
        data: { first_name: "FSA", last_name: "Admin" },
      },
    });
    setSending(false);
    if (signUpError) setError(friendlyError(signUpError.message));
    else if (!data.session) setSent(true);
  };

  if (sent) {
    return (
      <AuthCard title="Check your email">
        <p className="text-lg leading-relaxed text-foreground">
          We sent a confirmation link to <span className="font-semibold">{CONTACT_EMAIL}</span>. Click it, then sign in
          with this password.
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Set up the FSA admin account" intro={`This creates the admin account for ${CONTACT_EMAIL}.`}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field id="password" label="Choose a password" hint="At least 8 characters. Share it only with FSA admins.">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </Field>
        {error && <ErrorNote>{error}</ErrorNote>}
        <Button type="submit" size="lg" disabled={sending} className={`w-full text-base ${goldButton}`}>
          {sending ? "Creating…" : "Create admin account"}
        </Button>
      </form>
    </AuthCard>
  );
};

export default AdminSignUp;
