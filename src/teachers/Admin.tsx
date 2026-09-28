import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase, type AccountStatus, type Profile } from "@/lib/supabase";
import { useAuth } from "./auth";
import { ErrorNote, Loading, goldButton, outlineButton } from "./ui";

const TABS: { status: AccountStatus; label: string }[] = [
  { status: "pending", label: "Waiting for review" },
  { status: "approved", label: "Approved" },
  { status: "rejected", label: "Not approved" },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const Admin = () => {
  const { loading, session, profile, signOut } = useAuth();
  const [teachers, setTeachers] = useState<Profile[] | null>(null);
  const [tab, setTab] = useState<AccountStatus>("pending");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error: loadError } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "teacher")
      .order("created_at", { ascending: false });
    if (loadError) setError("We couldn't load teacher accounts. Refresh to try again.");
    else setTeachers(data as Profile[]);
  }, []);

  const isAdmin = profile?.role === "admin";
  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  if (loading) return <Loading />;
  if (!session) return <Navigate to="/teachers/sign-in" replace />;
  if (!profile) return <Loading />;
  if (!isAdmin) return <Navigate to="/teachers/dashboard" replace />;

  const setStatus = async (teacher: Profile, status: AccountStatus) => {
    if (status === "rejected" && !window.confirm(`Mark ${teacher.first_name} ${teacher.last_name} as not approved?`)) return;
    setBusy(teacher.id);
    setError(null);
    const { error: rpcError } = await supabase.rpc("set_teacher_status", { teacher_id: teacher.id, new_status: status });
    setBusy(null);
    if (rpcError) setError("That change didn't save. Please try again.");
    else await load();
  };

  const shown = (teachers ?? []).filter((teacher) => teacher.status === tab);
  const countFor = (status: AccountStatus) => (teachers ?? []).filter((teacher) => teacher.status === status).length;

  return (
    <div className="bg-secondary py-12 md:py-16">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-semibold text-primary">FSA admin</p>
            <h1 className="mt-1 text-3xl font-bold text-foreground md:text-4xl">Teacher accounts</h1>
          </div>
          <Button variant="outline" onClick={signOut} className={outlineButton}>
            Sign out
          </Button>
        </div>

        <div role="tablist" aria-label="Account status" className="mt-8 flex flex-wrap gap-2">
          {TABS.map((entry) => (
            <button
              key={entry.status}
              type="button"
              role="tab"
              aria-selected={tab === entry.status}
              onClick={() => setTab(entry.status)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                tab === entry.status ? "border-primary bg-primary text-primary-foreground" : "border-border bg-white text-foreground hover:border-primary"
              }`}
            >
              {entry.label} ({countFor(entry.status)})
            </button>
          ))}
        </div>

        {error && <div className="mt-6"><ErrorNote>{error}</ErrorNote></div>}

        {teachers === null ? (
          <Loading />
        ) : shown.length === 0 ? (
          <p className="mt-6 rounded-lg border border-border bg-white p-6 text-muted-foreground">No accounts here.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {shown.map((teacher) => (
              <li key={teacher.id} className="rounded-lg border border-border bg-white p-5 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {teacher.first_name} {teacher.last_name}
                    </p>
                    <a href={`mailto:${teacher.email}`} className="text-primary hover:underline">
                      {teacher.email}
                    </a>
                    <p className="mt-2 text-muted-foreground">
                      {teacher.school_name ?? "No school"}
                      {teacher.school_id ? ` (NC code ${teacher.school_id})` : ""}
                    </p>
                    <p className="text-muted-foreground">
                      {[teacher.grade, teacher.subject].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">Signed up {formatDate(teacher.created_at)}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {teacher.status !== "approved" && (
                      <Button disabled={busy === teacher.id} onClick={() => setStatus(teacher, "approved")} className={goldButton}>
                        Approve
                      </Button>
                    )}
                    {teacher.status !== "rejected" && (
                      <Button
                        variant="outline"
                        disabled={busy === teacher.id}
                        onClick={() => setStatus(teacher, "rejected")}
                        className={outlineButton}
                      >
                        {teacher.status === "approved" ? "Revoke" : "Don't approve"}
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 text-sm text-muted-foreground">
          Tip: a school email address (for example @wcpss.net) is the easiest way to confirm someone teaches where they say.
        </p>
      </div>
    </div>
  );
};

export default Admin;
