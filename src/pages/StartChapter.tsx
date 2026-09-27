import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CHAPTERS } from "@/data/organization";
import { CONTACT_EMAIL, submitForm } from "@/lib/forms";

const GRADES = ["9th grade", "10th grade", "11th grade", "12th grade", "College", "Other"];
const TEAM_SIZES = ["Just me for now", "2–5 students", "6–10 students", "More than 10 students"];
const ADVISOR_OPTIONS = ["Yes", "Not yet, but I have someone in mind", "No"];
const HEARD_FROM = ["A friend or classmate", "An FSA event", "Social media", "My school", "Search engine", "Other"];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  school: "",
  grade: "",
  city: "",
  state: "",
  country: "United States",
  teamSize: "",
  advisor: "",
  localSchools: "",
  why: "",
  experience: "",
  heardFrom: "",
  consent: false,
  _honey: "",
};

type FormState = typeof initialForm;

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm";

const Field = ({
  id,
  label,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) => (
  <div>
    <label htmlFor={id} className="block font-semibold text-foreground">
      {label}
      {required ? <span className="text-destructive"> *</span> : <span className="font-normal text-muted-foreground"> (optional)</span>}
    </label>
    {hint && <p className="mt-0.5 text-sm text-muted-foreground">{hint}</p>}
    <div className="mt-2">{children}</div>
  </div>
);

const steps = [
  "Recruit a few classmates and, ideally, a teacher advisor.",
  "Partner with a Title I school near you and learn what its classrooms need.",
  "Run supply drives and fundraisers, and deliver the supplies yourselves.",
];

const StartChapter = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const update = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const next = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: next }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form._honey) return; // bot filled the hidden field
    setStatus("sending");
    try {
      await submitForm(`New chapter application: ${form.firstName} ${form.lastName} (${form.city})`, {
        "First name": form.firstName,
        "Last name": form.lastName,
        Email: form.email,
        Phone: form.phone,
        School: form.school,
        Grade: form.grade,
        City: form.city,
        "State / province": form.state,
        Country: form.country,
        "Students ready to join": form.teamSize,
        "Has a teacher advisor": form.advisor,
        "Nearby Title I schools": form.localSchools || "—",
        "Why they want to start a chapter": form.why,
        "Leadership / volunteer experience": form.experience || "—",
        "Heard about FSA from": form.heardFrom || "—",
      });
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="bg-secondary py-20">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6">
          <div className="rounded-lg border border-border bg-white p-8 md:p-10">
            <h1 className="text-3xl font-bold text-foreground">Thanks, {form.firstName}. Your application is in.</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Our team will review it and reach out at <span className="font-semibold text-foreground">{form.email}</span>{" "}
              about next steps for a chapter in {form.city}.
            </p>
            <Button asChild className="mt-8 font-semibold">
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="container mx-auto grid gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-14">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">Start a chapter</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Bring FSA to your community. Chapters are run by students who get school supplies into Title I
              classrooms near them.
            </p>
            <p className="mt-4 text-muted-foreground">
              Current chapters: {CHAPTERS.map((chapter) => chapter.name).join(", ")}.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">What a chapter does</h2>
            <ol className="mt-5 space-y-5">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <p className="pt-1.5 leading-relaxed text-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-foreground">Chapter application</h2>
          <p className="mt-2 text-muted-foreground">It takes about 5 minutes. Fields marked * are required.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-10">
            <input
              type="text"
              name="_honey"
              value={form._honey}
              onChange={update}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <fieldset className="space-y-6">
              <legend className="mb-6 border-b border-border pb-2 text-xl font-semibold text-foreground">About you</legend>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="firstName" label="First name" required>
                  <Input id="firstName" name="firstName" value={form.firstName} onChange={update} required autoComplete="given-name" />
                </Field>
                <Field id="lastName" label="Last name" required>
                  <Input id="lastName" name="lastName" value={form.lastName} onChange={update} required autoComplete="family-name" />
                </Field>
                <Field id="email" label="Email" required>
                  <Input id="email" name="email" type="email" value={form.email} onChange={update} required autoComplete="email" />
                </Field>
                <Field id="phone" label="Phone number" required>
                  <Input id="phone" name="phone" type="tel" value={form.phone} onChange={update} required autoComplete="tel" />
                </Field>
                <Field id="school" label="School you attend" required>
                  <Input id="school" name="school" value={form.school} onChange={update} required />
                </Field>
                <Field id="grade" label="Grade" required>
                  <select id="grade" name="grade" value={form.grade} onChange={update} required className={selectClass}>
                    <option value="" disabled>
                      Select your grade
                    </option>
                    {GRADES.map((grade) => (
                      <option key={grade}>{grade}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </fieldset>

            <fieldset className="space-y-6">
              <legend className="mb-6 border-b border-border pb-2 text-xl font-semibold text-foreground">Your chapter</legend>
              <div className="grid gap-6 sm:grid-cols-3">
                <Field id="city" label="City" required>
                  <Input id="city" name="city" value={form.city} onChange={update} required autoComplete="address-level2" />
                </Field>
                <Field id="state" label="State / province" required>
                  <Input id="state" name="state" value={form.state} onChange={update} required autoComplete="address-level1" />
                </Field>
                <Field id="country" label="Country" required>
                  <Input id="country" name="country" value={form.country} onChange={update} required autoComplete="country-name" />
                </Field>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="teamSize" label="How many students are ready to join?" required>
                  <select id="teamSize" name="teamSize" value={form.teamSize} onChange={update} required className={selectClass}>
                    <option value="" disabled>
                      Select one
                    </option>
                    {TEAM_SIZES.map((size) => (
                      <option key={size}>{size}</option>
                    ))}
                  </select>
                </Field>
                <Field id="advisor" label="Do you have a teacher advisor?" required>
                  <select id="advisor" name="advisor" value={form.advisor} onChange={update} required className={selectClass}>
                    <option value="" disabled>
                      Select one
                    </option>
                    {ADVISOR_OPTIONS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field
                id="localSchools"
                label="Title I schools near you"
                hint="Name any schools you think your chapter could support."
              >
                <Input id="localSchools" name="localSchools" value={form.localSchools} onChange={update} />
              </Field>
            </fieldset>

            <fieldset className="space-y-6">
              <legend className="mb-6 border-b border-border pb-2 text-xl font-semibold text-foreground">A bit more</legend>
              <Field id="why" label="Why do you want to start an FSA chapter?" required>
                <Textarea id="why" name="why" value={form.why} onChange={update} required rows={5} />
              </Field>
              <Field
                id="experience"
                label="Leadership or volunteer experience"
                hint="Clubs, service projects, fundraisers, anything relevant."
              >
                <Textarea id="experience" name="experience" value={form.experience} onChange={update} rows={4} />
              </Field>
              <Field id="heardFrom" label="How did you hear about FSA?">
                <select id="heardFrom" name="heardFrom" value={form.heardFrom} onChange={update} className={selectClass}>
                  <option value="">Select one</option>
                  {HEARD_FROM.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={update}
                  required
                  className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
                />
                <span className="text-foreground">
                  I agree to be contacted by the Future Scholars Association about starting a chapter.
                  <span className="text-destructive"> *</span>
                </span>
              </label>
            </fieldset>

            {status === "error" && (
              <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-destructive">
                Something went wrong and your application wasn't sent. Please try again, or email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={status === "sending"}
              className="w-full bg-gold text-base font-semibold text-gold-foreground hover:bg-gold/90 sm:w-auto"
            >
              {status === "sending" ? "Sending…" : "Submit application"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default StartChapter;
