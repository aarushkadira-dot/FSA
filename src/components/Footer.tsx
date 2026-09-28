import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const columns = [
  {
    heading: "Get involved",
    span: "md:col-span-3",
    links: [
      { label: "Find a School", to: "/find-school" },
      { label: "Teachers", to: "/teachers" },
      { label: "Start a Chapter", to: "/start-a-chapter" },
      { label: "Request Assistance", to: "/assistance" },
    ],
  },
  {
    heading: "Organization",
    span: "md:col-span-2",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Impact", to: "/impact" },
      { label: "Partners", to: "/partners" },
      { label: "Our Team", to: "/team" },
      { label: "Future Scholars Summit", to: "/events/summit" },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logo} alt="" className="h-12 w-12 object-contain" />
              <span className="text-lg font-bold">Future Scholars Association</span>
            </Link>
            <p className="mt-4 max-w-sm leading-relaxed text-white/80">
              A student-run 501(c)(3) nonprofit getting school supplies into Title I classrooms.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading} className={column.span}>
              <h2 className="font-semibold text-gold">{column.heading}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-white/80 hover:text-white hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <h2 className="font-semibold text-gold">Contact</h2>
            <ul className="mt-4 space-y-3 text-white/80">
              <li>
                <a href="mailto:futurescholars.contact@gmail.com" className="break-all hover:text-white hover:underline">
                  futurescholars.contact@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+19194548249" className="hover:text-white hover:underline">
                  (919) 454-8249
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-white/70 md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl">
            © {year} Future Scholars Association. Future Scholars Association is a 501(c)(3) nonprofit
            organization. Donations are tax-deductible to the extent allowed by law.
          </p>
          <div className="flex shrink-0 gap-5">
            <Link to="/privacy-policy" className="hover:text-white hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
