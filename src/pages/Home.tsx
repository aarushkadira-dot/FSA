import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock,
  HandHeart,
  Heart,
  MapPin,
  Mic,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import event1 from "@/assets/event1.png";
import summit1 from "@/assets/summit1.jpg";
import summit2 from "@/assets/summit2.jpg";

interface Project {
  id: string;
  title: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  category: string;
  status: string;
  school_name: string | null;
  student_count: number | null;
  image_url: string | null;
  creator_id: string;
}

const FEATURED_EVENT: Project = {
  id: "event-innovators-2025",
  title: "Future Scholars Summit",
  description:
    "Past event recap: student teams, nonprofits, and researchers pitched their ideas to community and state leaders, including Mayor TJ Cawley, Rep. Maria Cervania, and Councilwoman Sarika Bansal.",
  goal_amount: 0,
  current_amount: 0,
  category: "events",
  status: "past",
  school_name: null,
  student_count: null,
  image_url: summit1,
  creator_id: "system",
};

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  format?: (value: number) => string;
};

const AnimatedNumber = ({ value, prefix = "", suffix = "", duration = 1200, format }: AnimatedNumberProps) => {
  const displayRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>();
  const hasAnimatedRef = useRef(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = displayRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            const start = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - start;
              const progress = Math.min(elapsed / duration, 1);
              const currentValue = Math.round(progress * value);
              setDisplayValue(currentValue);

              if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
              } else {
                setDisplayValue(value);
              }
            };

            frameRef.current = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [duration, value]);

  const formattedValue = format ? format(displayValue) : displayValue.toLocaleString();

  return (
    <span ref={displayRef}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

const Home = () => {
  const [projects] = useState<Project[]>([FEATURED_EVENT]);

  const nonEventProjects = projects.filter((project) => project.id !== FEATURED_EVENT.id);
  const featuredProjectCards = nonEventProjects.slice(0, 3);

  const stats = [
    {
      id: "projects",
      icon: BookOpen,
      value: Math.max(nonEventProjects.length, 1),
      label: "Active Projects",
      description: "Live classroom campaigns",
    },
    {
      id: "students",
      icon: Users,
      value: 294,
      label: "Students Reached",
      description: "Across local events and drives",
    },
    {
      id: "raised",
      icon: Heart,
      value: Math.max(nonEventProjects.reduce((sum, project) => sum + project.current_amount, 0), 450),
      prefix: "$",
      label: "Raised So Far",
      description: "Community-supported funding",
      format: (value: number) => value.toLocaleString(),
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-subtle pb-20 pt-32">
        <div className="absolute inset-0 fsa-grid opacity-20" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
            {/* LEFT — message + actions */}
            <div className="flex flex-col">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-4 w-4" />
                Future Scholars Association
              </p>

              <h1 className="mt-6 text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
                Built by students.
                <br />
                Backed by community.
                <br />
                <span className="text-primary">Focused on classrooms.</span>
              </h1>

              <p className="mt-5 max-w-xl text-lg text-muted-foreground md:text-xl">
                We connect real school needs with people ready to help — no fluff, no middle steps,
                just direct support for teachers and students.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/projects" className="sm:w-auto">
                  <Button size="lg" className="h-12 w-full rounded-full px-7 text-base sm:w-auto">
                    Explore Projects
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/submit-project" className="sm:w-auto">
                  <Button size="lg" variant="outline" className="h-12 w-full rounded-full px-7 text-base sm:w-auto">
                    Submit a Campaign
                  </Button>
                </Link>
              </div>

              <div className="mt-auto grid gap-3 pt-10 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <ShieldCheck className="mb-2 h-5 w-5 text-primary" />
                  <p className="font-semibold text-foreground">Reviewed campaigns</p>
                  <p className="text-sm text-muted-foreground">Every project is checked before it appears on the platform.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <HandHeart className="mb-2 h-5 w-5 text-primary" />
                  <p className="font-semibold text-foreground">Transparent updates</p>
                  <p className="text-sm text-muted-foreground">Supporters can follow campaign progress and outcomes.</p>
                </div>
              </div>
            </div>

            {/* RIGHT — featured visual + recap */}
            <div className="flex flex-col gap-4">
              <Card className="relative flex-1 overflow-hidden rounded-[1.75rem] border border-slate-200 shadow-card">
                <img
                  src={event1}
                  alt="Students at a Future Scholars classroom event"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/55" />
                <div className="relative flex h-full min-h-[300px] flex-col justify-end p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Local Impact</p>
                  <h2 className="mt-2 text-2xl font-bold leading-snug">From Cary volunteers to classroom results</h2>
                  <p className="mt-1 max-w-md text-sm text-white/80">
                    Our events and drives are run by local students, families, and mentors.
                  </p>
                </div>
              </Card>

              <Link to="/events/scholars-drive" className="block">
                <Card className="soft-lift rounded-2xl border-slate-200 bg-white">
                  <CardContent className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Past Event · Recap</p>
                      <p className="mt-1 text-lg font-bold text-foreground">Future Scholars Summit</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">March 1, 2026 · 10:00am – 12:00pm</p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.id} className="soft-lift rounded-2xl border-slate-200 bg-white/92">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-foreground">
                        <AnimatedNumber value={stat.value} prefix={stat.prefix} format={stat.format} />
                      </p>
                      <p className="mt-1 font-semibold text-foreground">{stat.label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">From our events</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">A look back at the summit</h2>
          </div>

          <Card className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card">
            <div className="grid items-stretch lg:grid-cols-2">
              {/* Image side */}
              <div className="relative min-h-[320px] lg:min-h-[480px]">
                <img
                  src={summit2}
                  alt="Future Scholars Summit attendees and guests of honor"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/55" />
                <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Past Event · Recap
                </span>
                <div className="absolute inset-x-6 bottom-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                    Guests of honor
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {["TJ", "MC", "SB"].map((initials) => (
                      <span
                        key={initials}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-sm font-bold text-white ring-2 ring-white/40"
                      >
                        {initials}
                      </span>
                    ))}
                    <span className="ml-1 text-sm font-medium text-white/85">+ several more leaders</span>
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="flex flex-col justify-between gap-8 p-8 md:p-12">
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-foreground md:text-4xl">Future Scholars Summit</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Student teams, nonprofits, and researchers pitched their boldest ideas live to a panel of
                    community and state leaders — including Mayor TJ Cawley, Rep. Maria Cervania, and
                    Councilwoman Sarika Bansal.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: CalendarDays, label: "Date", value: "March 1, 2026" },
                    { icon: Clock, label: "Time", value: "10:00 – 12:00" },
                    { icon: Mic, label: "Format", value: "Pitch summit" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <Icon className="mb-2 h-4 w-4 text-primary" />
                      <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                      <p className="font-semibold text-foreground">{value}</p>
                    </div>
                  ))}
                </div>

                <Link to="/events/scholars-drive" className="block">
                  <Button size="lg" className="w-full rounded-full px-6 sm:w-auto">
                    View full recap
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-6">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Live Campaigns</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">Classrooms You Can Support Right Now</h2>
            </div>
            <Link to="/projects">
              <Button variant="outline" className="rounded-full">
                See All Campaigns
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {featuredProjectCards.length === 0 ? (
            <Card className="rounded-2xl border-dashed border-primary/30 bg-white/90">
              <CardContent className="p-10 text-center">
                <p className="text-lg font-semibold">New campaigns are coming soon.</p>
                <p className="mt-2 text-muted-foreground">Submit a project to get your classroom on the board.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredProjectCards.map((project) => (
                <Card key={project.id} className="soft-lift group overflow-hidden rounded-2xl border-white/80 bg-white/95">
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-primary/10 text-primary">
                        <BookOpen className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <CardContent className="space-y-3 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{project.category}</p>
                    <h3 className="line-clamp-2 text-xl font-bold leading-tight text-foreground">{project.title}</h3>
                    {project.school_name && (
                      <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {project.school_name}
                      </p>
                    )}
                    <p className="line-clamp-3 text-sm text-muted-foreground">{project.description}</p>
                    <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      View Campaign
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="overflow-hidden rounded-3xl border-none bg-gradient-primary text-white shadow-elegant">
            <CardContent className="flex flex-col items-center gap-5 px-8 py-14 text-center md:px-16">
              <p className="section-eyebrow border-white/25 bg-white/10 text-white">Take action today</p>
              <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
                Fund one classroom need this week.
              </h2>
              <p className="max-w-2xl text-white/90">
                Pick a project, share it, and help move resources to students who need them now.
              </p>
              <Link to="/projects">
                <Button size="lg" className="h-12 rounded-full bg-white px-8 text-primary hover:bg-white/90">
                  Support a Project
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
