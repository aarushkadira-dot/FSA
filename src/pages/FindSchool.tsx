import { Link } from "react-router-dom";
import ClassroomRequests from "@/components/ClassroomRequests";
import SchoolMap from "@/components/SchoolMap";
import { Button } from "@/components/ui/button";
import { CrayonBox, DeliveryBox, Notebook } from "@/components/SupplyArt";
import { TITLE_I_SCHOOL_COUNT } from "@/data/titleOneSummary";
import { CONTACT_EMAIL } from "@/lib/forms";
import { DONATE_PATH, TEACHER_REQUEST_PATH } from "@/lib/links";
import classroomPhoto from "@/assets/event1.jpg";

const schoolCount = TITLE_I_SCHOOL_COUNT.toLocaleString();

const sections = [
  { id: "map", label: "Map" },
  { id: "classrooms", label: "Classroom requests" },
  { id: "how-it-works", label: "How it works" },
  { id: "faq", label: "FAQ" },
];

const steps = [
  { Art: Notebook, title: "Teachers ask", body: "A teacher at a Title I school tells us what their classroom is missing." },
  { Art: CrayonBox, title: "You give", body: "Donations cover the cost of the supplies on the request." },
  { Art: DeliveryBox, title: "We deliver", body: "Our student volunteers buy the items and bring them to the school." },
];

const faqs = [
  {
    question: "What is a Title I school?",
    answer:
      "Title I is a federal program that gives extra funding to schools where many students come from low-income families. Even with it, teachers often pay for basic supplies themselves.",
  },
  {
    question: "Where does the map data come from?",
    answer:
      "Title I status comes from NC DPI school report card data for the 2024–25 school year, plus partner schools that became Title I in 2025–26. School locations come from the U.S. Department of Education (NCES).",
  },
  {
    question: "How do teachers ask for supplies?",
    answer:
      "Any teacher at a North Carolina Title I school can create a teacher account. An FSA admin confirms they teach at that school, and then they can send us what their classroom needs.",
  },
  {
    question: "Where does my donation go?",
    answer:
      "Toward supplies for Title I classrooms. Our student volunteers buy the items teachers ask for and deliver them to the school.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer: "Yes. FSA is a 501(c)(3) nonprofit, so donations are tax-deductible to the extent allowed by law.",
  },
  {
    question: "Can my school become a partner school?",
    answer: `We'd love to hear from you. Email us at ${CONTACT_EMAIL} and tell us about your school.`,
  },
];

const FindSchool = () => (
  <div>
    {/* Split header: photo on one side, message on the other */}
    <section className="grid bg-primary text-primary-foreground lg:grid-cols-2">
      <img
        src={classroomPhoto}
        alt="Students at Bugg Elementary celebrating in their classroom"
        className="h-64 w-full object-cover sm:h-80 lg:h-full lg:min-h-[26rem]"
      />
      <div className="flex items-center px-4 py-12 sm:px-6 md:py-16 lg:px-14">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">Find a Title I school near you</h1>
          <p className="mt-5 text-lg leading-relaxed text-white/85 md:text-xl">
            Explore {schoolCount} Title I schools across North Carolina, then see which classrooms need supplies.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:brightness-95">
              <a href="#map">Search the map</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white">
              <a href="#classrooms">See classroom requests</a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Jump links, like the DonorsChoose teacher page */}
    <nav aria-label="On this page" className="sticky top-16 z-40 border-b border-border bg-white">
      <ul className="container mx-auto flex gap-x-1 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6">
        {sections.map((section, index) => (
          <li key={section.id} className="flex shrink-0 items-center">
            {index > 0 && <span className="px-2 text-border" aria-hidden="true">·</span>}
            <a
              href={`#${section.id}`}
              className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-primary hover:underline"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>

    <div id="map" className="scroll-mt-32 pt-12 md:pt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">Title I schools in North Carolina</h2>
        <p className="mt-2 text-lg text-muted-foreground">Search by name, city or county, or find schools near you.</p>
      </div>
      <SchoolMap />
    </div>

    <ClassroomRequests />

    {/* How it works */}
    <section id="how-it-works" className="scroll-mt-32 border-t border-border py-16 text-center md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">How it works</h2>
        <p className="mt-2 text-lg text-muted-foreground">You pick the classroom. We handle the shopping.</p>
        <ol className="mx-auto mt-12 grid max-w-5xl gap-6 text-left md:grid-cols-3">
          {steps.map(({ Art, title, body }, index) => (
            <li key={title} className="flex flex-col rounded-lg border border-border bg-white p-6 md:p-8">
              <div className="flex h-24 items-center justify-center rounded-md bg-secondary">
                <Art className="h-16 w-16" />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold text-primary">{title}</h3>
              </div>
              <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
        <Button asChild size="lg" className="mt-12 bg-gold text-gold-foreground hover:brightness-95">
          <Link to={DONATE_PATH}>Donate</Link>
        </Button>
      </div>
    </section>

    {/* FAQ */}
    <section id="faq" className="scroll-mt-32 border-t border-border bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-primary md:text-4xl">Questions</h2>
        <dl className="mx-auto mt-10 grid max-w-5xl gap-x-12 gap-y-8 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-display text-xl font-bold text-primary">{faq.question}</dt>
              <dd className="mt-2 leading-relaxed text-foreground/85">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    {/* Closing */}
    <section className="py-16 text-center md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">Teach at a Title I school?</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
          Create a free teacher account and tell us what your students need.
        </p>
        <Button asChild size="lg" className="mt-6 bg-gold text-gold-foreground hover:brightness-95">
          <Link to={TEACHER_REQUEST_PATH}>Get started</Link>
        </Button>
      </div>
    </section>
  </div>
);

export default FindSchool;
