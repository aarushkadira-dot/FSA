import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CLASSROOMS_PATH } from "@/lib/links";
import { Crayon, CrayonBox, Eraser, GlueStick, Marker, Notebook, PaperFan, Pencil } from "./SupplyArt";

// Starburst outline behind the rotating supplies (drawn, not an image).
const burstPoints = Array.from({ length: 24 }, (_, i) => {
  const angle = (i * Math.PI) / 12 - Math.PI / 2;
  const radius = i % 2 === 0 ? 150 : 118;
  return `${160 + radius * Math.cos(angle)},${160 + radius * Math.sin(angle)}`;
}).join(" ");

const SuppliesCallout = () => (
  <section className="relative overflow-hidden border-y border-border bg-white py-16 md:py-24">
    {/* Supplies scattered along the edges (large screens only) */}
    <div className="pointer-events-none hidden lg:block" aria-hidden="true">
      <Crayon className="supply-float absolute left-[6%] top-8 w-48 rotate-[18deg]" />
      <GlueStick className="supply-float absolute -left-4 top-[42%] w-14 -rotate-[58deg] [animation-delay:1.5s]" />
      <PaperFan className="supply-float absolute bottom-0 left-[2%] w-56 [animation-delay:3s]" />
      <Pencil className="supply-float absolute -right-10 top-10 w-56 -rotate-[28deg] [animation-delay:2s]" />
      <Eraser className="supply-float absolute right-[3%] top-[45%] w-36 rotate-[22deg] [animation-delay:0.8s]" />
      <Marker className="supply-float absolute bottom-[-2rem] right-[12%] w-10 -rotate-[12deg] [animation-delay:2.6s]" />
    </div>

    <div className="container relative mx-auto flex flex-col items-center gap-10 px-4 sm:px-6 md:flex-row md:justify-center md:gap-16">
      <div className="relative h-56 w-56 shrink-0 md:h-72 md:w-72" aria-hidden="true">
        <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full">
          <polygon points={burstPoints} fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.25" strokeWidth="3" />
          <circle cx="160" cy="160" r="92" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.25" strokeWidth="3" />
        </svg>
        {/* One supply at a time slides in, pauses, and slides out */}
        <div className="supply-swap absolute inset-[22%]">
          <Notebook className="h-full w-full" />
          <CrayonBox className="h-full w-full" />
          <GlueStick className="h-full w-full" />
        </div>
      </div>

      <div className="max-w-md text-center md:text-left">
        <h2 className="text-3xl font-bold leading-tight text-primary md:text-4xl">
          Give the <span className="bg-gold/35 px-1">basic supplies</span> every classroom needs
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Pencils, notebooks, glue sticks and crayons. The everyday things Title I teachers often buy themselves.
        </p>
        <Button asChild size="lg" className="mt-6 bg-gold text-gold-foreground hover:brightness-95">
          <Link to={CLASSROOMS_PATH}>Find a classroom</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default SuppliesCallout;
