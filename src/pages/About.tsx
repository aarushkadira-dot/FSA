import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  ArrowRight,
  Target,
  Heart,
  Users,
  BookOpen,
  Globe,
  Lightbulb,
  TrendingUp,
  Star,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timeline } from "@/components/ui/timeline";
import event1 from "@/assets/event1.png";
import event2 from "@/assets/event2.png";
import event3 from "@/assets/event3.png";
import event4 from "@/assets/event4.png";
import founded2 from "@/assets/founded2.png";
import tj1 from "@/assets/tj1.png";
import tj2 from "@/assets/tj2.png";

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  format?: (value: number) => string;
};

const AnimatedNumber = ({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
  format,
}: AnimatedNumberProps) => {
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
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [duration, value]);

  const formatted = format
    ? format(displayValue)
    : displayValue.toLocaleString();

  return (
    <span ref={displayRef}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

const heroImageUrl =
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80";

const storyImageUrl =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80";

const stats = [
  {
    id: "students",
    icon: Users,
    value: 294,
    label: "Students Impacted",
  },
  {
    id: "schools",
    icon: BookOpen,
    value: 1,
    label: "Partner Schools",
  },
  {
    id: "raised",
    icon: Heart,
    value: 450,
    prefix: "$",
    label: "Funds Donated",
  },
  {
    id: "members",
    icon: Users,
    value: 3,
    label: "Active Members",
  },
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for the highest standards in education and leadership development.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Embracing new ideas and creative solutions to empower students.",
  },
  {
    icon: Heart,
    title: "Community",
    description:
      "Building a supportive network where every member can thrive.",
  },
  {
    icon: Target,
    title: "Impact",
    description:
      "Creating meaningful change in the lives of students and communities.",
  },
];

const milestones = [
  {
    year: "Sept 13, 2025",
    title: "Founded",
    description:
      "Future Scholars Association (FSA) was officially founded with the mission of supporting Title I students and providing resources to help them succeed academically.",
    highlight:
      "This marked the beginning of our journey to create meaningful educational opportunities for underserved communities.",
    metric: "Day One",
    color: "from-blue-500 to-cyan-400",
    icon: Award,
  },
  {
    year: "Oct 11, 2025",
    title: "First Title I Partner School Secured",
    description:
      "We partnered with Bugg Elementary, our first Title I school. This partnership allowed us to begin directly supporting students with essential school supplies and STEM enrichment activities.",
    highlight:
      "Securing Bugg Elementary as our first partner was a key step in turning our vision into tangible impact.",
    metric: "1 partner school",
    color: "from-emerald-500 to-teal-400",
    icon: BookOpen,
  },
  {
    year: "Nov 18, 2025",
    title: "TJ Cawley Joins Advisory Board",
    description:
      "TJ Cawley officially joined our advisory board, bringing his expertise and support to guide FSA's initiatives.",
    highlight:
      "His involvement strengthened our organizational strategy and provided valuable mentorship as we prepared to expand our programs and reach more students.",
    metric: "Advisory board",
    color: "from-orange-500 to-amber-400",
    icon: Users,
  },
  {
    year: "Jan 17, 2026",
    title: "First Events Launched",
    description:
      "FSA hosted its inaugural events: the Support for Scholars Drive and the Future Innovators Expo at Cedar Fork Community Center.",
    highlight:
      "The Future Innovators Expo featured hands-on STEM challenge stations including paper airplane contests, slime chemistry, bridge building, and a live robotics demonstration. Combined with a school supply drive benefiting Bugg Elementary, this event provided Title I students with both resources and inspiration to thrive academically, marking a major milestone in bringing our mission to life.",
    metric: "294 students",
    color: "from-rose-500 to-pink-400",
    icon: Sparkles,
  },
];


