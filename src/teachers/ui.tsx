import type { ReactNode } from "react";

export const outlineButton =
  "border-primary text-primary hover:bg-primary hover:text-primary-foreground";
export const goldButton = "bg-gold text-gold-foreground hover:bg-gold/90";
export const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm";

export const Field = ({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) => (
  <div>
    <label htmlFor={id} className="block font-semibold text-foreground">
      {label}
    </label>
    {hint && <p className="mt-0.5 text-sm text-muted-foreground">{hint}</p>}
    <div className="mt-2">{children}</div>
  </div>
);

// Narrow centered card used by the sign-in style pages.
export const AuthCard = ({ title, intro, children }: { title: string; intro?: ReactNode; children: ReactNode }) => (
  <div className="bg-secondary py-12 md:py-16">
    <div className="container mx-auto max-w-lg px-4 sm:px-6">
      <div className="rounded-lg border border-border bg-white p-6 md:p-8">
        <h1 className="text-3xl font-bold text-primary">{title}</h1>
        {intro && <div className="mt-2 text-muted-foreground">{intro}</div>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  </div>
);

export const ErrorNote = ({ children }: { children: ReactNode }) => (
  <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
    {children}
  </p>
);

export const Loading = () => (
  <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground" role="status">
    Loading…
  </div>
);

// Supabase error messages, rewritten for teachers.
export const friendlyError = (message: string) => {
  const text = message.toLowerCase();
  if (text.includes("invalid login credentials")) return "That email and password don't match. Try again or reset your password.";
  if (text.includes("email not confirmed")) return "Please confirm your email first. Check your inbox for the link we sent.";
  if (text.includes("already registered")) return "An account with this email already exists. Try signing in instead.";
  if (text.includes("password should be")) return "Your password needs to be at least 8 characters.";
  if (text.includes("rate limit") || text.includes("too many")) return "Too many attempts. Please wait a few minutes and try again.";
  if (text.includes("not authorized") || text.includes("error sending"))
    return "We couldn't send the email right now. Please contact futurescholars.contact@gmail.com.";
  return message;
};
