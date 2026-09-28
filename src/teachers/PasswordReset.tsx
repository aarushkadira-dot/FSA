import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./auth";
import { AuthCard, ErrorNote, Field, friendlyError, goldButton, Loading } from "./ui";

// Step 1: ask for a reset link.
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/teachers/reset-password`,
    });
    setSending(false);
    if (resetError) setError(friendlyError(resetError.message));
    else setSent(true);
  };

  if (sent) {
    return (
      <AuthCard title="Check your email">
        <p className="text-lg leading-relaxed text-foreground">
          If an account exists for <span className="font-semibold">{email}</span>, we sent a link to reset your
          password.
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Reset your password" intro="Enter your email and we'll send you a link to choose a new password.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field id="email" label="Email">
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </Field>
        {error && <ErrorNote>{error}</ErrorNote>}
        <Button type="submit" size="lg" disabled={sending} className={`w-full text-base ${goldButton}`}>
          {sending ? "Sending…" : "Send reset link"}
        </Button>
        <Link to="/teachers/sign-in" className="block text-center text-sm font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      </form>
    </AuthCard>
  );
};

// Step 2: the link from the email signs the teacher in here; they choose a new password.
export const ResetPassword = () => {
  const { loading, session } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (loading) return <Loading />;

  if (!session) {
    return (
      <AuthCard title="This link has expired">
        <p className="text-muted-foreground">Reset links only work once and expire after a short time.</p>
        <Link to="/teachers/forgot-password" className="mt-4 inline-block font-semibold text-primary hover:underline">
          Send a new link
        </Link>
      </AuthCard>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (updateError) setError(friendlyError(updateError.message));
    else navigate("/teachers/dashboard", { replace: true });
  };

  return (
    <AuthCard title="Choose a new password">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field id="password" label="New password" hint="At least 8 characters.">
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
        <Button type="submit" size="lg" disabled={saving} className={`w-full text-base ${goldButton}`}>
          {saving ? "Saving…" : "Save password"}
        </Button>
      </form>
    </AuthCard>
  );
};
