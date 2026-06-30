import { useMemo, useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Book,
  BookOpen,
  CalendarClock,
  Flame,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Laptop,
  MapPin,
  Microscope,
  Package,
  Palette,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

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
  gofundme_link?: string | null;
  created_at?: string;
}

const FEATURED_EVENT: Project = {
  id: "event-innovators-2025",
  title: "Future Innovators Expo",
  description:
    "Past event recap: a hands-on STEM event with interactive challenge stations including paper airplane contests, slime chemistry, bridge building, and live robotics demos.",
  goal_amount: 0,
  current_amount: 0,
  category: "events",
  status: "past",
  school_name: "Cedar Fork Community Center",
  student_count: null,
  image_url: "/future innovators expo.png?v=3",
  creator_id: "system",
};

type SortMode = "recent" | "urgent" | "popular" | "progress" | "title";

type CategoryMeta = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  tone: string;
};

const CATEGORY_MAP: Record<string, CategoryMeta> = {
  events: { label: "Events", icon: Sparkles, tone: "border-gold/45" },
  education: { label: "Education", icon: GraduationCap, tone: "border-sky-400/45" },
  healthcare: { label: "Health", icon: HeartPulse, tone: "border-rose-400/45" },
  technology: { label: "Technology", icon: Laptop, tone: "border-cyan-400/45" },
  community: { label: "Community", icon: Users, tone: "border-indigo-400/45" },
  books: { label: "Books", icon: Book, tone: "border-blue-400/45" },
  arts: { label: "Arts", icon: Palette, tone: "border-fuchsia-400/45" },
  science: { label: "Science", icon: Microscope, tone: "border-emerald-400/45" },
  other: { label: "Other", icon: Package, tone: "border-slate-400/45" },
};

const CATEGORY_OPTIONS = [
  "all",
  "events",
  "education",
  "healthcare",
  "technology",
  "community",
  "books",
  "arts",
  "science",
  "other",
] as const;

const getProgressPercentage = (current: number, goal: number) => {
  if (!goal || goal <= 0) return 0;
  return Math.min((current / goal) * 100, 100);
};

