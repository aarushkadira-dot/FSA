import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FIND_SCHOOL_PATH } from "@/lib/links";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4 py-20 sm:px-6 md:py-28">
        <p className="font-semibold text-primary">Error 404</p>
        <h1 className="mt-2 text-4xl font-bold text-primary md:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          There's no page at <span className="font-semibold text-foreground">{location.pathname}</span>. It may have moved.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to="/">Back to home</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link to={FIND_SCHOOL_PATH}>Find a school</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
