import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImpactStats from "@/components/ImpactStats";
import { CHAPTERS, MISSION_STATEMENT, PARTNER_SCHOOLS } from "@/data/organization";
import { ADVISORY_BOARD, STUDENT_BOARD } from "@/data/team";
import { TITLE_I_SCHOOL_COUNT } from "@/data/titleOneSummary";
import { DONATE_PATH, START_CHAPTER_PATH } from "@/lib/links";
import founderPhoto from "@/assets/aarush.jpg";
import classroomPhoto from "@/assets/about-classroom.jpg";
import trophiesPhoto from "@/assets/trophies.jpg";

const facts = [
  { label: "Founded", value: "September 2025" },
  { label: "Status", value: "501(c)(3) nonprofit" },
  { label: "Based in", value: "Wake County, NC" },
  { label: "Chapters", value: CHAPTERS.map((chapter) => chapter.name).join(", ") },
];

const steps = [
  { title: "Teachers tell us what they need", body: "Teachers at our partner schools send us the supplies their classrooms are missing." },
  { title: "We raise the money", body: "Donors, drives and events cover the cost of each request." },
  { title: "We deliver the supplies", body: "Our student volunteers buy the items and bring them to the school." },
];

const people = [...STUDENT_BOARD, ...ADVISORY_BOARD];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

const About = () => (
  <div>
    {/* Header */}
    <section className="overflow-hidden bg-primary text-primary-foreground">
      <div className="container mx-auto grid items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="font-semibold text-gold">About the Future Scholars Association</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] md:text-6xl md:leading-[1.05]">
            We make sure students in Title I schools have the supplies they need to{" "}
            <span className="text-gold">learn.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
            A student-run nonprofit working with teachers at Title I schools in Wake County, North Carolina, and
            growing through student chapters.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-gold text-base font-semibold text-gold-foreground hover:bg-gold/90">
              <Link to={DONATE_PATH}>Donate</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-base font-semibold text-white hover:bg-white hover:text-primary"
            >
              <Link to="/team">Meet the team</Link>
            </Button>
          </div>
        </div>
        <div className="relative lg:col-span-5">
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg bg-gold" aria-hidden="true" />
          <img
            src={classroomPhoto}
            alt="Five smiling elementary students standing arm in arm in their classroom"
            className="relative aspect-[694/288] w-full rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="border-t border-white/15 bg-black/15">
        <dl className="container mx-auto grid grid-cols-2 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-sm text-white/65">{fact.label}</dt>
              <dd className="mt-1 font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    {/* Story */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <img
            src={founderPhoto}
            alt="Aarush Kadira, founder of the Future Scholars Association"
            className="aspect-square w-full max-w-sm rounded-lg object-cover"
          />
          <p className="mt-3 text-sm text-muted-foreground">Aarush Kadira, founder</p>
        </div>
        <div className="lg:col-span-8">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Our story</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/85">
            <p>
              Aarush Kadira started the Future Scholars Association in September 2025 with a simple goal: help the
              teachers in nearby Title I schools get the supplies their students were going without.
            </p>
            <p>
              A month later, Bugg Elementary became our first partner school. In January 2026 we ran our first supply
              drive and the Future Innovators Expo, a hands-on STEM day, reaching 294 students. In March we hosted the
              Future Scholars Summit, where students and nonprofits pitched ideas to community and state leaders.
            </p>
            <p>
              Today we support {PARTNER_SCHOOLS.length} Title I elementary schools in Wake County, and students have
              started FSA chapters in {CHAPTERS.map((chapter) => chapter.name).join(", ")}.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Why Title I */}
    <section className="border-y border-border bg-secondary">
      <div className="container mx-auto grid items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16">
        <img
          src={trophiesPhoto}
          alt="Elementary students holding trophies"
          className="aspect-[4/3] w-full rounded-lg object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Why Title I schools</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Title I schools serve many students from low-income families. North Carolina has{" "}
            {TITLE_I_SCHOOL_COUNT.toLocaleString()} of them. They receive extra federal funding, but teachers there
            still often buy basic classroom supplies with their own money. That is the gap we fill.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{MISSION_STATEMENT}</p>
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">How it works</h2>
        <ol className="mt-10 grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t-4 border-gold pt-5">
              <p className="text-sm font-semibold text-muted-foreground">Step {index + 1}</p>
              <h3 className="mt-1 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* People */}
    <section className="border-y border-border bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">The people behind FSA</h2>
            <p className="mt-2 text-lg text-muted-foreground">A student board, with guidance from our advisory board.</p>
          </div>
          <Link to="/team" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            Meet the full team, including our tutors
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {people.map((person) => (
            <li key={person.name} className="text-center">
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-primary md:h-28 md:w-28">
                {person.image ? (
                  <img src={person.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-primary-foreground">
                    {initials(person.name)}
                  </span>
                )}
              </div>
              <p className="mt-3 font-semibold text-foreground">{person.name}</p>
              <p className="text-sm text-muted-foreground">{person.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Numbers */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Our impact so far</h2>
          <Link to="/impact" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            See our impact
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10">
          <ImpactStats />
        </div>
      </div>
    </section>

    {/* Call to action */}
    <section className="border-t border-border bg-secondary">
      <div className="container mx-auto flex flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Help a Title I classroom</h2>
          <p className="mt-2 text-lg text-muted-foreground">Give supplies, or bring FSA to your school.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-gold text-base font-semibold text-gold-foreground hover:bg-gold/90">
            <Link to={DONATE_PATH}>Donate</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link to={START_CHAPTER_PATH}>Start a chapter</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default About;
