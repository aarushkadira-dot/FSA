import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLASSROOMS_PATH, DONATE_PATH, TEACHER_REQUEST_PATH } from "@/lib/links";
import { TITLE_I_SCHOOL_COUNT } from "@/data/titleOneSummary";
import { CHAPTERS, PARTNER_SCHOOLS } from "@/data/organization";
import WhereWeWork from "@/components/WhereWeWork";
import classroomPhoto from "@/assets/event1.jpg";
import suppliesPhoto from "@/assets/event2.jpg";
import summitPhoto from "@/assets/summit4.jpg";

const MISSION_STATEMENT =
  "The Future Scholars Association is a student-run nonprofit working to make sure every student in a Title I school has the supplies they need to learn. We partner directly with teachers to find out what their classrooms are missing, raise the money to cover it, and get those supplies into students' hands.";

const trustPoints = [
  { title: "501(c)(3) nonprofit", detail: "Donations are tax-deductible." },
  { title: "Run by students", detail: "A student board leads every drive." },
  { title: "Teacher-requested", detail: "We fund what classrooms ask for." },
  { title: `${PARTNER_SCHOOLS.length} partner schools`, detail: "Title I elementary schools in Wake County" },
];

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

const impact = [
  { value: "294", label: "students reached" },
  { value: "$1,450", label: "raised for classrooms" },
  { value: String(PARTNER_SCHOOLS.length), label: "Title I partner schools" },
  { value: String(CHAPTERS.length), label: "chapters" },
];

const Home = () => {
  const schoolCount = TITLE_I_SCHOOL_COUNT.toLocaleString();

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-secondary">
        <div className="container mx-auto grid items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-14">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">
              School supplies for Title I classrooms in Wake County
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Teachers tell us what their students are missing. Donors fund it. Our student volunteers get it into
              the classroom.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-gold text-base font-semibold text-gold-foreground hover:bg-gold/90">
                <Link to={DONATE_PATH}>Donate</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to={TEACHER_REQUEST_PATH}>Teachers</Link>
              </Button>
            </div>
          </div>
          <img
            src={classroomPhoto}
            alt="Students at Bugg Magnet Elementary celebrating in their classroom"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
        </div>

        <div className="border-t border-border bg-white">
          <ul className="container mx-auto grid grid-cols-2 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <li key={point.title} className="border-l-4 border-gold pl-4">
                <p className="font-semibold text-foreground">{point.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{point.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-lg font-semibold text-primary">Our mission</h2>
          <p className="mt-4 text-2xl font-medium leading-snug text-foreground md:text-3xl md:leading-snug">
            {MISSION_STATEMENT}
          </p>
          <Link to="/about" className="mt-6 inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            Read our story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-secondary py-16 md:py-20">
        <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">How it works</h2>
            <ol className="mt-8 space-y-8">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <img
            src={suppliesPhoto}
            alt="Students building with a LEGO Education kit in class"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
        </div>
      </section>

      {/* Classroom requests */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Classroom requests</h2>
              <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
                Requests from Title I teachers we work with.
              </p>
            </div>
            <Link to={CLASSROOMS_PATH} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
              See all requests
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-secondary p-8 md:p-10">
            <h3 className="text-xl font-semibold text-foreground">There are no open requests right now.</h3>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
              We are lining up the next round of requests with our partner teachers. You can donate now to help
              fund upcoming needs, or, if you teach at a Title I school, send us what your classroom needs.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-gold font-semibold text-gold-foreground hover:bg-gold/90">
                <Link to={DONATE_PATH}>Donate</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to={TEACHER_REQUEST_PATH}>Submit a classroom request</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Title I */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:items-center">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold md:text-4xl">Why Title I schools</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              Title I is the federal program for schools where many students come from low-income families. These
              schools receive extra federal funding, but many teachers still buy basic classroom supplies with their
              own money. We focus our support where it makes the biggest difference.
            </p>
            <Link
              to="/find-school"
              className="mt-6 inline-flex items-center gap-1 font-semibold text-gold hover:underline"
            >
              Find a Title I school near you
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-lg border border-white/20 p-8 lg:col-span-2">
            <p className="text-5xl font-bold text-gold">{schoolCount}</p>
            <p className="mt-2 text-lg text-white/85">Title I schools across North Carolina on our school map</p>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Our impact so far</h2>
          <dl className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {impact.map((item) => (
              <div key={item.label} className="flex flex-col-reverse border-t-4 border-primary pt-4">
                <dt className="mt-1 text-muted-foreground">{item.label}</dt>
                <dd className="text-4xl font-bold text-foreground md:text-5xl">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <WhereWeWork className="border-t border-border" />

      {/* Recent event */}
      <section className="border-t border-border bg-secondary py-16 md:py-20">
        <div className="container mx-auto grid items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <img
            src={summitPhoto}
            alt="A student pitching an idea to a panel of community leaders at the Future Scholars Summit"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
          <div>
            <p className="font-semibold text-primary">Recent event · March 1, 2026</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">Future Scholars Summit</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Student teams, nonprofits, and researchers pitched their ideas to community and state leaders,
              including Mayor TJ Cawley, Rep. Maria Cervania, and Councilwoman Sarika Bansal.
            </p>
            <Link
              to="/events/scholars-drive"
              className="mt-6 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              Read the summit recap
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto flex flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Help stock a Title I classroom</h2>
            <p className="mt-2 text-lg text-muted-foreground">Give supplies, or give your time as a volunteer.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-gold text-base font-semibold text-gold-foreground hover:bg-gold/90">
              <Link to={DONATE_PATH}>Donate</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/team">Join our mission</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