const About = () => {
  const missionRef = useRef<HTMLDivElement>(null);

  const scrollToMission = () => {
    missionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Handle direct navigation to mission section via hash
  useEffect(() => {
    if (window.location.hash === "#mission") {
      setTimeout(() => {
        missionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  // Image arrays for each milestone - relevant to their content
  const milestoneImages = [
    // Founded - education startup, vision, community
    [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=90", // Team collaboration
      founded2, // Students learning
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=90", // Education vision
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=90", // Community
    ],
    // First Title I Partner School - LEGO Education, STEM activities, students learning
    [
      event1, // Kids Flexing / Bugg Sign / etc
      event2,
      event3,
      event4, // Partnership handshake
    ],
    // TJ Cawley Joins Advisory Board - mentorship, leadership, strategy
    [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=90", // Business meeting
      { src: tj1, position: "object-top" }, // Mentorship
      tj2, // Leadership discussion
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=90", // Team strategy
    ],
    // First Events Launched - STEM activities, library, hands-on learning
    [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=90", // STEM activities hands-on
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=90", // Library
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=90", // Hands-on learning
      "https://images.unsplash.com/photo-1503676260728-1c00da94a157?auto=format&fit=crop&w=800&q=90", // Students engaged in activities
    ],
  ];

  // Convert milestones to TimelineEntry format
  const timelineData = milestones.map((milestone, index) => {
    const Icon = milestone.icon;
    const images = milestoneImages[index] || milestoneImages[0];
    return {
      title: milestone.year,
      content: (
        <div>
          <div className="mb-6">
            <div className={`inline-flex items-center gap-3 bg-gradient-to-br ${milestone.color} rounded-full px-4 py-2 mb-4`}>
              <Icon className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                {milestone.metric}
              </span>
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {milestone.title}
            </h4>
            <p className="text-foreground/85 text-sm md:text-base font-normal mb-4 leading-relaxed">
              {milestone.description}
            </p>
            <div className="bg-primary/5 border-l-4 border-primary pl-4 py-3 rounded-r">
              <p className="text-foreground/75 text-sm italic">
                {milestone.highlight}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {images.map((imageItem, imgIndex) => {
              const src = typeof imageItem === 'string' ? imageItem : imageItem.src;
              const position = typeof imageItem === 'string' ? 'object-center' : (imageItem.position || 'object-center');
              
              return (
              <img
                key={`${milestone.title}-img-${imgIndex}`}
                src={src}
                alt={`${milestone.title} - Image ${imgIndex + 1}`}
                className={`rounded-lg object-cover ${position} h-32 md:h-44 lg:h-60 w-full shadow-lg`}
                loading="lazy"
                crossOrigin="anonymous"
              />
            );
            })}
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="min-h-screen pt-20 bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle text-foreground">
        <div className="absolute inset-0 fsa-grid opacity-20" />
        <div className="container relative z-10 mx-auto px-6 py-24 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6 animate-slide-in-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Our Story</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
                  Building Brighter
                  <br />
                  <span className="text-primary/85">Futures Together</span>
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl">
                  From a small group of students with a vision to a thriving
                  community making real change—discover how we're breaking down
                  barriers and opening doors for the next generation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 sm:gap-5 lg:max-w-xl">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="rounded-2xl border border-primary/10 bg-white p-5 hover:bg-primary/5 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-3">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl font-semibold text-foreground">
                          <AnimatedNumber
                            value={stat.value}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                          />
                        </p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start gap-4 pt-6 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 px-8 py-6"
                  onClick={scrollToMission}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Our Mission
                </Button>
                <Link to="/team">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary/40 text-primary hover:bg-primary/10 px-8 py-6"
                  >
                    Meet the Team
                    <Users className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2.5rem] border shadow-2xl">
                <img
                  src={heroImageUrl}
                  alt="Students learning and growing together"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section 
        ref={missionRef}
        id="mission"
        className="bg-gradient-to-b from-background via-primary/5 to-background py-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 md:mb-12">
              <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-6 block">Our Mission</span>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
                Empowering Future Scholars to <span className="text-primary/90">Unlock Their Potential</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl">
                Future Scholars Association (FSA) is dedicated to supporting Title I students and providing essential resources to help them succeed.
              </p>
            </div>

            {/* Narrative Section - No Box, Natural Flow */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
              {/* Main Text */}
              <div className="md:col-span-7 lg:col-span-8 space-y-8 text-lg text-foreground/80 leading-relaxed">
                <p>
                  Our mission is to bridge the educational gap by connecting passionate teachers in Title I schools with the resources they need to create transformative learning experiences. We believe that every student, regardless of their socioeconomic background, deserves access to quality education, essential school supplies, and enriching STEM activities.
                </p>
                <p>
                  Through strategic partnerships with schools, community engagement, and direct support programs, we work to ensure that underserved students have the tools and opportunities necessary to thrive academically and pursue their dreams.
                  </p>
                </div>

              {/* Quote / Highlight - Offset */}
              <div className="md:col-span-5 lg:col-span-4 relative mt-8 md:mt-2">
                <div className="absolute -top-6 -left-4 text-6xl text-primary/20 font-serif">"</div>
                <blockquote className="relative z-10 text-xl md:text-2xl font-medium text-foreground leading-snug">
                  Building brighter futures together—one student, one classroom, one community at a time.
                </blockquote>
              </div>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 text-center hover:shadow-card transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 bg-white/90"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
        
        <div className="container mx-auto px-6 mb-[68px]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white px-4 py-2 mb-6 shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-0 leading-tight">
              Milestones That Shaped Us
            </h2>
          </div>
        </div>
        
        <Timeline data={timelineData} />
      </section>
    </div>
  );
};

export default About;
