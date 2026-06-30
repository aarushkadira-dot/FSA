import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle px-6 pt-24">
      <div className="w-full max-w-2xl rounded-3xl border border-white/80 bg-white/95 p-10 text-center shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">404 Error</p>
        <h1 className="mt-4 text-5xl font-bold text-foreground md:text-6xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          The page at <span className="font-semibold text-foreground">{location.pathname}</span> does not exist or may have moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/">
            <Button className="rounded-full px-6">
              <ArrowLeft className="h-4 w-4" />
              Back Home
            </Button>
          </Link>
          <Link to="/projects">
            <Button variant="outline" className="rounded-full px-6">
              <Search className="h-4 w-4" />
              Browse Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
