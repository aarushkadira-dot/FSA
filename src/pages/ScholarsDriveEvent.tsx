import { Calendar as CalendarIcon, Clock, Mic, ArrowLeft, ArrowUpRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import summit1 from "@/assets/summit1.jpg";
import summit2 from "@/assets/summit2.jpg";
import summit3 from "@/assets/summit3.jpg";
import summit4 from "@/assets/summit4.jpg";

const META = [
  { icon: CalendarIcon, label: "Date", value: "March 1, 2026" },
  { icon: Clock, label: "Time", value: "10:00am – 12:00pm" },
  { icon: Mic, label: "Format", value: "Live pitch summit" },
];

const GUESTS = [
  { initials: "TJ", name: "TJ Cawley", role: "Mayor" },
  { initials: "MC", name: "Maria Cervania", role: "NC House Representative" },
  { initials: "SB", name: "Sarika Bansal", role: "Councilwoman" },
];

const PRESENTERS = [
  {
    title: "Student teams",
    body: "Young innovators presented projects they built from the ground up.",
  },
  {
    title: "Nonprofits",
    body: "Mission-driven organizations shared the impact they're working toward.",
  },
  {
    title: "Researchers",
    body: "Independent researchers brought new ideas straight to decision-makers.",
  },
];

const ScholarsDriveEvent = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* ===== HERO ===== */}
      <header className="grain-overlay relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="fsa-grid absolute inset-0 opacity-[0.12]" />

        <div className="container relative z-10 mx-auto px-6 pb-44 pt-28 md:pt-32">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mt-10 max-w-3xl animate-slide-up">
            <span className="section-eyebrow border-white/20 bg-white/10 text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Past Event · Recap
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Future
              <br />
              Scholars{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">Summit</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
              Student teams, nonprofits, and researchers pitched their boldest ideas — live, in
              one room, to the community and state leaders who can champion them.
            </p>
          </div>

          {/* Meta strip */}
          <div
            className="mt-10 flex flex-wrap gap-3 animate-slide-up"
            style={{ animationDelay: "0.12s" }}
          >
            {META.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur"
              >
                <Icon className="h-5 w-5 text-gold" />
                <div className="leading-tight">
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-primary-foreground/55">
                    {label}
                  </p>
                  <p className="font-semibold">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ===== OVERLAPPING FEATURED PHOTO ===== */}
      <div className="container relative z-20 mx-auto -mt-32 px-6">
        <figure className="group relative overflow-hidden rounded-[2rem] shadow-elegant ring-1 ring-white/50 animate-scale-in">
          <img
            src={summit2}
            alt="Future Scholars Summit attendees and guests gathered together"
            className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[460px]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-foreground/60 p-6 md:p-8">
            <p className="max-w-xl text-sm font-medium text-white/90 md:text-base">
              Presenters, organizers, and guests of honor together at the close of the summit.
            </p>
          </figcaption>
        </figure>
      </div>

      {/* ===== ABOUT ===== */}
      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              About the event
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground md:text-4xl">
              A morning built for bold ideas.
            </h2>
            <div className="mt-6 h-1 w-16 rounded-full bg-gradient-gold" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-8">
            <p>
              The Future Scholars Association hosted the{" "}
              <strong className="text-foreground">Future Scholars Summit</strong> — a morning
              dedicated to ambitious ideas and the people working to make them real. Student teams,
              local nonprofits, and independent researchers took the stage to pitch their projects
              to a panel of community and state leaders.
            </p>
            <p>
              From new technology to community-impact initiatives, presenters shared their vision
              directly with decision-makers who can help champion their work — turning a single
              morning into new connections, candid feedback, and real momentum for the next
              generation of scholars.
            </p>
          </div>
        </div>
      </section>

      {/* ===== DISTINGUISHED GUESTS ===== */}
      <section className="relative overflow-hidden bg-gradient-subtle py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              In the room
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground md:text-5xl">
              Distinguished Guests
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We were honored to welcome local and state leaders who watched the summit and heard
              directly from our presenters.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {GUESTS.map((guest, i) => (
              <div
                key={guest.name}
                className="soft-lift group relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-8 text-center shadow-card backdrop-blur"
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-primary" />
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary text-2xl font-bold text-primary-foreground shadow-glow ring-4 ring-white">
                  {guest.initials}
                </div>
                <p className="mt-5 text-xl font-bold text-foreground">{guest.name}</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-accent">
                  {guest.role}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            …along with several other guests and supporters of the FSA mission.
          </p>
        </div>
      </section>

      {/* ===== GALLERY MOSAIC ===== */}
      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Gallery
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground md:text-5xl">
              Moments from the summit
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Pitches in progress, conversations with leaders, and a hands-on look at what our
            scholars are building.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          <figure className="col-span-2 row-span-2 overflow-hidden rounded-3xl shadow-card md:col-span-2">
            <img
              src={summit4}
              alt="Presenters pitching to seated community leaders"
              loading="lazy"
              className="h-full min-h-[260px] w-full object-cover transition-transform duration-700 hover:scale-105 md:min-h-[440px]"
            />
          </figure>
          <figure className="overflow-hidden rounded-3xl shadow-card">
            <img
              src={summit1}
              alt="Students demonstrating a robotics project"
              loading="lazy"
              className="h-full min-h-[160px] w-full object-cover transition-transform duration-700 hover:scale-105 md:min-h-[212px]"
            />
          </figure>
          <figure className="overflow-hidden rounded-3xl shadow-card">
            <img
              src={summit3}
              alt="A presenter sharing their pitch with attendees"
              loading="lazy"
              className="h-full min-h-[160px] w-full object-cover transition-transform duration-700 hover:scale-105 md:min-h-[212px]"
            />
          </figure>
          <figure className="col-span-2 overflow-hidden rounded-3xl shadow-card">
            <img
              src={summit2}
              alt="Summit attendees and guests gathered together"
              loading="lazy"
              className="h-full min-h-[160px] w-full object-cover transition-transform duration-700 hover:scale-105 md:min-h-[212px]"
            />
          </figure>
        </div>
      </section>

      {/* ===== WHO PRESENTED ===== */}
      <section className="bg-foreground py-20 text-background md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              On the stage
            </span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Who pitched</h2>
            <p className="mt-4 text-lg text-background/70">
              Three kinds of changemakers, one shared audience of leaders.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
            {PRESENTERS.map((p, i) => (
              <div key={p.title} className="bg-foreground p-8 transition-colors hover:bg-white/[0.04]">
                <span className="text-5xl font-bold text-white/15">{`0${i + 1}`}</span>
                <h3 className="mt-4 text-xl font-bold text-gold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-background/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING ===== */}
      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="grain-overlay relative overflow-hidden rounded-[2.5rem] bg-gradient-primary px-8 py-16 text-center text-primary-foreground shadow-elegant md:px-16 md:py-24">
          <div className="fsa-grid absolute inset-0 opacity-10" />
          <Quote className="relative mx-auto h-10 w-10 text-gold" />
          <h2 className="relative mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            Thank you for being part of the summit.
          </h2>
          <p className="relative mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
            A heartfelt thank you to our guests, presenters, and everyone who joined us in
            championing the next generation of scholars.
          </p>
          <Link to="/projects" className="relative mt-10 inline-block">
            <Button
              size="lg"
              className="rounded-full bg-white px-8 text-primary hover:bg-white/90"
            >
              Explore our projects
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ScholarsDriveEvent;
