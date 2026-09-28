import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PICKLEBALL_TOURNAMENT as event, isUpcoming } from "@/data/organization";
import { CONTACT_EMAIL } from "@/lib/forms";
import { DONATE_PATH } from "@/lib/links";
import flyer from "@/assets/pickleball-flyer.webp";

const utc = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");

const calendarUrl =
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.name} (FSA x ${event.partner.short})`,
    dates: `${utc(event.startsAt)}/${utc(event.endsAt)}`,
    location: event.location,
    details: `${event.partner.name} x Future Scholars Association. ${event.causes.join(". ")}.`,
  }).toString();

const PickleballEvent = () => {
  const upcoming = isUpcoming(event);

  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="container mx-auto grid items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="font-semibold text-primary">
              {upcoming ? "Upcoming fundraiser" : "Past fundraiser"} · with {event.partner.name}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-primary md:text-5xl">{event.name}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              We're teaming up with {event.partner.name} for an afternoon of pickleball. Money raised supports Title I
              schools, and the day helps spread awareness for breast cancer.
            </p>

            <dl className="mt-8 grid max-w-xl gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted-foreground">When</dt>
                <dd className="mt-0.5 font-semibold text-foreground">
                  {event.date}
                  <br />
                  {event.time}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Where</dt>
                <dd className="mt-0.5 font-semibold text-foreground">
                  <a href={event.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {event.location}
                    <span className="sr-only"> (opens map in a new tab)</span>
                  </a>
                </dd>
              </div>
              {event.fees.map((fee) => (
                <div key={fee.label}>
                  <dt className="text-sm text-muted-foreground">{fee.label}</dt>
                  <dd className="mt-0.5 font-display text-2xl font-bold text-primary">{fee.amount}</dd>
                </div>
              ))}
            </dl>

            {upcoming && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                  <a href={calendarUrl} target="_blank" rel="noopener noreferrer">
                    <CalendarPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                    Add to calendar
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Pickleball Tournament")}`}>Ask a question</a>
                </Button>
              </div>
            )}
          </div>

          <img
            src={flyer}
            alt={`Flyer: ${event.partner.name} x Future Scholars Association ${event.name}, ${event.date}, ${event.time}, ${event.location}. Participation fee $8, spectator fee $5.`}
            className="w-full max-w-md justify-self-center rounded-lg border border-border lg:col-span-5"
          />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-primary md:text-4xl">What it supports</h2>
            <ul className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/85">
              <li className="border-l-4 border-gold pl-4">
                <span className="font-semibold text-foreground">Title I schools.</span> Money raised helps get supplies into
                Title I classrooms.
              </li>
              <li className="border-l-4 border-gold pl-4">
                <span className="font-semibold text-foreground">Breast cancer awareness.</span> October is Breast Cancer
                Awareness Month, and the tournament helps spread the word.
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-secondary p-6 md:p-8">
            <h2 className="text-2xl font-bold text-primary">Can't make it?</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              You can still help a Title I classroom get the supplies it needs.
            </p>
            <Button asChild size="lg" className="mt-5 bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to={DONATE_PATH}>Donate</Link>
            </Button>
            <Link to="/impact" className="mt-5 flex items-center gap-1 font-semibold text-primary hover:underline">
              See our other events
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PickleballEvent;
