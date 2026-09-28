import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./auth";
import { AuthCard, ErrorNote, Field, friendlyError, goldButton } from "./ui";

const SignIn = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  if (session) return <Navigate to="/teachers/dashboard" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setSending(false);
    if (signInError) setError(friendlyError(signInError.message));
    else navigate("/teachers/dashboard", { replace: true });
  };

  return (
    <AuthCard
      title="Teacher sign in"
      intro={
        <>
          New here?{" "}
          <Link to="/teachers/sign-up" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field id="email" label="Email">
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </Field>
        <Field id="password" label="Password">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </Field>
        {error && <ErrorNote>{error}</ErrorNote>}
        <Button type="submit" size="lg" disabled={sending} className={`w-full text-base ${goldButton}`}>
          {sending ? "Signing in…" : "Sign in"}
        </Button>
        <Link to="/teachers/forgot-password" className="block text-center text-sm font-semibold text-primary hover:underline">
          Forgot your password?
        </Link>
      </form>
    </AuthCard>
  );
};

export default SignIn;
