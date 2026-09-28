import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImpactStats from "@/components/ImpactStats";
import {
  EIN,
  EVENTS,
  PICKLEBALL_TOURNAMENT,
  isUpcoming,
  FUNDS_USED,
  PARTNER_SCHOOLS,
  QUOTES,
  SUPPLIES_DELIVERED,
} from "@/data/organization";
import { DONATE_PATH, START_CHAPTER_PATH } from "@/lib/links";
import summitGroup from "@/assets/summit2.jpg";
import summitPitch from "@/assets/summit4.jpg";
import summitRobotics from "@/assets/summit1.jpg";
import summitPresenter from "@/assets/summit3.jpg";

const gallery = [
  { src: summitPitch, alt: "A student pitching to seated community leaders at the Future Scholars Summit" },
  { src: summitRobotics, alt: "Students demonstrating a robotics project at the Future Scholars Summit" },
  { src: summitPresenter, alt: "A presenter sharing their pitch with attendees at the Future Scholars Summit" },
];

const Impact = () => (
  <div>
    {/* Header */}
    <section className="border-b border-border bg-secondary">
      <div className="container mx-auto px-4 pt-12 sm:px-6 md:pt-16">
        <h1 className="text-4xl font-bold leading-tight text-primary md:text-5xl">Our impact</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          What students, donors and partners have made possible since we started.
        </p>
        <img
          src={summitGroup}
          alt="Students, presenters and guests of honor at the Future Scholars Summit"
          className="mt-10 aspect-[21/9] w-full rounded-t-lg object-cover"
        />
      </div>
    </section>

    {/* Totals */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">By the numbers</h2>
        <div className="mt-10">
          <ImpactStats />
        </div>
      </div>
    </section>

    {/* What we delivered (shown once counts are added) */}
    {SUPPLIES_DELIVERED.length > 0 && (
      <section className="border-t border-border py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">What we delivered</h2>
          <ul className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {SUPPLIES_DELIVERED.map((entry) => (
              <li key={entry.item} className="rounded-lg border border-border p-6">
                <p className="font-display text-4xl font-bold text-primary">{entry.count.toLocaleString()}</p>
                <p className="mt-1 text-muted-foreground">{entry.item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )}

    {/* Future Scholars Summit */}
    <section className="border-y border-border bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-semibold text-primary">March 1, 2026</p>
            <h2 className="mt-1 text-3xl font-bold text-primary md:text-4xl">Future Scholars Summit</h2>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Student teams, nonprofits and researchers pitched their ideas to community and state leaders, including
              Mayor TJ Cawley, Rep. Maria Cervania and Councilwoman Sarika Bansal.
            </p>
          </div>
          <Link
            to="/events/summit"
            className="inline-flex shrink-0 items-center gap-1 font-semibold text-primary hover:underline"
          >
            Read the recap
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {gallery.map((photo) => (
            <li key={photo.alt}>
              <img src={photo.src} alt={photo.alt} className="aspect-[4/5] w-full rounded-lg object-cover" loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Events */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">Our events</h2>
        {isUpcoming(PICKLEBALL_TOURNAMENT) && (
          <Link
            to={PICKLEBALL_TOURNAMENT.path}
            className="mt-8 flex flex-col gap-2 rounded-lg border-2 border-gold bg-gold/10 p-6 transition-colors hover:bg-gold/20 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-primary">
                Coming up · {PICKLEBALL_TOURNAMENT.date}, {PICKLEBALL_TOURNAMENT.time}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-primary">
                {PICKLEBALL_TOURNAMENT.name} with {PICKLEBALL_TOURNAMENT.partner.name}
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 font-semibold text-primary">
              Event details
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        )}
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {EVENTS.map((event) => (
            <li key={event.name} className="relative flex flex-col rounded-lg border border-border p-6 transition-colors has-[a:hover]:border-primary">
              <p className="text-sm font-semibold text-primary">{event.date}</p>
              <h3 className="mt-1 text-xl font-semibold text-primary">{event.name}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{event.summary}</p>
              {event.recapPath && (
                <Link
                  to={event.recapPath}
                  className="mt-4 inline-flex items-center gap-1 self-start font-semibold text-primary hover:underline after:absolute after:inset-0"
                >
                  Read recap
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Where the money goes (shown once a breakdown is added) */}
    {FUNDS_USED.length > 0 && (
      <section className="border-t border-border py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">Where the money goes</h2>
          <ul className="mt-8 space-y-5">
            {FUNDS_USED.map((entry) => (
              <li key={entry.label}>
                <div className="flex justify-between font-semibold text-foreground">
                  <span>{entry.label}</span>
                  <span>{entry.percent}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${entry.percent}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )}

    {/* Quotes (shown once added) */}
    {QUOTES.length > 0 && (
      <section className="border-t border-border bg-secondary py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">In their words</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {QUOTES.map((entry) => (
              <li key={entry.name} className="rounded-lg border border-border bg-white p-6">
                <blockquote className="text-lg leading-relaxed text-foreground">“{entry.quote}”</blockquote>
                <p className="mt-4 font-semibold text-foreground">{entry.name}</p>
                <p className="text-sm text-muted-foreground">{entry.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )}

    {/* Schools */}
    <section className="border-t border-border bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">Schools we support</h2>
        <p className="mt-2 text-lg text-muted-foreground">Title I elementary schools in Wake County, North Carolina.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNER_SCHOOLS.map((school) => (
            <li key={school} className="rounded-lg border border-border bg-white p-5 text-lg font-semibold text-foreground">
              {school}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Trust + ways to help */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto flex flex-col items-start gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary md:text-4xl">Help us do more</h2>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
            FSA is a 501(c)(3) nonprofit{EIN ? ` (EIN ${EIN})` : ""}. Donations are tax-deductible to the extent
            allowed by law.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to={DONATE_PATH}>Donate</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link to={START_CHAPTER_PATH}>Start a chapter</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default Impact;
