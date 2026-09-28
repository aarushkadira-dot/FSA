import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DONATE_PATH, TEACHER_REQUEST_PATH } from "@/lib/links";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Find a School", path: "/find-school" },
  { name: "Team", path: "/team" },
  { name: "Partners", path: "/partners" },
  { name: "Impact", path: "/impact" },
];


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <nav className="container mx-auto flex h-16 items-center justify-between gap-6 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img src={logo} alt="" className="h-10 w-10 object-contain" />
          <span className="text-base font-bold leading-tight text-foreground sm:text-lg">
            Future Scholars Association
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors",
                  isActive ? "text-primary underline decoration-2 underline-offset-8" : "text-foreground/80 hover:text-primary",
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            variant="outline"
            className="border-primary px-5 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link to={TEACHER_REQUEST_PATH}>Teachers</Link>
          </Button>
          <Button asChild className="bg-gold px-5 font-semibold text-gold-foreground hover:bg-gold/90">
            <Link to={DONATE_PATH}>Donate</Link>
          </Button>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md p-2 text-foreground hover:bg-muted lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-border bg-white lg:hidden">
          <div className="container mx-auto flex flex-col px-4 py-2 sm:px-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "border-b border-border py-3 text-base font-medium",
                    isActive ? "text-primary" : "text-foreground",
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="grid grid-cols-2 gap-3 pb-3 pt-4">
              <Button
                asChild
                variant="outline"
                className="border-primary font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to={TEACHER_REQUEST_PATH}>Teachers</Link>
              </Button>
              <Button asChild className="bg-gold font-semibold text-gold-foreground hover:bg-gold/90">
                <Link to={DONATE_PATH}>Donate</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
