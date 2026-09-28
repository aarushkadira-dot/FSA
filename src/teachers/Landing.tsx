import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TITLE_I_SCHOOL_COUNT } from "@/data/titleOneSummary";
import { useAuth } from "./auth";
import { goldButton, outlineButton } from "./ui";

const steps = [
  { title: "Create your account", body: "Sign up with your school email and choose your school." },
  { title: "We approve it", body: "An FSA admin checks that you teach at a North Carolina Title I school." },
  { title: "Request supplies", body: "Tell us what your classroom needs. We raise the money and deliver it." },
];

const Landing = () => {
  const { session, profile } = useAuth();

  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-14 sm:px-6 md:py-20">
          <p className="font-semibold text-gold">For teachers</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Get supplies for your Title I classroom
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            Teachers at any of North Carolina's {TITLE_I_SCHOOL_COUNT.toLocaleString()} Title I schools can ask FSA
            for the supplies their students need. It's free.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {session ? (
              <Button asChild size="lg" className={`text-base ${goldButton}`}>
                <Link to="/teachers/dashboard">
                  {profile?.role === "admin" ? "Go to admin" : "Go to your dashboard"}
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className={`text-base ${goldButton}`}>
                  <Link to="/teachers/sign-up">Create an account</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
                >
                  <Link to="/teachers/sign-in">Sign in</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">How it works</h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t-4 border-gold pt-5">
                <p className="text-sm font-semibold text-muted-foreground">Step {index + 1}</p>
                <h3 className="mt-1 text-xl font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-secondary py-16 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-primary md:text-4xl">Who can sign up</h2>
            <ul className="mt-6 space-y-3 text-lg text-muted-foreground">
              <li>• Teachers at a North Carolina Title I public school, including charter schools</li>
              <li>• Pre-K through 12th grade, any subject</li>
              <li>• One account per teacher</li>
            </ul>
            <Link to="/find-school" className="mt-6 inline-block font-semibold text-primary hover:underline">
              Check if your school is Title I
            </Link>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-primary">Already have an account?</h2>
            <p className="mt-2 text-muted-foreground">Sign in to see your account and requests.</p>
            <Button asChild variant="outline" className={`mt-5 ${outlineButton}`}>
              <Link to={session ? "/teachers/dashboard" : "/teachers/sign-in"}>{session ? "Go to your dashboard" : "Sign in"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
