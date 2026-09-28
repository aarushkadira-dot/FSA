import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import type { School } from "@/data/titleOneSchools";
import SchoolPicker from "./SchoolPicker";
import { useAuth } from "./auth";
import { AuthCard, ErrorNote, Field, friendlyError, goldButton, selectClass } from "./ui";

const GRADES = ["Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade", "Multiple grades"];

const SignUp = () => {
  const { session } = useAuth();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", grade: "", subject: "" });
  const [school, setSchool] = useState<School | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  if (session) return <Navigate to="/teachers/dashboard" replace />;

  const update = (name: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!school) {
      setError("Choose your school from the list.");
      return;
    }
    if (form.password.length < 8) {
      setError("Your password needs to be at least 8 characters.");
      return;
    }
    setSending(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/teachers/dashboard`,
        data: {
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          school_id: school.id,
          school_name: school.name,
          grade: form.grade,
          subject: form.subject.trim(),
        },
      },
    });
    setSending(false);
    if (signUpError) {
      setError(friendlyError(signUpError.message));
      return;
    }
    // With email confirmation on, there's no session until the link is clicked.
    if (!data.session) setSentTo(form.email.trim());
  };

  if (sentTo) {
    return (
      <AuthCard title="Check your email">
        <p className="text-lg leading-relaxed text-foreground">
          We sent a confirmation link to <span className="font-semibold">{sentTo}</span>. Click it to finish creating
          your account.
        </p>
        <p className="mt-4 text-muted-foreground">
          After that, an FSA admin will review your account. You can sign in any time to check its status.
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create a teacher account"
      intro={
        <>
          Already have one?{" "}
          <Link to="/teachers/sign-in" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="firstName" label="First name">
            <Input id="firstName" value={form.firstName} onChange={update("firstName")} required autoComplete="given-name" />
          </Field>
          <Field id="lastName" label="Last name">
            <Input id="lastName" value={form.lastName} onChange={update("lastName")} required autoComplete="family-name" />
          </Field>
        </div>
        <Field id="school" label="School" hint="Only North Carolina Title I schools are listed.">
          <SchoolPicker value={school} onChange={setSchool} />
        </Field>
        <Field id="email" label="School email" hint="Please use your school email so we can verify you.">
          <Input id="email" type="email" value={form.email} onChange={update("email")} required autoComplete="email" />
        </Field>
        <Field id="password" label="Password" hint="At least 8 characters.">
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={update("password")}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="grade" label="Grade you teach">
            <select id="grade" value={form.grade} onChange={update("grade")} required className={selectClass}>
              <option value="" disabled>
                Select a grade
              </option>
              {GRADES.map((grade) => (
                <option key={grade}>{grade}</option>
              ))}
            </select>
          </Field>
          <Field id="subject" label="Subject">
            <Input id="subject" value={form.subject} onChange={update("subject")} required placeholder="e.g. Math, All subjects" />
          </Field>
        </div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required
            className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
          />
          <span className="text-sm text-foreground">
            I teach at the school above, and I agree to the{" "}
            <Link to="/terms-of-service" className="font-semibold text-primary hover:underline">
              terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="font-semibold text-primary hover:underline">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {error && <ErrorNote>{error}</ErrorNote>}
        <Button type="submit" size="lg" disabled={sending} className={`w-full text-base ${goldButton}`}>
          {sending ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthCard>
  );
};

export default SignUp;
