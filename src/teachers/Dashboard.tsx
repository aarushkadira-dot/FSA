import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { CONTACT_EMAIL } from "@/lib/forms";
import { useAuth } from "./auth";
import { ErrorNote, Field, Loading, goldButton, outlineButton } from "./ui";

const statusCopy = {
  pending: {
    title: "Your account is waiting for approval",
    body: "An FSA admin will check that you teach at the school you chose. Once you're approved, you'll be able to request supplies here.",
    tone: "border-gold bg-gold/10",
  },
  approved: {
    title: "Your account is approved",
    body: "You can request supplies for your classroom.",
    tone: "border-success bg-success/10",
  },
  rejected: {
    title: "We couldn't approve your account",
    body: `If you think this is a mistake, email us at ${CONTACT_EMAIL}.`,
    tone: "border-destructive bg-destructive/5",
  },
} as const;

const Dashboard = () => {
  const { loading, session, profile, refreshProfile, signOut } = useAuth();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ first_name: "", last_name: "", grade: "", subject: "" });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (loading) return <Loading />;
  if (!session) return <Navigate to="/teachers/sign-in" replace />;
  if (!profile) return <Loading />;
  if (profile.role === "admin") return <Navigate to="/teachers/admin" replace />;

  const status = statusCopy[profile.status];

  const startEditing = () => {
    setDraft({
      first_name: profile.first_name,
      last_name: profile.last_name,
      grade: profile.grade ?? "",
      subject: profile.subject ?? "",
    });
    setError(null);
    setEditing(true);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error: saveError } = await supabase.from("profiles").update(draft).eq("id", profile.id);
    setSaving(false);
    if (saveError) {
      setError("We couldn't save your changes. Please try again.");
      return;
    }
    await refreshProfile();
    setEditing(false);
  };

  return (
    <div className="bg-secondary py-12 md:py-16">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-semibold text-primary">Teacher dashboard</p>
            <h1 className="mt-1 text-3xl font-bold text-foreground md:text-4xl">Hi, {profile.first_name || "there"}</h1>
          </div>
          <Button variant="outline" onClick={signOut} className={outlineButton}>
            Sign out
          </Button>
        </div>

        <div className={`mt-8 rounded-lg border-l-4 bg-white p-6 ${status.tone}`} role="status">
          <h2 className="text-xl font-semibold text-foreground">{status.title}</h2>
          <p className="mt-1 text-muted-foreground">{status.body}</p>
        </div>

        {profile.status === "approved" && (
          <section className="mt-8 rounded-lg border border-border bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground">Your supply requests</h2>
            <p className="mt-2 text-muted-foreground">
              Online requests are coming soon. Until then, email what your classroom needs and we'll set it up for you.
            </p>
            <Button asChild className={`mt-5 ${goldButton}`}>
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Supply request from ${profile.first_name} ${profile.last_name}, ${profile.school_name ?? ""}`)}`}>
                Email a request
              </a>
            </Button>
          </section>
        )}

        <section className="mt-8 rounded-lg border border-border bg-white p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground">Your profile</h2>
            {!editing && (
              <button type="button" onClick={startEditing} className="font-semibold text-primary hover:underline">
                Edit
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={save} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="first_name" label="First name">
                  <Input id="first_name" value={draft.first_name} onChange={(e) => setDraft({ ...draft, first_name: e.target.value })} required />
                </Field>
                <Field id="last_name" label="Last name">
                  <Input id="last_name" value={draft.last_name} onChange={(e) => setDraft({ ...draft, last_name: e.target.value })} required />
                </Field>
                <Field id="grade" label="Grade">
                  <Input id="grade" value={draft.grade} onChange={(e) => setDraft({ ...draft, grade: e.target.value })} />
                </Field>
                <Field id="subject" label="Subject">
                  <Input id="subject" value={draft.subject} onChange={(e) => setDraft({ ...draft, subject: e.target.value })} />
                </Field>
              </div>
              {error && <ErrorNote>{error}</ErrorNote>}
              <div className="flex gap-3">
                <Button type="submit" disabled={saving} className={goldButton}>
                  {saving ? "Saving…" : "Save"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setEditing(false)} className={outlineButton}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                ["Name", `${profile.first_name} ${profile.last_name}`],
                ["Email", profile.email],
                ["School", profile.school_name ?? "—"],
                ["Grade", profile.grade ?? "—"],
                ["Subject", profile.subject ?? "—"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="mt-0.5 font-medium text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          <p className="mt-6 text-sm text-muted-foreground">
            Need to change your school or email?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary hover:underline">
              Contact us
            </a>
            .
          </p>
        </section>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link to="/teachers" className="font-semibold text-primary hover:underline">
            About the teacher program
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
