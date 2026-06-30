import { Calendar as CalendarIcon, Clock, MapPin, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const ScholarsDriveEvent = () => {
  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-6 py-12">
        <Link to="/projects">
          <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <p className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Past Event
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Support for Scholars Drive
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-accent">
              Future Innovators Expo
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-primary/5 border-none shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CalendarIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Date</h3>
                  <p className="text-muted-foreground">January 17, 2026</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-none shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Time</h3>
                  <p className="text-muted-foreground">9:30am - 12:30pm</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-none shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Location</h3>
                  <p className="text-muted-foreground">Cedar Fork Community Center</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-12">
            <section className="space-y-6">
              <h3 className="text-3xl font-bold text-center">About This Past Event</h3>
              <div className="prose max-w-none text-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  The Future Scholars Association hosted the "Support for Scholars Drive,"
                  where community members donated school supplies to support future scholars of NC.
                </p>
                <p>
                  We made learning exciting with hands-on STEM challenges that sparked creativity
                  and teamwork in our Future Innovators Expo, including interactive stations,
                  slime chemistry, and a live robotics demonstration.
                </p>
              </div>
            </section>

            {/* Special Guest Section */}
            <section className="space-y-6">
              <Card className="overflow-hidden border-2 border-primary/30 shadow-lg">
                <div className="h-2 bg-gradient-to-r from-primary via-accent to-gold" />
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Star className="h-8 w-8 text-gold fill-gold" />
                    <h3 className="text-3xl font-bold text-center bg-gradient-accent bg-clip-text text-transparent">
                      Special Guest
                    </h3>
                    <Star className="h-8 w-8 text-gold fill-gold" />
                  </div>
                  <div className="text-center space-y-4">
                    <p className="text-2xl font-bold text-primary">
                      TJ Cawley
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      We were excited to welcome <strong>TJ Cawley</strong>, a distinguished guest and supporter of STEM education,
                      to the Future Innovators Expo. His visit gave students a meaningful opportunity to learn
                      from someone passionate about empowering young minds.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
              <Card className="overflow-hidden border-2 border-accent/20">
                <div className="h-2 bg-accent" />
                <CardContent className="p-8 space-y-4">
                  <h4 className="text-2xl font-bold text-accent">Activities</h4>
                  <ul className="space-y-3 text-lg text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      Paper-Airplane Distance Contest
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      Build-A-Bridge Challenge
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      Slime Chemistry Station
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      Live Robotics Demonstration
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-2 border-gold/20">
                <div className="h-2 bg-gold" />
                <CardContent className="p-8 space-y-4">
                  <h4 className="text-2xl font-bold text-gold">Donations</h4>
                  <p className="text-lg text-muted-foreground">
                    Donation Box available! Donations are much appreciated.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    All funds will be going towards Bugg Elementary.
                  </p>
                </CardContent>
              </Card>
            </section>

            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-gold/10 rounded-2xl p-8 md:p-12 text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">Thank You for Supporting This Event</h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                This event brought together creativity, generosity, and community support for a great cause.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarsDriveEvent;
