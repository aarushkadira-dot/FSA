import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImpactStats from "@/components/ImpactStats";
import WhereWeWork from "@/components/WhereWeWork";
import { EIN, FOUNDED, MISSION_STATEMENT } from "@/data/organization";
import { TITLE_I_SCHOOL_COUNT } from "@/data/titleOneSummary";
import { DONATE_PATH, START_CHAPTER_PATH, TEACHER_REQUEST_PATH } from "@/lib/links";
import { CONTACT_EMAIL } from "@/lib/forms";
import classroomPhoto from "@/assets/event1.jpg";
import buggPhoto from "@/assets/event3.jpg";
import advisorPhoto from "@/assets/tj2.jpg";

const steps = [
  {
    title: "A teacher asks for supplies",
    body: "Teachers at Title I schools tell us exactly what their classroom needs, from pencils and notebooks to STEM kits.",
  },
  {
    title: "Donors fund the request",
    body: "Your donation goes toward the items on that request, so you know what you are paying for.",
  },
  {
    title: "Supplies reach the classroom",
    body: "Our student volunteers purchase the supplies and bring them to the school.",
  },
];

const waysToGive = [
  { title: "Donate", body: "Fund supplies for a Title I classroom.", to: DONATE_PATH, label: "Donate" },
  { title: "Start a chapter", body: "Bring FSA to your school and community.", to: START_CHAPTER_PATH, label: "Apply" },
  { title: "Join the team", body: "Volunteer, tutor, or help run our events.", to: "/team", label: "Meet the team" },
  { title: "Become a partner", body: "Schools and organizations can work with us.", to: "/partners", label: "Our partners" },
];

const outlineButton =
  "border-primary font-semibold text-primary hover:bg-primary hover:text-primary-foreground";

const About = () => (
  <div>
    {/* Header */}
    <section className="border-b border-border bg-secondary">
      <div className="container mx-auto grid items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-14">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">About FSA</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            The Future Scholars Association is a student-run 501(c)(3) nonprofit. Since {FOUNDED}, we have been
            getting school supplies into Title I classrooms in Wake County, North Carolina.
          </p>
        </div>
        <img
          src={classroomPhoto}
          alt="Students at Bugg Elementary celebrating in their classroom"
          className="aspect-[4/3] w-full rounded-lg object-cover"
        />
      </div>
    </section>

    {/* Mission */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-lg font-semibold text-primary">Our mission</h2>
        <p className="mt-4 text-2xl font-medium leading-snug text-foreground md:text-3xl md:leading-snug">
          {MISSION_STATEMENT}
        </p>
      </div>
    </section>

    {/* Who we serve */}
    <section className="border-y border-border bg-secondary py-16 md:py-20">
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Who we serve</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              We focus on students in Title I schools. Title I is the federal program for schools where many students
              come from low-income families. There are {TITLE_I_SCHOOL_COUNT.toLocaleString()} of these schools in
              North Carolina.
            </p>
            <p>
              Title I schools receive extra federal funding, but many teachers still pay for basic classroom supplies
              with their own money. We work with teachers at our partner schools to cover what their students need.
            </p>
          </div>
          <Link to="/find-school" className="mt-6 inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            Find a Title I school near you
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <img
          src={buggPhoto}
          alt="The sign outside Bugg Magnet Elementary, our first partner school"
          className="aspect-[4/3] w-full rounded-lg object-cover"
        />
      </div>
    </section>

    {/* Our story */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Our story</h2>
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-foreground/85">
          <p>
            Aarush Kadira founded the Future Scholars Association on {FOUNDED}. A month later, Bugg Elementary became
            our first Title I partner school.
          </p>
          <p>
            In January 2026 we held our first events: a school supply drive for Bugg and the Future Innovators Expo, a
            hands-on STEM day. Together they reached 294 students. In March we hosted the Future Scholars Summit, where students,
            nonprofits and researchers pitched ideas to community and state leaders.
          </p>
          <p>
            Today we work with five Title I elementary schools in Wake County, and students have started FSA chapters
            in Charlotte, Houston, India and Vietnam.
          </p>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="border-y border-border bg-secondary py-16 md:py-20">
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <img
          src={advisorPhoto}
          alt="Mayor TJ Cawley, a member of our advisory board"
          className="aspect-[4/3] w-full rounded-lg object-cover object-top"
        />
        <div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Our team</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            FSA is run by students, with guidance from our advisory board, including Mayor TJ
            Cawley. Our student tutors also help students in chemistry, math, physics, English, speaking, CAD and AI.
          </p>
          <Button asChild variant="outline" className={`mt-6 ${outlineButton}`}>
            <Link to="/team">Meet the team</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">How it works</h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
        <Button asChild variant="outline" className={`mt-10 ${outlineButton}`}>
          <Link to={TEACHER_REQUEST_PATH}>Teachers: request supplies</Link>
        </Button>
      </div>
    </section>

    {/* Impact at a glance */}
    <section className="border-y border-border bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Our impact so far</h2>
          <Link to="/impact" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            See our full impact
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10">
          <ImpactStats />
        </div>
      </div>
    </section>

    <WhereWeWork />

    {/* Ways to give */}
    <section className="border-t border-border bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Ways to help</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {waysToGive.map((way) => (
            <li key={way.title} className="flex flex-col rounded-lg border border-border bg-white p-6">
              <h3 className="text-xl font-semibold text-foreground">{way.title}</h3>
              <p className="mt-2 flex-1 text-muted-foreground">{way.body}</p>
              <Link to={way.to} className="mt-4 inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                {way.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Accountability */}
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="rounded-lg border border-border p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground">Accountability</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The Future Scholars Association is a 501(c)(3) nonprofit organization
            {EIN ? ` (EIN ${EIN})` : ""}. Donations are tax-deductible to the extent allowed by law. Questions about
            how we use donations? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default About;