const Projects = () => {
  const [projects] = useState<Project[]>([FEATURED_EVENT]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortMode>("recent");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (project.id === FEATURED_EVENT.id) return true;

      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.school_name && project.school_name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = filterCategory === "all" || project.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [filterCategory, projects, searchTerm]);

  const sortedProjects = useMemo(() => {
    const list = [...filteredProjects].sort((a, b) => {
      if (a.id === FEATURED_EVENT.id) return -1;
      if (b.id === FEATURED_EVENT.id) return 1;

      const aProgress = getProgressPercentage(a.current_amount, a.goal_amount);
      const bProgress = getProgressPercentage(b.current_amount, b.goal_amount);

      switch (sortBy) {
        case "urgent":
          return aProgress - bProgress;
        case "popular":
          return b.current_amount - a.current_amount;
        case "progress":
          return bProgress - aProgress;
        case "title":
          return a.title.localeCompare(b.title);
        case "recent":
        default: {
          const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
          const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
          if (aDate && bDate) return bDate - aDate;
          return b.id.localeCompare(a.id);
        }
      }
    });

    return list;
  }, [filteredProjects, sortBy]);

  const nonEventProjects = projects.filter((project) => project.id !== FEATURED_EVENT.id);
  const totalRaised = nonEventProjects.reduce((sum, project) => sum + project.current_amount, 0);
  const schoolsRepresented = new Set(nonEventProjects.map((project) => project.school_name).filter(Boolean)).size;

  return (
    <div className="min-h-screen bg-gradient-subtle pb-14 pt-28">
      <section className="container mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="space-y-5 lg:col-span-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-4 w-4" />
              Campaign board
            </p>
            <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
              Find a project.
              <br />
              Back it directly.
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground md:text-xl">
              This board highlights active classroom needs and featured past events. Filter fast, fund what matters, and track impact.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
            <Card className="rounded-2xl border-slate-200 bg-white/95">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">{Math.max(nonEventProjects.length, 1)}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Active campaigns</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-slate-200 bg-white/95">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">${Math.max(totalRaised, 450).toLocaleString()}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Raised</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-slate-200 bg-white/95">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">{Math.max(schoolsRepresented, 1)}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Partner schools</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-10 px-6">
        <Card className="rounded-3xl border-slate-200 bg-white/96 shadow-card">
          <CardContent className="grid gap-4 p-6 md:grid-cols-12 md:items-center">
            <div className="relative md:col-span-6">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, school, or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 rounded-xl border-slate-200 pl-9"
              />
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="h-11 rounded-xl md:col-span-3">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((value) => {
                  if (value === "all") {
                    return (
                      <SelectItem key={value} value={value}>
                        All categories
                      </SelectItem>
                    );
                  }

                  const meta = CATEGORY_MAP[value] ?? { label: value, icon: Package, tone: "border-slate-300" };
                  const Icon = meta.icon;

                  return (
                    <SelectItem key={value} value={value}>
                      <span className="inline-flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {meta.label}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortMode)}>
              <SelectTrigger className="h-11 rounded-xl md:col-span-3">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">
                  <span className="inline-flex items-center gap-2">
                    <CalendarClock className="h-4 w-4" />
                    Most recent
                  </span>
                </SelectItem>
                <SelectItem value="urgent">
                  <span className="inline-flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Most urgent
                  </span>
                </SelectItem>
                <SelectItem value="popular">
                  <span className="inline-flex items-center gap-2">
                    <Flame className="h-4 w-4" />
                    Most funded
                  </span>
                </SelectItem>
                <SelectItem value="progress">
                  <span className="inline-flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Highest progress
                  </span>
                </SelectItem>
                <SelectItem value="title">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="cursor-pointer rounded-full px-3 py-1.5 hover:bg-primary/10"
            onClick={() => setSortBy("urgent")}
          >
            <AlertCircle className="mr-1 h-3.5 w-3.5" />
            Urgent needs
          </Badge>
          <Badge
            variant="outline"
            className="cursor-pointer rounded-full px-3 py-1.5 hover:bg-primary/10"
            onClick={() => setFilterCategory("events")}
          >
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Events
          </Badge>
          <Badge
            variant="outline"
            className="cursor-pointer rounded-full px-3 py-1.5 hover:bg-primary/10"
            onClick={() => {
              setFilterCategory("all");
              setSortBy("popular");
            }}
          >
            <HandHeart className="mr-1 h-3.5 w-3.5" />
            Most supported
          </Badge>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">{sortedProjects.length} projects found</p>
            <p className="text-sm text-muted-foreground">Updated from submitted campaigns and featured past events.</p>
          </div>
        </div>

        {sortedProjects.length === 0 ? (
          <Card className="mt-8 rounded-3xl border-dashed border-primary/30 bg-white/90">
            <CardContent className="py-20 text-center">
              <BookOpen className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h3 className="text-2xl font-bold">No matching campaigns</h3>
              <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
                Try broader filters or clear your search to view all active projects.
              </p>
              <Button
                className="mt-6 rounded-full"
                onClick={() => {
                  setSearchTerm("");
                  setFilterCategory("all");
                  setSortBy("recent");
                }}
              >
                Reset filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sortedProjects.map((project) => {
              const isFeaturedEvent = project.id === FEATURED_EVENT.id;
              const progress = getProgressPercentage(project.current_amount, project.goal_amount);
              const meta = CATEGORY_MAP[project.category] ?? { label: project.category, icon: Package, tone: "border-slate-300" };
              const Icon = meta.icon;

              return (
                <Card
                  key={project.id}
                  className={`soft-lift group overflow-hidden rounded-3xl bg-white/95 ${meta.tone} ${
                    isFeaturedEvent ? "ring-1 ring-gold/35" : ""
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/15 text-primary">
                        <BookOpen className="h-8 w-8" />
                      </div>
                    )}
                    {isFeaturedEvent && (
                      <Badge className="absolute left-3 top-3 border-none bg-gold text-gold-foreground">Past event</Badge>
                    )}
                  </div>

                  <CardContent className="space-y-4 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <Badge variant="secondary" className="rounded-full">
                        <Icon className="mr-1 h-3.5 w-3.5" />
                        {meta.label}
                      </Badge>
                      {project.school_name && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {project.school_name}
                        </span>
                      )}
                    </div>

                    <h3 className="line-clamp-2 text-xl font-bold leading-tight text-foreground">{project.title}</h3>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{project.description}</p>

                    {!isFeaturedEvent && (
                      <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-baseline justify-between">
                          <p className="text-lg font-bold text-primary">${project.current_amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">of ${project.goal_amount.toLocaleString()}</p>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">{Math.round(progress)}% funded</p>
                      </div>
                    )}

                    {isFeaturedEvent ? (
                      <Link to="/events/scholars-drive" className="block">
                        <Button className="w-full rounded-xl bg-gradient-gold text-gold-foreground hover:opacity-95">
                          View recap
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    ) : (
                      <a
                        href={project.gofundme_link ?? "https://www.gofundme.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full rounded-xl">
                          Support campaign
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;
