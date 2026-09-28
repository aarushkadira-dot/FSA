import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PARTNER_ORGANIZATIONS, PARTNER_SCHOOLS } from "@/data/organization";
import { CONTACT_EMAIL } from "@/lib/forms";

const Partners = () => (
  <div>
    <section className="border-b border-border bg-secondary">
      <div className="container mx-auto px-4 py-12 sm:px-6 md:py-16">
        <h1 className="text-4xl font-bold leading-tight text-primary md:text-5xl">Our partners</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          We work with student organizations and schools to get supplies into Title I classrooms.
        </p>
      </div>
    </section>

    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">Student organizations</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {PARTNER_ORGANIZATIONS.map((partner) => (
            <li key={partner.name} className="flex flex-col rounded-lg border border-border p-6 md:p-8">
              <h3 className="text-2xl font-bold text-primary">{partner.name}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{partner.about}</p>
              {partner.together && (
                <p className="mt-3 leading-relaxed text-foreground">
                  <span className="font-semibold">With FSA: </span>
                  {partner.together}
                </p>
              )}
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 self-start font-semibold text-primary hover:underline"
              >
                Visit website
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="border-y border-border bg-secondary py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">Partner schools</h2>
        <p className="mt-2 text-lg text-muted-foreground">Title I elementary schools in Wake County, North Carolina.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNER_SCHOOLS.map((school) => (
            <li key={school} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-white p-5">
              <span className="text-lg font-semibold text-foreground">{school}</span>
              <span className="shrink-0 rounded-md bg-secondary px-2.5 py-1 text-sm font-medium text-primary">Title I</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="py-12 md:py-16">
      <div className="container mx-auto flex flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary md:text-4xl">Become a partner</h2>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
            Schools, clubs and organizations can run drives with us, host events, or connect us with classrooms in need.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-[hsl(43_90%_45%)]">
            <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Partnering with FSA")}`}>Contact us</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/5"
          >
            <Link to="/about">About FSA</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default Partners;
