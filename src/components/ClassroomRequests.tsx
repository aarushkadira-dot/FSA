import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CLASSROOM_REQUESTS, type ClassroomRequest } from "@/data/classroomRequests";
import { PARTNER_SCHOOLS } from "@/data/organization";
import { TEACHER_REQUEST_PATH, donationHref } from "@/lib/links";

// Filters only appear once there are enough requests for them to be useful.
const FILTER_THRESHOLD = 4;

const isFunded = (request: ClassroomRequest) => request.raised >= request.goal;
const isExternal = (href: string) => href.startsWith("http");

const selectClass =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm";

const DonateButton = ({ href, label = "Donate", className }: { href: string; label?: string; className?: string }) => (
  <Button asChild className={`bg-gold font-semibold text-gold-foreground hover:brightness-95 ${className ?? ""}`}>
    <a href={href} {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {label}
    </a>
  </Button>
);

const itemsPreview = (items: string[]) =>
  items.length <= 2 ? items.join(", ") : `${items.slice(0, 2).join(", ")} + ${items.length - 2} more`;

const RequestCard = ({ request }: { request: ClassroomRequest }) => {
  const funded = isFunded(request);
  const percent = Math.min(100, Math.round((request.raised / request.goal) * 100));
  const stillNeeded = Math.max(0, request.goal - request.raised);

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-white">
      {request.photo ? (
        <img src={request.photo} alt={`${request.teacher}'s classroom`} className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-secondary text-muted-foreground">
          <BookOpen className="h-10 w-10" aria-hidden="true" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-medium text-muted-foreground">
          {request.teacher} · {request.grade}
        </p>
        <p className="text-sm text-muted-foreground">{request.school}</p>
        <h3 className="mt-3 text-xl font-bold leading-snug text-primary">{request.title}</h3>
        <p className="mt-2 leading-relaxed text-foreground/80">“{request.quote}”</p>
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Needs:</span> {itemsPreview(request.items)}
        </p>

        <div className="mt-auto pt-5">
          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${percent}% funded`}
          >
            <div className="h-full rounded-full bg-gold" style={{ width: `${percent}%` }} />
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-3 text-sm">
            {funded ? (
              <span className="font-semibold text-success">Funded ✓</span>
            ) : (
              <span>
                <span className="text-base font-bold text-foreground">${stillNeeded.toLocaleString()}</span>{" "}
                <span className="text-muted-foreground">still needed</span>
              </span>
            )}
            <span className="text-muted-foreground">{request.students} students</span>
          </div>
          {!funded && (
            <DonateButton href={request.donateUrl || donationHref(request.title)} className="mt-4 w-full" />
          )}
        </div>
      </div>
    </article>
  );
};

const ClassroomRequests = () => {
  const [search, setSearch] = useState("");
  const [school, setSchool] = useState("all");
  const [grade, setGrade] = useState("all");

  const openRequests = CLASSROOM_REQUESTS.filter((request) => !isFunded(request));
  const fundedRequests = CLASSROOM_REQUESTS.filter(isFunded);
  const showFilters = openRequests.length >= FILTER_THRESHOLD;

  const grades = useMemo(() => [...new Set(openRequests.map((request) => request.grade))], [openRequests]);

  const visibleRequests = openRequests.filter((request) => {
    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term ||
      [request.title, request.teacher, request.school, request.quote, ...request.items].some((text) =>
        text.toLowerCase().includes(term),
      );
    return matchesSearch && (school === "all" || request.school === school) && (grade === "all" || request.grade === grade);
  });

  return (
    <>
      {/* Open requests */}
      <section id="classrooms" className="scroll-mt-32 border-t border-border bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-primary md:text-4xl">Find a classroom</h2>
              {openRequests.length > 0 && (
                <p className="mt-2 text-lg text-muted-foreground">
                  {openRequests.length === 1 ? "1 open request" : `${openRequests.length} open requests`}
                </p>
              )}
            </div>
            {openRequests.length > 0 && <DonateButton href={donationHref()} className="h-11 px-8 text-base" />}
          </div>
          {showFilters && (
            <div className="mb-8 grid gap-3 md:grid-cols-12">
              <div className="relative md:col-span-6">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  aria-label="Search requests"
                  placeholder="Search by teacher, school, or item"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 pl-9"
                />
              </div>
              <select aria-label="School" value={school} onChange={(e) => setSchool(e.target.value)} className={`${selectClass} md:col-span-3`}>
                <option value="all">All schools</option>
                {PARTNER_SCHOOLS.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
              <select aria-label="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} className={`${selectClass} md:col-span-3`}>
                <option value="all">All grades</option>
                {grades.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </div>
          )}

          {openRequests.length === 0 ? (
            <div className="rounded-lg border border-border bg-white p-8 md:p-10">
              <h3 className="text-2xl font-semibold text-primary">There are no open requests right now.</h3>
              <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Our partner teachers are putting together their next requests. You can donate now to help fund what
                they need, or, if you teach at one of our partner schools, send us your request.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <DonateButton href={donationHref()} />
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  <Link to={TEACHER_REQUEST_PATH}>Teachers: submit a request</Link>
                </Button>
              </div>
            </div>
          ) : visibleRequests.length === 0 ? (
            <div className="rounded-lg border border-border bg-white p-8">
              <p className="text-lg font-semibold text-foreground">No requests match those filters.</p>
              <button
                type="button"
                className="mt-2 font-semibold text-primary hover:underline"
                onClick={() => {
                  setSearch("");
                  setSchool("all");
                  setGrade("all");
                }}
              >
                Show all requests
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recently funded */}
      {fundedRequests.length > 0 && (
        <section className="border-t border-border py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">Recently funded</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fundedRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ClassroomRequests;
