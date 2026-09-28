import { CHAPTERS, EVENTS, IMPACT, PARTNER_SCHOOLS } from "@/data/organization";

const stats = [
  { value: IMPACT.studentsReached.toLocaleString(), label: "students reached" },
  { value: `$${IMPACT.dollarsRaised.toLocaleString()}`, label: "raised for classrooms" },
  { value: String(PARTNER_SCHOOLS.length), label: "Title I partner schools" },
  { value: String(CHAPTERS.length), label: "chapters" },
  { value: String(EVENTS.length), label: "community events" },
];

const ImpactStats = ({ limit }: { limit?: number }) => (
  <dl className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
    {stats.slice(0, limit).map((item) => (
      <div key={item.label} className="flex flex-col-reverse border-t-4 border-primary pt-4">
        <dt className="mt-1 text-muted-foreground">{item.label}</dt>
        <dd className="font-display text-4xl font-bold text-primary md:text-5xl">{item.value}</dd>
      </div>
    ))}
  </dl>
);

export default ImpactStats;
