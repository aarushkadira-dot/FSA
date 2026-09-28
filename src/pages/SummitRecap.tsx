import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLASSROOMS_PATH, DONATE_PATH } from "@/lib/links";
import summitGroup from "@/assets/summit2.jpg";
import summitPitch from "@/assets/summit4.jpg";
import summitRobotics from "@/assets/summit1.jpg";
import summitPresenter from "@/assets/summit3.jpg";
import cawleyPhoto from "@/assets/guest-tj-cawley.jpg";
import cervaniaPhoto from "@/assets/guest-maria-cervania.jpg";
import bansalPhoto from "@/assets/guest-sarika-bansal.jpg";

const details = [
  { label: "Date", value: "March 1, 2026" },
  { label: "Time", value: "10 AM to 12 PM" },
  { label: "Format", value: "Live pitch summit" },
];

const guests = [
  { name: "TJ Cawley", role: "Mayor", photo: cawleyPhoto },
  { name: "Maria Cervania", role: "NC House Representative", photo: cervaniaPhoto },
  { name: "Sarika Bansal", role: "Councilwoman", photo: bansalPhoto },
];

const presenters = [
  { title: "Student teams", body: "Young innovators presented projects they built from the ground up." },
  { title: "Nonprofits", body: "Local organizations shared the impact they're working toward." },
  { title: "Researchers", body: "Independent researchers brought new ideas straight to decision-makers." },
];

const gallery = [
  { src: summitPitch, alt: "A student pitching to seated community leaders" },
  { src: summitRobotics, alt: "Students demonstrating a robotics project" },
  { src: summitPresenter, alt: "A presenter sharing their pitch with attendees" },
];

const SummitRecap = () => (
  <div>
    <section className="border-b border-border bg-secondary">
      <div className="container mx-auto px-4 pt-8 sm:px-6 md:pt-12">
        <Link to="/impact" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All events
        </Link>
        <p className="mt-6 font-semibold text-primary">Event recap</p>
        <h1 className="mt-2 text-4xl font-bold leading-tight text-primary md:text-5xl">Future Scholars Summit</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Student teams, nonprofits and researchers pitched their ideas, live, to community and state leaders who can
          help make them happen.
        </p>
        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
          {details.map((item) => (
            <div key={item.label}>
              <dt className="text-sm text-muted-foreground">{item.label}</dt>
              <dd className="mt-0.5 font-semibold text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
        <figure className="mt-10">
          <img
            src={summitGroup}
            alt="Presenters, organizers and guests of honor together at the close of the summit"
            className="aspect-[21/9] w-full rounded-t-lg object-cover"
          />
        </figure>
      </div>
    </section>

    <section className="py-16 md:py-20">
      <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <h2 className="text-3xl font-bold text-primary md:text-4xl lg:col-span-4">About the event</h2>
        <div className="space-y-5 text-lg leading-relaxed text-foreground/85 lg:col-span-8">
          <p>
            The Future Scholars Summit was a morning for ambitious ideas and the people working on them. Student teams,
            local nonprofits and independent researchers took turns pitching their projects to a panel of community and
            state leaders.
          </p>
          <p>
            Presenters shared everything from new technology to community projects, and got direct feedback from people
            who can help move their work forward.
          </p>
        </div>
      </div>
    </section>

    <section className="border-y border-border bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">Guests of honor</h2>
        <ul className="mt-8 grid max-w-4xl gap-6 sm:grid-cols-3">
          {guests.map((guest) => (
            <li key={guest.name} className="flex items-center overflow-hidden rounded-lg border border-border bg-white sm:block">
              <img src={guest.photo} alt={guest.name} className="aspect-square w-24 shrink-0 object-cover sm:w-full" loading="lazy" />
              <div className="p-5">
                <p className="text-xl font-semibold text-foreground">{guest.name}</p>
                <p className="mt-1 text-muted-foreground">{guest.role}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-muted-foreground">Along with other guests and supporters of FSA.</p>
      </div>
    </section>

    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">Who pitched</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {presenters.map((group) => (
            <li key={group.title} className="border-l-4 border-gold pl-5">
              <h3 className="text-xl font-semibold text-primary">{group.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{group.body}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 text-3xl font-bold text-primary md:text-4xl">Photos</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {gallery.map((photo) => (
            <img key={photo.alt} src={photo.src} alt={photo.alt} className="aspect-[4/3] w-full rounded-lg object-cover" loading="lazy" />
          ))}
        </div>
      </div>
    </section>

    <section className="bg-primary py-14 text-primary-foreground md:py-16">
      <div className="container mx-auto flex flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">Thank you to everyone who came.</h2>
          <p className="mt-2 text-lg text-white/80">Help us keep supporting Title I classrooms.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to={DONATE_PATH}>Donate</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
          >
            <Link to={CLASSROOMS_PATH}>Find a school</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default SummitRecap;
