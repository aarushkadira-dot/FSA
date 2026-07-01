import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="mt-20">
      {/* CTA Banner */}
      <div className="border-t border-slate-200 bg-gradient-subtle px-6 py-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="rounded-3xl bg-gradient-primary px-8 py-10 text-white shadow-elegant md:px-12 md:py-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
                  Make an impact
                </p>
                <h2 className="text-2xl font-bold leading-snug md:text-3xl">
                  Help fund one more classroom today.
                </h2>
                <p className="max-w-xl text-sm text-white/80 md:text-base">
                  Every donation creates real outcomes for students in local schools. Explore active campaigns and support one that speaks to you.
                </p>
              </div>
              <Link to="/projects" className="shrink-0">
                <Button size="lg" className="h-12 rounded-full bg-white px-8 text-primary hover:bg-white/90">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dark section */}
      <div className="relative overflow-hidden bg-[hsl(217,54%,11%)] text-slate-200">
        <div className="absolute inset-0 fsa-grid opacity-[0.07]" />
        <div className="absolute inset-x-0 top-0 h-px bg-primary/30" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-14">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">

            {/* Brand col */}
            <div className="space-y-5 md:col-span-5">
              <Link to="/" className="inline-flex items-center gap-3">
                <img
                  src={logo}
                  alt="Future Scholars Association logo"
                  className="h-11 w-11 rounded-xl object-contain ring-1 ring-white/20"
                />
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold/80">
                    Future Scholars
                  </p>
                  <p className="text-lg font-bold leading-tight">Association</p>
                </div>
              </Link>

              <p className="max-w-sm text-sm leading-relaxed text-slate-300/70">
                Empowering students with access to resources, mentorship, and opportunities that strengthen communities across the Triangle.
              </p>

              <div className="flex gap-2.5 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="rounded-full border border-white/15 bg-white/8 p-2.5 text-slate-300 transition-colors hover:border-white/30 hover:bg-white/15 hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-full border border-white/15 bg-white/8 p-2.5 text-slate-300 transition-colors hover:border-white/30 hover:bg-white/15 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Explore col */}
            <div className="space-y-4 md:col-span-3">
              <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold/80">
                Explore
              </h3>
              <nav className="space-y-2.5">
                {[
                  { label: "Home", to: "/" },
                  { label: "About", to: "/about" },
                  { label: "Find Projects", to: "/projects" },
                  { label: "Find a School", to: "/find-school" },
                  { label: "Our Team", to: "/team" },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block text-sm text-slate-300/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact col */}
            <div className="space-y-4 md:col-span-4">
              <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold/80">
                Get in Touch
              </h3>
              <div className="space-y-3">
                <Link
                  to="/assistance"
                  className="block text-sm text-slate-300/70 transition-colors hover:text-white"
                >
                  Request Assistance
                </Link>
                <Link
                  to="/submit-project"
                  className="block text-sm text-slate-300/70 transition-colors hover:text-white"
                >
                  Submit a Campaign
                </Link>
                <a
                  href="mailto:futurescholars.contact@gmail.com"
                  className="flex items-center gap-2.5 text-sm text-slate-300/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary/70" />
                  futurescholars.contact@gmail.com
                </a>
                <a
                  href="tel:9194548249"
                  className="flex items-center gap-2.5 text-sm text-slate-300/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary/70" />
                  (919) 454-8249
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Future Scholars Association. All rights reserved.</p>
            <div className="flex gap-5">
              <Link to="/privacy-policy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="transition-colors hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
