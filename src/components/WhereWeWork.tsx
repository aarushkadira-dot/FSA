import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { START_CHAPTER_PATH } from "@/lib/links";
import { CHAPTERS, PARTNER_SCHOOLS } from "@/data/organization";

const WhereWeWork = ({ className }: { className?: string }) => (
  <section className={cn("py-16 md:py-20", className)}>
    <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 className="text-3xl font-bold text-primary md:text-4xl">Our partner schools</h2>
        <p className="mt-2 text-lg text-muted-foreground">Title I elementary schools in Wake County, North Carolina.</p>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {PARTNER_SCHOOLS.map((school) => (
            <li key={school} className="flex items-center justify-between gap-4 py-4">
              <span className="text-lg font-semibold text-foreground">{school}</span>
              <span className="shrink-0 rounded-md bg-secondary px-2.5 py-1 text-sm font-medium text-primary">Title I</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-primary md:text-4xl">Our chapters</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          FSA started in Wake County. Students have since launched chapters in {CHAPTERS.length} more places.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-4">
          {CHAPTERS.map((chapter) => (
            <li key={chapter.name} className="border-l-4 border-gold bg-secondary px-4 py-4">
              <p className="text-lg font-semibold text-foreground">{chapter.name}</p>
              <p className="text-sm text-muted-foreground">{chapter.region}</p>
            </li>
          ))}
        </ul>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="mt-6 border-primary text-primary hover:bg-primary/5"
        >
          <Link to={START_CHAPTER_PATH}>Start a chapter</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default WhereWeWork;
