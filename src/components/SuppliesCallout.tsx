import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CLASSROOMS_PATH } from "@/lib/links";
import { Crayon, Eraser, GlueStick, Marker, PaperFan, Pencil } from "./SupplyArt";

// Starburst outline for the "#1" badge (drawn, not an image).
const burstPoints = Array.from({ length: 24 }, (_, i) => {
  const angle = (i * Math.PI) / 12 - Math.PI / 2;
  const radius = i % 2 === 0 ? 150 : 118;
  return `${160 + radius * Math.cos(angle)},${160 + radius * Math.sin(angle)}`;
}).join(" ");

const SuppliesCallout = () => (
  <section className="relative overflow-hidden border-y border-border bg-white py-16 md:py-24">
    {/* Supplies scattered along the edges (large screens only) */}
    <div className="pointer-events-none hidden lg:block" aria-hidden="true">
      <Crayon className="absolute left-[6%] top-8 w-48 rotate-[18deg]" />
      <GlueStick className="absolute -left-4 top-[42%] w-14 -rotate-[58deg]" />
      <PaperFan className="absolute bottom-0 left-[2%] w-56" />
      <Pencil className="absolute -right-10 top-10 w-56 -rotate-[28deg]" />
      <Eraser className="absolute right-[3%] top-[45%] w-36 rotate-[22deg]" />
      <Marker className="absolute bottom-[-2rem] right-[12%] w-10 -rotate-[12deg]" />
    </div>

    <div className="container relative mx-auto flex flex-col items-center gap-10 px-4 sm:px-6 md:flex-row md:justify-center md:gap-16">
      {/* "#1" badge, tilted like the DonorsChoose one */}
      <svg viewBox="0 0 320 320" className="h-56 w-56 shrink-0 -rotate-12 md:h-72 md:w-72" aria-hidden="true">
        <polygon points={burstPoints} fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeWidth="3" />
        <circle cx="160" cy="160" r="92" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeWidth="3" />
        <text
          x="160"
          y="160"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-display"
          fontSize="84"
          fontWeight="700"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeOpacity="0.45"
          strokeWidth="3"
        >
          #1
        </text>
      </svg>

      <div className="max-w-md text-center md:text-left">
        <h2 className="text-3xl font-bold leading-tight text-primary md:text-4xl">
          Give the <span className="bg-gold/35 px-1">basic supplies</span> every classroom needs
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Pencils, notebooks, glue sticks and crayons. The everyday things Title I teachers often buy themselves.
        </p>
        <Button asChild size="lg" className="mt-6 bg-gold text-gold-foreground hover:bg-[hsl(43_90%_45%)]">
          <Link to={CLASSROOMS_PATH}>Find a classroom</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default SuppliesCallout;
