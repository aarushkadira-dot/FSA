import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Find Projects", path: "/projects" },
  { name: "Find a School", path: "/find-school" },
  { name: "Team", path: "/team" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div
          className={cn(
            "mt-3 rounded-2xl border px-4 py-3 transition-all duration-300",
            scrolled
              ? "border-slate-200/90 bg-white/92 shadow-card backdrop-blur-xl"
              : "border-white/70 bg-white/78 shadow-sm backdrop-blur-md",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative">
                <img
                  src={logo}
                  alt="Future Scholars Association Logo"
                  className="h-11 w-11 rounded-xl object-contain ring-1 ring-primary/15"
                />
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gold" />
              </div>
              <div className="hidden sm:block">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary/75">
                  Future Scholars
                </p>
                <p className="text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                  Association
                </p>
              </div>
              <p className="text-lg font-bold text-primary sm:hidden">FSA</p>
            </Link>

            <div className="hidden xl:flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-100/70 p-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                    isActive(link.path)
                      ? "bg-white text-primary shadow-sm"
                      : "text-foreground/75 hover:bg-white/60 hover:text-foreground",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Link to="/submit-project">
                <Button className="rounded-full px-5">
                  Start a Campaign
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden rounded-full border border-slate-200 p-2 text-foreground transition-colors hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {isOpen && (
            <div className="mt-4 space-y-2 border-t border-slate-200/80 pt-4 md:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-100/70 text-foreground/80 hover:bg-slate-100",
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link to="/submit-project">
                  <Button className="w-full rounded-xl">Start a Campaign</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
